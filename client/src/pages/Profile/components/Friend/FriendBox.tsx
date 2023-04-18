import { FC } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BiBlock, BiMessageDots } from "react-icons/bi";
import { IoPersonRemoveSharp, IoPersonAddSharp } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import IconButton from "../../../../components/buttons/IconButton";
import useBlockStatus from "../../../../hooks/useBlockStatus";
import useFriendStatus from "../../../../hooks/useFriendStatus";
import { RootState } from "../../../../redux/store";
import { createChannel } from "../../../../services/channelService";
import checkIsChannelExist from "../../../../utils/checkIsChannelExist";
import { setRefresh } from "../../../../redux/features/channelSlice";

type Props = {
    friend: User;
};

const FriendBox: FC<Props> = ({ friend }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user)
    const { refresh } = useSelector((state: RootState) => state.channel);
    const { isPending, isFriend, addFriend, removeFriend } = useFriendStatus(friend.id);
    const { isBlocked, addBlock, removeBlock } = useBlockStatus(friend.id);

    const handleAdd = () => {
        addFriend();
        return toast.success('Friend added successfully.', {
            duration: 3000,
            position: 'bottom-center',
            style: {
                backgroundColor: '#353535',
                color: '#fff'
            }
        });
    }

    const handleRemove = () => {
        removeFriend();
        return toast.success('Friend removed successfully.', {
            duration: 3000,
            position: 'bottom-center',
            style: {
                backgroundColor: '#353535',
                color: '#fff'
            }
        });
    };

    const handleBlock = async () => {
        addBlock();
        return toast.success('User blocked successfully.', {
            duration: 3000,
            position: 'bottom-center',
            style: {
                backgroundColor: '#353535',
                color: '#fff'
            }
        });
    };

    const handleUnBlock = async () => {
        removeBlock();
        return toast.success('User unblocked successfully.', {
            duration: 3000,
            position: 'bottom-center',
            style: {
                backgroundColor: '#353535',
                color: '#fff'
            }
        });
    };

    const handleClickMessage = async () => {
        const channelId = await checkIsChannelExist(user?.id!, friend.id);

        if (channelId) return navigate('/chat', { state: { channelId } });

        const { statusCode, channel } = await createChannel({
            participants: [
                user?.id,
                friend.id
            ]
        });

        dispatch(setRefresh());
        if (statusCode === '201') return navigate('/chat', { state: { channelId: channel.id } });
    };

    return (
        <>
            <div className="flex p-3 items-center">
                <LazyLoadImage
                    onClick={() => navigate('/profile', { state: { userId: friend.id } })}
                    src={friend.image}
                    alt='friend'
                    effect="blur"
                    className="w-20 h-20 rounded-full object-cover cursor-pointer md:block hidden"
                />
                <p
                    onClick={() => navigate('/profile', { state: { userId: friend.id } })}
                    className="ml-3 text-xl font-semibold cursor-pointer"
                >
                    {friend.username}
                </p>
                <div className="w-1/2 flex ml-auto">
                    {
                        user?.id !== friend.id
                        &&
                        <>
                            {
                                isFriend
                                    ?
                                    <>
                                        <button
                                            onClick={handleClickMessage}
                                            className="font-semibold text-xl px-3 py-2 bg-neutral-700 hover:bg-neutral-600 duration-200 rounded-md mt-3 mr-3"
                                        >
                                            <BiMessageDots className="mx-auto text-3xl" />
                                        </button>
                                        <IconButton
                                            isTextCanClosed
                                            Icon={IoPersonRemoveSharp}
                                            text='Remove'
                                            type="button"
                                            handleClick={handleRemove}
                                            isPending={isPending}
                                        />
                                    </>
                                    :
                                    <IconButton
                                        isTextCanClosed
                                        Icon={IoPersonAddSharp}
                                        text='Add'
                                        type="button"
                                        handleClick={handleAdd}
                                        isPending={isPending}
                                    />
                            }
                            {
                                isBlocked
                                    ?
                                    <IconButton
                                        isTextCanClosed
                                        Icon={BiBlock}
                                        text='Unblock'
                                        type="button"
                                        handleClick={handleUnBlock}
                                        isPending={isPending}
                                    />
                                    :
                                    <IconButton
                                        isTextCanClosed
                                        Icon={BiBlock}
                                        text='Block'
                                        type="button"
                                        handleClick={handleBlock}
                                        isPending={isPending}
                                    />
                            }
                        </>
                    }
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default FriendBox;