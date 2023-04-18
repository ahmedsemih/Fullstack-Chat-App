import { Dispatch, FC, SetStateAction } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

type Props = {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
}

const Search: FC<Props> = ({ search, setSearch }) => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSearch(e.target.search.value);
    }

    return (
        <form onSubmit={handleSubmit} action="GET" className="w-full p-5 flex flex-col items-center">
            <h1 className="text-center font-semibold text-xl mb-2 mt-5">Search Your Friends</h1>
            <div className="relative w-full max-w-[760px]">
                <input
                    name="search"
                    className="p-3 w-full rounded-lg bg-neutral-600 outline-none"
                    type="text"
                    placeholder="Write a username..."
                    spellCheck='false'
                />
                <button className="absolute right-2 text-3xl top-2 text-neutral-400" type="submit">
                    <BiSearchAlt2 />
                </button>
            </div>
        </form>
    )
}

export default Search;