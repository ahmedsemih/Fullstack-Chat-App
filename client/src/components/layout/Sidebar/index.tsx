import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useLocation } from 'react-router-dom';

import { getChannelsByUser } from '../../../services/channelService';
import ChannelBox from './ChannelBox';
import Searchbar from './Searchbar';
import UserBox from './UserBox'
import Spinner from '../../loading/Spinner';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.auth);
    const { refresh } = useSelector((state: RootState) => state.channel);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [lastMessages, setLastMessages] = useState<Message[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        setIsPending(true);
        const fetchChannels = async () => {
            const result = await getChannelsByUser(user?.id!);
            setChannels(result.channels);
            setLastMessages(result.lastMessages);
            setIsPending(false);
        };

        fetchChannels();
    }, [user?.id, refresh]);

    return (
        <aside className={
            `bg-neutral-900 border-r md:block border-neutral-700 xl:col-span-2 md:col-span-2 min-h-screen md:min-h-fit overflow-hidden  
                ${location.pathname === '/' ? 'block' : 'hidden'} 
            `}
        >
            <UserBox />
            <Searchbar setSearch={setSearch} />
            <div className='overflow-x-hidden overflow-y-auto max-h-[865px] pb-16'>
                {
                    isPending
                        ?
                        <div className='mt-10'>
                            <Spinner size='sm' />
                        </div>
                        :
                        (
                            channels.length > 0
                                ?
                                channels.map((channel, index) => {
                                    return (
                                        <ChannelBox
                                            key={channel.id}
                                            channel={channel}
                                            userId={user?.id!}
                                            lastMessage={lastMessages[index]}
                                            search={search}
                                        />
                                    )
                                })
                                :
                                <p className='text-neutral-500 text-center mt-3'>Create a channel now and start chatting.</p>
                        )
                }
            </div>
        </aside>
    )
}

export default Sidebar;