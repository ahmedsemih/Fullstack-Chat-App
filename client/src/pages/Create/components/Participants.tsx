import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import { getFriends } from "../../../services/userService";
import UserBar from "./UserBar";

type Props = {
    participants: string[];
    setParticipants: Dispatch<SetStateAction<string[]>>;
    admins: string[];
    setAdmins: Dispatch<SetStateAction<string[]>>;
}

const Participants: FC<Props> = ({ participants, setParticipants, admins, setAdmins }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [search, setSearch] = useState<string>('');
    const [friends, setFriends] = useState<User[]>();

    useEffect(() => {
        const fetchFriends = async () => {
            const result = await getFriends(user?.id!);
            setFriends(result.friends);
        }

        fetchFriends();
    }, [user?.id])

    return (
        <div className="w-full py-5 flex justify-center">
            <div className="py-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="w-full">
                    <p className="text-xl font-semibold">Friends</p>
                    <div className="py-3">
                        <input
                            onChange={(e: any) => setSearch(e.target.value)}
                            type="text"
                            className="border-neutral-900 outline-none w-full rounded-md bg-neutral-700 py-3 px-2"
                            placeholder="Search a friend..."
                        />
                    </div>
                    <div className="overflow-auto">
                        {
                            friends
                            &&
                            friends.map((friend: User) => {
                                return (
                                    !participants.includes(friend.id)
                                    &&
                                    <UserBar
                                        search={search}
                                        isAdded={false}
                                        key={friend.id}
                                        user={friend}
                                        participants={participants}
                                        setParticipants={setParticipants}
                                        admins={admins}
                                        setAdmins={setAdmins}
                                    />)
                            })
                        }
                    </div>
                </div>
                <div className="md:w-[400px]">
                    <p className="text-xl font-semibold mb-2">Participants  ({participants.length})</p>
                    {
                        participants
                        &&
                        participants.map((participant: string, index) => {
                            return (
                                <UserBar
                                    search={search}
                                    isAdded={true}
                                    key={index}
                                    userId={participant}
                                    participants={participants}
                                    setParticipants={setParticipants}
                                    admins={admins}
                                    setAdmins={setAdmins}
                                />)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Participants