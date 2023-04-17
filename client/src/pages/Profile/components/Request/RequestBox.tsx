import { Dispatch, FC, SetStateAction } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { BiBlock } from 'react-icons/bi';
import { BsCheck2 } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import IconButton from '../../../../components/buttons/IconButton';
import useBlockStatus from '../../../../hooks/useBlockStatus';
import useFriendStatus from '../../../../hooks/useFriendStatus';
import { RootState } from '../../../../redux/store';
import { setRequest } from '../../../../services/userService';

type Props = {
    request: User;
    setTrigger: Dispatch<SetStateAction<boolean>>;
}

const RequestBox: FC<Props> = ({ request, setTrigger }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const { isPending, isBlocked, addBlock, removeBlock } = useBlockStatus(request.id);
    const { addFriend } = useFriendStatus(request.id);

    const handleAccept = async () => {
        const { statusCode, message } = await setRequest(user?.id!, request.id, false);

        if (statusCode === '200') {
            addFriend();
            toast.success('Friend added successfully.', {
                duration: 3000,
                position: 'bottom-center',
                style: {
                    backgroundColor: '#353535',
                    color: '#fff'
                }
            });
            return setTrigger(prev => !prev);
        }

        return toast.error(message, {
            duration: 3000,
            position: 'bottom-center',
            style: {
                backgroundColor: '#353535',
                color: '#fff'
            }
        });
    };

    const handleDecline = async () => {
        await setRequest(user?.id!, request.id, false);
        return setTrigger(prev => !prev);
    };

    const handleBlock = () => {
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

    const handleUnblock = () => {
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
                    onClick={() => navigate('/profile', { state: { userId: request.id } })}
                    src={request.image}
                    alt='request'
                    effect="blur"
                    className="w-20 h-20 rounded-full object-cover cursor-pointer md:block hidden"
                />
                <p
                    onClick={() => navigate('/profile', { state: { userId: request.id } })}
                    className="ml-3 text-xl font-semibold cursor-pointer">
                    {request.username}
                </p>
                <div className="w-1/2 flex ml-auto">
                    <IconButton isTextCanClosed Icon={BsCheck2} text='Accept' type="button" handleClick={handleAccept} />
                    <IconButton isTextCanClosed Icon={RxCross2} text='Decline' type="button" handleClick={handleDecline} />
                    {
                        isBlocked
                            ?
                            <IconButton isTextCanClosed Icon={BiBlock} text='Unblock' type="button" handleClick={handleUnblock} isPending={isPending} />
                            :
                            <IconButton isTextCanClosed Icon={BiBlock} text='Block' type="button" handleClick={handleBlock} isPending={isPending} />
                    }
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default RequestBox