import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  setSearch: Dispatch<SetStateAction<string>>;
}

const Searchbar: FC<Props> = ({ setSearch }) => {
  return (
    <div className='p-3 w-full border-y border-neutral-700'>
      <input
        onChange={(e) => setSearch(e.target.value)}
        className='p-2 bg-neutral-700 rounded-2xl w-full outline-none'
        placeholder='Search...'
        type="text"
        name='text'
        spellCheck='false'
      />
    </div>
  )
}

export default Searchbar;