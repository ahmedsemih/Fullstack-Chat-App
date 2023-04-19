import { FC } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { RxDotsVertical } from 'react-icons/rx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
    image?: string;
    name: string;
    participants?: User[] | null;
    isChannel: boolean;
}

const PageInfo: FC<Props> = ({ image, name, participants, isChannel }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if(location.pathname === '/chat') 
        return navigate('/channel',{state:{channelId:location.state.channelId}});
        navigate('/chat',{state:{channelId:location.state.channelId}});
    };

    return (
        <div className={`text-2xl flex items-center px-5 w-full sticky z-50 top-0 bg-neutral-900 border-b border-neutral-700 ${participants ? 'py-3 h-22' : 'py-11 h-20'}`}>
            <FaArrowLeft className='mr-3 md:mr-5 cursor-pointer' onClick={() => navigate(-1)} />
            {
                image
                &&
                <LazyLoadImage
                    src={image}
                    alt='channel-pp'
                    effect='blur'
                    className='w-16 h-16 rounded-full mx-3 lg:mx-5 object-cover'
                />
            }
            <div className='max-h-16 xl:w-96 lg:w-80 md:w-52 sm:w-36 w-32 overflow-hidden'>
                <p className='hidden md:block'>{name}</p>
                <p className='md:hidden'>{name}</p>
                {
                    participants && <span className='text-sm text-neutral-300 mr-1 font-semibold'>Participants: </span>
                }
                {
                    participants?.length! > 0
                    &&
                    participants?.map((participant) => {
                        return <span key={participant.id} className='text-sm text-neutral-300 mr-2'>{participant.username}</span>
                    })
                }
            </div>
            {
                (isChannel && participants !== null)
                &&
                <div className='ml-auto cursor-pointer group'>
                    <RxDotsVertical onClick={handleClick} />
                </div>
            }
        </div>
    )
}

export default PageInfo