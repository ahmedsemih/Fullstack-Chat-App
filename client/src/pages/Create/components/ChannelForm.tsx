import { useRef, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Participants from './Participants';
import BasicButton from '../../../components/buttons/BasicButton';
import { RootState } from '../../../redux/store';
import { createChannel } from '../../../services/channelService';
import { uploadUserImage } from '../../../services/userService';
import { setRefresh } from '../../../redux/features/channelSlice';
import { NO_AVATAR_CHANNEL } from '../../../utils/constants';


const ChannelForm = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const inputRef = useRef<any>(null);
    const [image, setImage] = useState<any>(null);
    const [participants, setParticipants] = useState<string[]>([user?.id!]);
    const [admins, setAdmins] = useState<string[]>([user?.id!]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        var secureUrl = NO_AVATAR_CHANNEL;

        if (e.target.image.files.length === 1) {
            console.log(e.target.image.files)
            secureUrl = await uploadUserImage(e.target.image.files[0]);
        }

        const { statusCode, message } = await createChannel({
            name: e.target.name.value,
            participants,
            admins,
            description: e.target.description.value,
            image: secureUrl
        });

        if (statusCode === '201') {
            setParticipants([user?.id!]);
            setAdmins([user?.id!]);
            setImage(null);
            e.target.reset();
            dispatch(setRefresh());

            return toast.success(message, {
                duration: 3000,
                position: 'bottom-center',
                style: {
                    backgroundColor: '#353535',
                    color: '#fff'
                }
            });
        }

        toast.error(message, {
            duration: 3000,
            position: 'bottom-center',
            style: {
                backgroundColor: '#353535',
                color: '#fff'
            }
        });
    }

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (e: any) => {
        const imageFile = e.target.files[0];

        if (imageFile && FileReader) {
            const fr = new FileReader();
            fr.onload = () => {
                setImage(fr.result);
            }
            fr.readAsDataURL(imageFile);
        }
    }

    return (
        <form action='POST' className='max-w-[800px] px-3 mx-auto overflow-y-auto overflow-x-hidden' onSubmit={handleSubmit}>
            <div className='flex items-center justify-center w-full lg:flex-row flex-col py-5 border-b border-neutral-600'>
                <LazyLoadImage
                    className={`rounded-full w-52 h-52 object-cover cursor-pointer duration-200 ${!image && 'border-2 border-neutral-600 hover:bg-neutral-700'}`}
                    src={image}
                    alt='ch'
                    onClick={handleClick}
                />
                <input onChange={handleChange} ref={inputRef} type="file" hidden name="image" accept='image/png, image/jpeg' />
                <div className='md:pl-3 lg:pl-5 md:w-[350px]'>
                    <div className='flex flex-col mb-3'>
                        <label htmlFor="name">Name</label>
                        <input
                            className='bg-neutral-700 rounded-md p-2 outline-none'
                            placeholder='Channel Name'
                            maxLength={50}
                            type="text"
                            name='name'
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            name='description'
                            placeholder='Channel Description'
                            className='bg-neutral-700 p-2 resize-none rounded-md outline-none'
                            maxLength={255}
                            cols={20}
                            rows={5}
                        />
                    </div>
                </div>
            </div>
            <Participants participants={participants} setParticipants={setParticipants} admins={admins} setAdmins={setAdmins} />
            <div className='p-3 lg:p-0'>
                <BasicButton type='submit' >Create Channel</BasicButton>
            </div>
            <Toaster />
        </form>
    )
}

export default ChannelForm;