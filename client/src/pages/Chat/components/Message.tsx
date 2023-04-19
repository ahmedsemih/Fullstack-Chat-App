import moment from 'moment';
import { FC, useState } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';

import { updateMessage } from '../../../services/messageService';
import { RootState } from '../../../redux/store';

type Props = {
    message: Message;
}

const Message: FC<Props> = ({ message }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleted, setDeleted] = useState(false);

    const handleDelete = async () => {
        const messageDoc = {
            images: null,
            text: 'This message has been deleted.'
        }
        await updateMessage(message.id, messageDoc);
        setDeleted(true);
        setIsOpen(false);
    }
    console.log(message)
    return (
        <div
            className={`
                rounded-md w-fit p-3 m-3 flex flex-col relative group
                ${message.userId === user?.id ? 'bg-cyan-600 ml-auto' : 'bg-neutral-900'}
            `}
        >
            {
                (message.user?.id === user?.id && message.text !== 'This message has been deleted.' && !deleted)
                &&
                <div className='absolute hidden group-hover:block top-2 right-1 z-30 w-[98%] bg-[rgba(8,145,178,.7)] transition-all duration-200'>
                    {
                        isOpen
                            ?
                            <div className='top-3 right-0 p-3 bg-cyan-500 shadow-xl absolute w-32 rounded-md'>
                                <p className='text-xl font-semibold'>Delete ?</p>
                                <button onClick={handleDelete} className='mr-5 font-medium text-lg py-2 hover:underline'>Yes</button>
                                <button onClick={() => setIsOpen(false)} className='py-2 font-medium text-lg hover:underline'>No</button>
                            </div>
                            :
                            <HiOutlineChevronDown onClick={() => setIsOpen(prev => !prev)} className='ml-auto text-3xl cursor-pointer' />
                    }
                </div>
            }
            {
                (message.images && message.images!.length > 0 && !deleted)
                &&
                message.images.map((image: string, index) => {
                    return (
                        <LazyLoadImage
                            key={index}
                            className='w-auto h-52 object-contain mb-2 mx-auto rounded-md'
                            effect='blur'
                            src={image}
                            alt="message"
                        />
                    )
                })
            }
            <p>{deleted ? 'This message has been deleted.' : message.text}</p>
            <div className={`flex justify-between  ${message.userId === user?.id ? 'text-neutral-300' : 'text-neutral-400'}`}>
                <p className='mr-3'>{message.user?.username !== user?.username && message.user?.username}</p>
                <p>
                    {
                        moment(message.createdAt).isSame(Date.now(), 'day')
                            ?
                            moment(message.createdAt).format('HH:mm')
                            :
                            moment(message.createdAt).format('DD MMM HH:mm')
                    }
                </p>
            </div>
        </div>
    )
}

export default Message;