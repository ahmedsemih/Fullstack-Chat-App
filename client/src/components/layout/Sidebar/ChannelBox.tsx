import moment from 'moment';
import { FC, useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getUser } from '../../../services/userService';
import { setLastSeen, setSelectedChannel } from '../../../redux/features/channelSlice';
import { RootState } from '../../../redux/store';

type Props = {
  channel: Channel;
  userId: string;
  lastMessage: Message | null;
  search: string;
}

const ChannelBox: FC<Props> = ({ channel, userId, lastMessage, search }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedChannel, lastSeen, refresh } = useSelector((state: RootState) => state.channel);
  const [blockList, setBlockList] = useState<string[]>([]);
  const [otherUser, setOtherUser] = useState<User>();
  const [isUnseen, setIsUnseen] = useState(false);

  useEffect(() => {
    const fetchOtherUser = async () => {
      const otherUser = await channel.participants[0] === userId ? channel.participants[1] : channel.participants[0];
      const result = await getUser(otherUser);
      setOtherUser(result.user);
    };

    const fetchBlocked = async () => {
      const result = await getUser(userId);
      setBlockList(result.user.blocked);
    }

    if (moment(lastSeen).diff(moment.utc(channel.updatedAt)) < 0 && lastMessage?.userId !== userId) setIsUnseen(true);
    if (channel.participants.length === 2 && !channel.name) {
      fetchOtherUser();
      fetchBlocked();
    }

  }, [channel, userId, selectedChannel, lastSeen, lastMessage?.userId, refresh]);

  const handleClickChannel = () => {
    const now = new Date().toISOString();
    dispatch(setLastSeen({
      lastSeen: now,
    }));

    dispatch(setSelectedChannel({
      channelId: channel.id
    }));

    setIsUnseen(false);
    return navigate('/chat', { state: { channelId: channel.id } })
  }

  if (blockList && blockList.includes(otherUser?.id!)) return null;

  return (
    <div
      onClick={handleClickChannel}
      className={`
            w-full items-center p-3 border-b border-neutral-700 hover:bg-neutral-800 duration-200 cursor-pointer
            ${search
                ?
                (
                  (channel.name?.toLowerCase().includes(search.toLowerCase()) || otherUser?.username.toLowerCase().includes(search.toLowerCase())) ?
                    'flex' :
                    'hidden'
                )
                : 'flex'
            }
        `}
    >
      {
        channel.participants.length === 2 && !channel.name
          ?
          <>
            <LazyLoadImage
              effect='blur'
              className='rounded-full w-16 h-16 object-cover'
              src={otherUser?.image}
              alt="user-pp"
            />
            <div className='ml-3'>
              <h5 className='font-semibold w-32 sm:w-64 md:w-40 lg:w-52 xl:w-56 h-5 overflow-hidden'>
                {otherUser?.username}
              </h5>
              <p className='text-neutral-400 mt-1 text-sm w-32 sm:w-64 md:w-40 lg:w-52 xl:w-56 h-5 overflow-hidden'>
                {lastMessage
                  ?
                  (
                    !lastMessage.text
                      ?
                      `${lastMessage.images?.length} images sent.`
                      :
                      `${lastMessage.userId === userId ? 'You' : otherUser?.username}: ${lastMessage.text}`
                  )
                  :
                  'You joined to this channel.'}
              </p>
            </div>
          </>
          :
          <>
            <LazyLoadImage
              effect='blur'
              className='rounded-full w-16 h-16 object-cover'
              src={channel.image}
              alt="group-pp"
            />
            <div className='ml-3'>
              <h5 className='font-semibold w-32 sm:w-64 md:w-40 lg:w-52 xl:w-56 h-5 overflow-hidden'>
                {channel.name}
              </h5>
              <p className='text-neutral-400 text-sm w-32 sm:w-64 md:w-40 lg:w-52 xl:w-56 h-5 overflow-hidden'>
                {lastMessage?.text
                  ?
                  (
                    !lastMessage.text
                      ?
                      `${lastMessage.images?.length} images sent.`
                      :
                      lastMessage.text
                  )
                  :
                  'You joined to this channel.'}
              </p>
            </div>
          </>
      }
      <div className='ml-auto h-full'>
        <p className='text-neutral-400 mb-1'>
          {
            moment(lastMessage?.createdAt).isSame(Date.now(), 'day')
              ?
              moment(lastMessage?.createdAt).format('HH:mm')
              :
              moment(lastMessage?.createdAt).format('DD MMM')
          }</p>
        {
          isUnseen
          &&
          <div className='bg-cyan-500 rounded-full w-6 h-6 mx-auto text-center'>
            !
          </div>
        }
      </div>
    </div>
  )
}

export default ChannelBox