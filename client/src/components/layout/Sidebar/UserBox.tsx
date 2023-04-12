import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useSelector } from 'react-redux'
import { RxDotsVertical } from 'react-icons/rx';

import { RootState } from '../../../redux/store'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/features/authSlice';
import { useEffect, useState } from 'react';
import { getUser } from '../../../services/userService';

const UserBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loggedUser, setLoggedUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUser(user?.id!);
      setLoggedUser(result.user);
    }

    fetchUser();
  }, [user?.id]);

  return (
    <div className='p-3 flex items-center relative h-22'>
      <LazyLoadImage
        onClick={() => navigate('/profile', { state: { userId: user?.id } })}
        className='w-16 h-16 object-cover rounded-full cursor-pointer'
        src={loggedUser?.image}
        alt='user-pp'
        effect='blur'
      />
      <p className='ml-3 text-lg'>{loggedUser?.username?.length! > 8 ? loggedUser?.username.slice(0, 8) + '...' : loggedUser?.username}</p>
      <div className=' ml-auto cursor-pointer group'>
        <RxDotsVertical className='text-2xl' />
        <div className='absolute group-hover:block hidden text-white w-full md:w-auto bg-neutral-800 border border-neutral-900 shadow-md rounded-md z-50 right-0 '>
          <button onClick={() => navigate('/create')} className='w-full hover:bg-neutral-700 duration-200 p-3'>
            Create Channel
          </button>
          <button className='w-full hover:bg-neutral-700 duration-200 p-3' onClick={() => navigate('/addfriend')}>
            Add Friend
          </button>
          <button className='w-full hover:bg-neutral-700 duration-200 p-3' onClick={() => dispatch(logOut())}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserBox