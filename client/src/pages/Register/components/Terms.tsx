const Terms = () => {
    return (
        <p className='text-neutral-500 text-center mt-3 mb-5'>
            {'By signing up, you agree to our '}
            <span className='text-white duration-200 hover:text-neutral-300 cursor-pointer'>
                Terms,{' '}
            </span>
            <span className='text-white duration-200 hover:text-neutral-300 cursor-pointer'>
                Privacy Policy
            </span>
            {' and '}
            <span className='text-white duration-200 hover:text-neutral-300 cursor-pointer'>
                Cookies Policy
            </span>
        </p>
    )
}

export default Terms