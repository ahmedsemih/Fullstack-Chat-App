import { FC, useState, useTransition } from "react";
import { useSelector } from "react-redux"

import Spinner from "../../../components/loading/Spinner";
import { RootState } from "../../../redux/store"
import BlockedTab from "./Block/BlockedTab";
import FriendsTab from "./Friend/FriendsTab";
import RequestsTab from "./Request/RequestsTab";

type Props = {
    profileId: string;
}

const Tabs: FC<Props> = ({ profileId }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [tab, setTab] = useState('friends');
    const [isPending, startTransition] = useTransition();

    const handleClickFriends = () => {
        startTransition(() => {
            setTab('friends');
        });
    };

    const handleClickRequests = () => {
        startTransition(() => {
            setTab('requests');
        });
    };

    const handleClickBlock = () => {
        startTransition(() => {
            setTab('blocked');
        });
    };

    return (
        <div className="max-w-[800px] mx-auto pb-10">
            <div className="flex justify-around">
                <span
                    onClick={handleClickFriends}
                    className={`
                        text-xl py-3 cursor-pointer w-full text-center duration-200 transition-all border-b 
                        ${tab === 'friends' ? 'border-b-2 font-semibold' : 'hover:border-white border-neutral-700'}
                    `}
                >
                    Friends
                </span>
                {
                    user?.id === profileId
                    &&
                    <>
                        <span
                            onClick={handleClickRequests}
                            className={`
                                text-xl py-3 cursor-pointer w-full text-center duration-200 transition-all border-b 
                                ${tab === 'requests' ? 'border-b-2 font-semibold' : 'hover:border-white border-neutral-700'}
                            `}
                        >
                            Requests
                        </span>
                        <span
                            onClick={handleClickBlock}
                            className={`
                                text-xl py-3 cursor-pointer w-full text-center duration-200 transition-all border-b 
                                ${tab === 'blocked' ? 'border-b-2 font-semibold' : 'hover:border-white border-neutral-700'}
                            `}
                        >
                            Blocked
                        </span>
                    </>
                }
            </div>
            <div>
                {
                    isPending
                        ?
                        <div className="mt-10">
                            <Spinner size="lg" />
                        </div>
                        :
                        <>
                            {
                                tab === 'friends' && <FriendsTab />
                            }
                            {
                                tab === 'requests' && <RequestsTab />
                            }
                            {
                                tab === 'blocked' && <BlockedTab />
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default Tabs