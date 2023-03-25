import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import { getUser } from '../../../services/userService';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

type Props = {
    user?: User;
    userId?: string;
    isAdded: boolean;
    participants: string[];
    setParticipants: Dispatch<SetStateAction<string[]>>;
    search?: string;
    admins: string[];
    setAdmins: Dispatch<SetStateAction<string[]>>;
}

const UserBar: FC<Props> = ({ user, userId, isAdded, participants, setParticipants, search, admins, setAdmins }) => {
    const [participant, setParticipant] = useState<User | null>(user ? user : null);

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            const result = await getUser(userId);
            setParticipant(result.user);
        };

        fetchUser();
    }, [userId, search])

    const handleClick = () => {
        if (isAdded) {
            const newParticipants = participants.filter((p: string) => {
                return p !== participant?.id;
            });

            if (admins?.includes(participant?.id!)) {
                const newAdmins = admins?.filter((admin) => {
                    return admin !== participant?.id;
                });

                setAdmins(newAdmins!);
            }

            setParticipants(newParticipants);
        } else {
            setParticipants((prev) => [...prev, participant?.id!]);
        }
    }

    const handleAddAdmin = () => {
        if (!setAdmins) return;

        if (admins?.includes(participant?.id!)) {
            const newAdmins = admins?.filter((admin) => {
                return admin !== participant?.id;
            });

            return setAdmins(newAdmins!);
        }

        return setAdmins((prev) => [...prev, participant?.id!]);
    };

    return (
        <div
            className={`
                w-full items-center bg-neutral-700 rounded-md p-3
                ${(search && !isAdded) ? (participant?.username?.toLowerCase().includes(search.toLowerCase()) ? 'flex' : 'hidden') : 'flex'}
            `}
        >
            <LazyLoadImage
                src={participant?.image}
                alt='participant'
                className='w-12 h-12 rounded-full'
                effect='blur'
            />
            <p className='ml-2 font-semibold'>{participant?.username}</p>
            <div className='ml-auto'>
                <button
                    onClick={handleClick}
                    type='button'
                    className='bg-neutral-700 text-3xl hover:bg-neutral-600 p-2 rounded-md text-white'
                >
                    {
                        isAdded
                            ?
                            <IoMdRemoveCircleOutline />
                            :
                            <IoMdAddCircleOutline />
                    }
                </button>
                {
                    isAdded
                    &&
                    <button
                        onClick={handleAddAdmin}
                        type='button'
                        className='bg-neutral-700 text-3xl hover:bg-neutral-600 p-2 rounded-md text-white'
                    >
                        {
                            admins?.includes(participant?.id!)
                                ?
                                <AiFillStar />
                                :
                                <AiOutlineStar />
                        }
                    </button>
                }
            </div>
        </div>
    )
}

export default UserBar