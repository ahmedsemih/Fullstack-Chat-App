import { FC } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type Props = {
  label: string;
  placeholder: string;
  error: any;
  informations: string[];
  refs: any;
  Icon: IconType;
}

const TextInput: FC<Props> = ({ label, placeholder, error, informations, refs, Icon }) => {
  return (
    <div className={`${error ? 'text-red-500' : 'text-white'} w-[90%] md:w-[80%] mx-auto m-5`}>
      <label className='capitalize font-semibold' htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <div className={`flex items-center border-b transition-all duration-100 ${error ? 'border-red-500' : 'border-neutral-500 focus-within:border-white'}`}>
        <Icon className='text-2xl text-white' />
        <input
          className='pl-3 text-white text-lg bg-transparent p-2 w-full outline-none placeholder-neutral-500'
          placeholder={placeholder}
          name={label.toLowerCase()}
          type='text'
          {...refs}
        />
        {
          (error && informations) 
          &&
          <div className='group'>
            <AiOutlineInfoCircle className='text-2xl' />
            <div className='absolute hidden group-hover:block bg-neutral-800 p-2 shadow-xl'>
              {
                informations.map((info: string, index: number) => {
                  return <p key={index}>* {info}</p>
                })
              }
            </div>
          </div>
        }
      </div>
      {
        error &&
        <p className='text-red-500 mt-2'>* {error}</p>
      }
    </div>
  )
}

export default TextInput