import { FC } from "react";
import { FaRegEdit } from "react-icons/fa";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { ImBlocked } from "react-icons/im";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../../redux/store";
import IconButton from "../../../components/buttons/IconButton";
import useBlockStatus from "../../../hooks/useBlockStatus";
import useFriendStatus from "../../../hooks/useFriendStatus";

type Props = {
    details: User;
}

const Info: FC<Props> = ({ details }) => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const { isPending, isFriend, addFriend, removeFriend } = useFriendStatus(details?.id);
    const { isBlocked, addBlock, removeBlock } = useBlockStatus(details?.id);

    return (
        <div className="w-full flex justify-center py-1 xl:py-10">
            <div className="flex xl:flex-row flex-col my-5 p-3 max-w-[800px]">
                <LazyLoadImage
                    src={details?.image}
                    alt='user-pp'
                    effect="blur"
                    className="w-52 h-auto object-cover rounded-full mx-auto mb-5 xl:mb-0"
                />
                <div className="max-w-[400px] md:pl-5">
                    <h1 className="text-2xl font-semibold my-2 xl:text-start text-center">{details?.username}</h1>
                    <p className="min-h-[100px]">{details?.about}</p>
                    <div className="flex">
                        {
                            user?.id === details?.id
                                ?
                                <IconButton
                                    isTextCanClosed
                                    Icon={FaRegEdit}
                                    text='Edit'
                                    handleClick={() => navigate('/profile/edit')}
                                    type='button'
                                />
                                :
                                <>
                                    {
                                        isFriend
                                            ?
                                            <IconButton
                                                isTextCanClosed
                                                Icon={HiUserRemove}
                                                text='Remove'
                                                handleClick={removeFriend}
                                                type='button'
                                                isPending={isPending}
                                            />
                                            :
                                            <IconButton
                                                isTextCanClosed
                                                Icon={HiUserAdd}
                                                text='Add'
                                                handleClick={addFriend}
                                                type='button'
                                                isPending={isPending}
                                            />
                                    }
                                    {
                                        isBlocked
                                            ?
                                            <IconButton
                                                isTextCanClosed
                                                Icon={ImBlocked}
                                                text='Unblock'
                                                handleClick={removeBlock}
                                                type='button'
                                                isPending={isPending}
                                            />
                                            :
                                            <IconButton
                                                isTextCanClosed
                                                Icon={ImBlocked}
                                                text='Block'
                                                handleClick={addBlock}
                                                type='button'
                                                isPending={isPending}
                                            />
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info;