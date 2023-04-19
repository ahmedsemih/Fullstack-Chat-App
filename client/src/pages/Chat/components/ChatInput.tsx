import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { ImAttachment } from 'react-icons/im';
import { IoMdSend } from 'react-icons/io';
import { GiCancel } from 'react-icons/gi';
import { useSelector } from 'react-redux';

import socket from '../../../lib/socket';
import { RootState } from '../../../redux/store';
import { uploadImages } from '../../../services/userService';

type Props = {
    channelId: string;
    setMessages: Dispatch<SetStateAction<any>>;
}

const ChatInput: FC<Props> = ({ channelId, setMessages }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [images, setImages] = useState<any[] | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const uploadInputRef = useRef<any>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!e.target.chat.value && !images) return;

        setIsPending(true)
        const result = images && await uploadImages(images);
        const message = {
            text: e.target.chat.value,
            userId: user?.id,
            images: result || null,
            user: {
                username: user?.username,
            },
            channelId
        }

        setImages(null);
        socket.emit('chat', message);
        e.target.chat.value = '';
        setIsPending(false);
    };

    const handleUploadImage = (e: any) => {
        e.preventDefault();
        uploadInputRef.current.click();
    };

    const handleChange = (e: any) => {
        setImages(e.target.files)
    };

    return (
        <form onSubmit={handleSubmit} method="POST" className='w-full mt-auto bg-neutral-900 p-3 sticky bottom-0 border-t border-neutral-700'>
            {
                images
                &&
                <div className='pb-3 flex items-center'>
                    <GiCancel onClick={() => setImages(null)} className='mx-4 cursor-pointer' />
                    {
                        Array.from({ length: images!.length }, (x, i) => i).map((index) => {
                            return <span className='mx-2' key={index}>{images![index].name}</span>
                        })
                    }
                </div>
            }
            <div className='flex justify-around items-center'>
                <input
                    ref={uploadInputRef}
                    type="file"
                    multiple
                    onChange={handleChange}
                    hidden
                    accept='image/png, image/jpeg'
                />
                <button type='button' onClick={handleUploadImage}>
                    <ImAttachment className='text-2xl hover:text-neutral-300 duration-200' />
                </button>
                <input
                    readOnly={isPending}
                    spellCheck='false'
                    type="text"
                    name='chat'
                    className="bg-neutral-800 rounded-lg w-[90%] h-10 outline-none p-2"
                />
                <button type='submit'>
                    <IoMdSend className='text-2xl hover:text-neutral-300 duration-200' />
                </button>
            </div>
        </form>
    )
}

export default ChatInput;