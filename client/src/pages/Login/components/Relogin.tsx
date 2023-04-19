import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiFillLock } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import BasicButton from "../../../components/buttons/BasicButton";
import PasswordInput from "../../../components/inputs/PasswordInput";
import { logOut, setUser } from "../../../redux/features/authSlice";
import { logIn } from "../../../services/authService";
import { getUser } from "../../../services/userService";

type Props = {
  id: string;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  setLastId: Dispatch<SetStateAction<string>>;
}

const Relogin: FC<Props> = ({ id, setIsFormOpen, setLastId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lastUser, setLastUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUser(id);
      setLastUser(result.user);
    }

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const password = await e.target.password.value;
    if (!password) return;
    const result = await logIn({ email: lastUser?.email!, password });

    if (result.statusCode === '200') {
      setIsFormOpen(false);

      const { id, username, image }: any = jwtDecode(result.access_token);
      Cookies.set('access_token', result.access_token, { expires: 3 });
      Cookies.set('last_user', id);

      dispatch(setUser({
        id,
        username,
        image
      }));
      return setTimeout(() => {
        navigate('/');
      }, 2000);
    }

    e.target.password.value = '';
    toast.error(result.message, {
      duration: 3000,
      position: 'bottom-center',
      style: {
        backgroundColor: '#353535',
        color: '#fff'
      }
    });
  }

  const handleClickChange = () => {
    Cookies.remove('access_token');
    Cookies.remove('last_user');
    dispatch(logOut());
    setLastId('');
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <LazyLoadImage className="rounded-full w-44 h-44 object-cover" src={lastUser?.image} alt='user-pp' effect="blur" />
        <h1 className="text-2xl my-5">Welcome <strong>{lastUser?.username}</strong>!</h1>
      </div>
      <form action="POST" onSubmit={handleSubmit}>
        <PasswordInput
          label='Password'
          placeholder='Type your password.'
          error={null}
          Icon={AiFillLock}
          refs={{ name: 'password' }}
        />
        <div className="mx-auto w-[90%] md:w-[80%]">
          <BasicButton type='submit' >Login</BasicButton>
        </div>
      </form>
      <div className="w-full text-center mt-4">
        <button onClick={handleClickChange} className="text-lg text-neutral-100 hover:text-neutral-300 duration-200">Change Account</button>
        <Toaster />
      </div>
    </div>
  )
}

export default Relogin;