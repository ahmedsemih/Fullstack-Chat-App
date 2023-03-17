import { FC, ReactNode } from 'react'

type Props = {
  type: any;
  children: ReactNode;
}

const BasicButton: FC<Props> = ({ type = 'button', children }) => {
  return (
    <button type={type} className='w-full rounded-md bg-neutral-700 text-white p-3 hover:bg-neutral-600 duration-200'>
      {children}
    </button>
  )
}

export default BasicButton;