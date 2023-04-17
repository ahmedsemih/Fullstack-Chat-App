import { FC } from 'react'

type Props = {
    size: 'sm' | 'lg';
}

const Spinner: FC<Props> = ({ size }) => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div
                className={`
                    animate-spin inline-block border-[5px] border-current border-t-transparent text-cyan-500 rounded-full 
                    ${size === 'sm' ? 'h-6 w-6' : 'w-12 h-12 '}
                `}
            />
        </div>
    )
}

export default Spinner