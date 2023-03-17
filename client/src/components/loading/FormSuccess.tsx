import { FC } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

type Props = {
    message: string;
    redirectTo: string;
}

const FormSuccess: FC<Props> = ({ message, redirectTo }) => {
    return (
        <div className='w-full min-h-[480px] flex flex-col justify-center items-center text-white md:my-10 duration-200'>
            <FaRegCheckCircle className='text-9xl mx-auto mb-6' />
            <h3 className='text-3xl font-semibold my-3'>{message}</h3>
            <p className='text-lg text-center'>You are redirecting to the {redirectTo.toLowerCase()} page...</p>
        </div>
    )
}

export default FormSuccess;