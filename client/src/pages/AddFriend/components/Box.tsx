import { FC } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { BiBlock } from 'react-icons/bi';
import { IoPersonAdd, IoPersonRemove } from 'react-icons/io5';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../../components/buttons/IconButton';
import useBlockStatus from '../../../hooks/useBlockStatus';
import useFriendStatus from '../../../hooks/useFriendStatus';
import { RootState } from '../../../redux/store';
import { setRequest } from '../../../services/userService';

type Props = {
    user: User;
}

const Box: FC<Props> = ({ user }) => {
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    const { isFriend, isPending, removeFriend } = useFriendStatus(user.id);
    const { isBlocked, addBlock, removeBlock } = useBlockStatus(user.id);

    const handleRequest = async () => {
        const { statusCode } = await setRequest(currentUser?.id!, user.id, true);

        if (statusCode === '200') {
            return toast.success('Request sent successfully.', {
                duration: 3000,
                position: 'bottom-center',
                style: {
                    backgroundColor: '#353535',
                    color: '#fff'
                }
            });
        }

        toast.error(`You already sent a request to ${user.username}.`, {
            duration: 3000,
            position: 'bottom-center',
            style: {
                backgroundColor: '#353535',
                color: '#fff'
            }
        });
    }

    const handleBlock = () => {
        addBlock();
        toast.success('User blocked successfully.', {
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
            <div className="flex p-3 items-center my-3">
                <LazyLoadImage
                    onClick={() => navigate('/profile', { state: { userId: user.id } })}
                    src={user.image}
                    alt='request'
                    effect="blur"
                    className="w-20 h-20 rounded-full object-cover cursor-pointer"
                />
                <p
                    onClick={() => navigate('/profile', { state: { userId: user.id } })}
                    className="ml-3 text-xl font-semibold cursor-pointer">
                    {user.username}
                </p>
                {
                    user.id !== currentUser?.id
                    &&
                    <div className="w-1/2 flex ml-auto">
                        {
                            isFriend
                                ?
                                <IconButton Icon={IoPersonRemove} text='Remove' type='button' handleClick={removeFriend} isTextCanClosed isPending={isPending} />
                                :
                                <>
                                    <IconButton Icon={IoPersonAdd} text='Add' type='button' handleClick={handleRequest} isTextCanClosed isPending={isPending} />
                                </>
                        }
                        {
                            isBlocked
                                ?
                                <IconButton isTextCanClosed Icon={BiBlock} text='Unblock' type="button" handleClick={removeBlock} isPending={isPending} />
                                :
                                <IconButton isTextCanClosed Icon={BiBlock} text='Block' type="button" handleClick={handleBlock} isPending={isPending} />
                        }
                    </div>

                }
            </div>
            <Toaster />
        </>
    )
}

export default Box