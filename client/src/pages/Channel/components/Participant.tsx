import { FC } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { AiFillStar } from 'react-icons/ai';
import { BiBlock } from 'react-icons/bi';
import { IoPersonAdd, IoPersonRemove } from 'react-icons/io5';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';

import IconButton from '../../../components/buttons/IconButton';
import useBlockStatus from '../../../hooks/useBlockStatus';
import useFriendStatus from '../../../hooks/useFriendStatus';
import { RootState } from '../../../redux/store';
import { setRequest } from '../../../services/userService';

type Props = {
  participant: User;
  isAdmin: boolean;
}

const Participant: FC<Props> = ({ participant, isAdmin }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { isFriend, removeFriend } = useFriendStatus(participant.id);
  const { isBlocked, isPending, addBlock, removeBlock } = useBlockStatus(participant.id);

  const handleRequest = async () => {
    const { statusCode } = await setRequest(user?.id!, participant?.id, true);

    if (statusCode === '200') {
      return toast.success('Request sent successfully.', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          backgroundColor: '#353535',
          color: '#fff'
        }
      });
    }

    toast.error(`You already sent a request to ${participant?.username}.`, {
      duration: 3000,
      position: 'bottom-center',
      style: {
        backgroundColor: '#353535',
        color: '#fff'
      }
    });
  }

  const handleBlock = () => {
    addBlock();
    toast.success('User blocked successfully.', {
      duration: 3000,
      position: 'bottom-center',
      style: {
        backgroundColor: '#353535',
        color: '#fff'
      }
    });
  }

  return (
    <div className='flex items-center py-6 w-full'>
      <LazyLoadImage src={participant.image} alt='participant' effect='blur' className='rounded-full w-16 mr-3' />
      <p className='text-2xl'>{participant.username}</p>
      {
        isAdmin && <AiFillStar className='ml-2 text-xl' />
      }
      {
        user?.id !== participant?.id
        &&
        <div className="w-1/2 flex ml-auto">
          {
            isFriend
              ?
              <IconButton
                Icon={IoPersonRemove}
                text='Remove'
                type='button'
                handleClick={removeFriend}
                isTextCanClosed
                isPending={isPending}
              />
              :
              <>
                <IconButton
                  Icon={IoPersonAdd}
                  text='Add'
                  type='button'
                  handleClick={handleRequest}
                  isTextCanClosed
                  isPending={isPending}
                />
              </>
          }
          {
            isBlocked
              ?
              <IconButton
                isTextCanClosed
                Icon={BiBlock}
                text='Unblock'
                type="button"
                handleClick={removeBlock}
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
      }
      <Toaster />
    </div>
  )
}

export default Participant;