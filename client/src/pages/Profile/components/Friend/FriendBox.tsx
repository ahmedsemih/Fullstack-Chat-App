import { FC } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BiBlock } from "react-icons/bi";
import { IoPersonRemoveSharp, IoPersonAddSharp } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconButton from "../../../../components/buttons/IconButton";
import useBlockStatus from "../../../../hooks/useBlockStatus";
import useFriendStatus from "../../../../hooks/useFriendStatus";
import { RootState } from "../../../../redux/store";

type Props = {
    friend: User;
};

const FriendBox: FC<Props> = ({ friend }) => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user)
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
    }

    return (
        <>
            <div className="flex p-3 items-center">
                <LazyLoadImage
                    onClick={() => navigate('/profile', { state: { userId: friend.id } })}
                    src={friend.image}
                    alt='friend'
                    effect="blur"
                    className="w-20 h-20 rounded-full object-cover cursor-pointer"
                />
                <p className="ml-3 text-xl font-semibold">{friend.username}</p>
                <div className="w-1/2 flex ml-auto">

                    {
                        user?.id !== friend.id
                        &&
                        <>
                            {
                                isFriend
                                    ?
                                    <IconButton
                                        isTextCanClosed
                                        Icon={IoPersonRemoveSharp}
                                        text='Remove'
                                        type="button"
                                        handleClick={handleRemove}
                                        isPending={isPending}
                                    />
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