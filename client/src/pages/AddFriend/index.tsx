import { useEffect, useState } from "react";
import PageInfo from "../../components/layout/ContentArea/PageInfo";
import Spinner from "../../components/loading/Spinner";
import { getUsersBySearch } from "../../services/userService";
import Box from "./components/Box";
import Search from "./components/Search";

const AddFriend = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        if(!search) return;

        setIsPending(true);
        const fetchUsers = async () => {
            const result = await getUsersBySearch(search);
            setUsers(result.users);
        }

        fetchUsers();
        setIsPending(false);
    }, [search]);

    return (
        <section>
            <PageInfo isChannel={false} name='Add Friend' />
            <div className="overflow-y-auto">
                <Search search={search} setSearch={setSearch} />
                {
                    search && <p className="text-center">{users.length || 0} results found.</p>
                }
                {
                    isPending && <Spinner size="lg" />
                }
                {
                    !isPending
                    &&
                    <div className="w-full max-w-[800px] mx-auto mt-10">
                        {
                            (users && search)
                            &&
                            users.map((user: User) => {
                                return <Box key={user.id} user={user} />
                            })
                        }
                    </div>
                }

            </div>
        </section>
    )
}

export default AddFriend;