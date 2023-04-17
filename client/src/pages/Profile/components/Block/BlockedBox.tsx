import { FC } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BiBlock } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import IconButton from "../../../../components/buttons/IconButton";

import useBlockStatus from "../../../../hooks/useBlockStatus";

type Props = {
    blocked: User;
}

const BlockedBox: FC<Props> = ({ blocked }) => {
    const navigate = useNavigate();
    const { isPending, isBlocked, addBlock, removeBlock } = useBlockStatus(blocked.id);

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
    };

    return (
        <>
            <div className="flex p-3 items-center">
                <LazyLoadImage
                    onClick={() => navigate('/profile', { state: { userId: blocked.id } })}
                    src={blocked.image}
                    alt='blocked'
                    effect="blur"
                    className="w-20 h-20 rounded-full object-cover cursor-pointer md:block hidden"
                />
                <p
                    onClick={() => navigate('/profile', { state: { userId: blocked.id } })}
                    className="ml-3 text-xl font-semibold cursor-pointer">
                    {blocked.username}
                </p>
                <div className="w-1/2 flex ml-auto">
                    {
                        isBlocked
                            ?
                            <IconButton
                                isTextCanClosed
                                Icon={BiBlock}
                                text='Unblock'
                                type="button"
                                handleClick={handleUnblock}
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
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default BlockedBox;