import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { AiFillLock } from 'react-icons/ai';
import { MdMail } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import BasicButton from '../../../components/buttons/BasicButton';
import PasswordInput from '../../../components/inputs/PasswordInput';
import TextInput from '../../../components/inputs/TextInput';
import { setUser } from '../../../redux/features/authSlice';
import { logIn } from '../../../services/authService';

type Props = {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginForm: FC<Props> = ({ setIsFormOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    const result = await logIn({ email: data.email, password: data.password });
    if (result.statusCode === '200') {
      setIsFormOpen(false);

      const { id, username, image }: any = jwtDecode(result.access_token);
      Cookies.set('access_token', result.access_token,{expires:3});
      Cookies.set('last_user', id);

      dispatch(setUser({
        username,
        id,
        image
      }));
      return setTimeout(() => {
        return navigate('/');
      }, 2000);
    }

    reset();
    toast.error(result.message, {
      duration: 3000,
      position: 'bottom-center',
      style: {
        backgroundColor: '#353535',
        color: '#fff'
      }
    });
  };

  return (
    <form
      method='POST'
      name='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label='Email'
        placeholder='Type your email.'
        Icon={MdMail}
        informations={['email is required.', 'email must be valid.']}
        error={errors.email && errors.email.message}
        refs={{
          ...register('email', {
            required: 'email is required.',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'please enter a valid email.'
            }
          })
        }}
      />
      <PasswordInput
        label='Password'
        placeholder='Type your password.'
        error={errors.password && errors.password.message}
        Icon={AiFillLock}
        refs={{
          ...register('password', {
            required: 'password is required',
          })
        }}
      />
      <div className='w-[90%] md:w-[80%] mx-auto'>
        <BasicButton
          type='submit'
        >
          Login
        </BasicButton>
      </div>
      <Toaster />
    </form>
  )
}

export default LoginForm