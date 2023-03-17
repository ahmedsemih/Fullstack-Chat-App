import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import Logo from '../../assets/brand-logo.png';
import FormSuccess from '../../components/loading/FormSuccess';
import Divider from './components/Divider';
import RegisterForm from './components/RegisterForm';

const Register = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(true);

  return (
    <div className='flex justify-center items-center w-full h-[100vh]'>
      <div className='py-10 md:py-5 w-full h-full sm:h-auto sm:w-[400px] bg-neutral-800 shadow-lg rounded-md text-white'>
        {
          isFormOpen
            ?
            <>
              <LazyLoadImage
                className='w-[80%] mx-auto border-b border-neutral-700 hidden sm:block'
                src={Logo}
                alt='logo'
                effect='blur'
              />
              <h1 className='text-3xl font-semibold text-center sm:hidden mb-10'>Create Account</h1>
              <RegisterForm setIsFormOpen={setIsFormOpen} />
              <div className='text-center mb-3'>
                <Divider />
                <Link className='hover:text-neutral-300 duration-200' to='/login'>Have an account? Login</Link>
              </div>
            </>
            :
            <FormSuccess message='Account created' redirectTo='login' />
        }
      </div>
    </div>
  );
};

export default Register;
