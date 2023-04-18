import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageInfo from '../../components/layout/ContentArea/PageInfo';
import Spinner from '../../components/loading/Spinner';
import useChatScroll from '../../hooks/useChatScroll';
import socket from '../../lib/socket';
import { RootState } from '../../redux/store';
import { getChannel } from '../../services/channelService';
import { getMessagesByChannel } from '../../services/messageService';
import ChatInput from './components/ChatInput';
import Message from './components/Message';
import { setRefresh } from '../../redux/features/channelSlice';

const Chat = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();

  const [channel, setChannel] = useState<Channel>();
  const [messages, setMessages] = useState<Message[]>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const ref = useChatScroll(messages);

  useEffect(() => {
    if (!location.state.channelId) return;
    setIsPending(true);

    const fetchChannel = async () => {
      const result = await getChannel(location.state.channelId);
      setChannel(result.channel);
    }

    const fetchMessages = async () => {
      const result = await getMessagesByChannel(location.state.channelId);
      setMessages(result);
      setIsPending(false);
    };

    if (user?.id) {
      fetchMessages();
      fetchChannel();
    }
  }, [location.state.channelId, user?.id]);

  useEffect(() => {
    socket.on('chat', (data) => {
      if (data.channelId === channel?.id) setMessages((prev: any) => [...prev, data]);
      dispatch(setRefresh());
    });

    return () => {
      socket.off('chat');
      socket.removeListener('chat')
    }
  }, [channel?.id, dispatch]);

  return (
    <section className='h-full relative overflow-hidden'>
      <PageInfo
        isChannel={true}
        name={
          channel?.name ? channel?.name :
            (
              channel?.participants[0].username === user?.username
                ?
                channel?.participants[1].username
                :
                channel?.participants[0].username
            )
        }
        participants={channel?.name ? channel?.participants : null}
        image={
          channel?.name
            ?
            channel.image
            :
            (
              channel?.participants[0].username === user?.username
                ?
                channel?.participants[1].image
                :
                channel?.participants[0].image
            )
        }
      />
      <div ref={ref} className='flex flex-col overflow-x-hidden overflow-y-auto pb-10 h-[85%] scroll-smooth'>
        {
          !isPending
            ?
            (messages && messages.length > 0)
              ?
              messages.map((message, index) => {
                return <Message key={index} message={message} />
              })
              :
              <p className='bg-cyan-600 p-3 m-2 rounded-md text-center'>There is no any messages yet.</p>
            :
            <Spinner size='lg' />
        }
      </div>
      <ChatInput channelId={channel?.id!} setMessages={setMessages} />
    </section>
  )
}

export default Chat;