import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { checkFriend, setFriend } from '../services/userService';

const useFriendStatus = (id: string) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isFriend, setIsFriend] = useState<boolean>(true);
    const [isPending, setIsPending] = useState<boolean>(true);

    useEffect(() => {
        setIsPending(true);
        const fetchIsFriend = async () => {
            const result = await checkFriend(user?.id!, id);
            setIsFriend(result);
        }

        fetchIsFriend();
        setIsPending(false);
    }, [user?.id, id]);

    const addFriend = () => {
        setFriend(user?.id!, id, true);
        setIsFriend(true);
    }

    const removeFriend = () => {
        setFriend(user?.id!, id, false);
        setIsFriend(false);
    }

    return { isPending, isFriend, addFriend, removeFriend };
}

export default useFriendStatus;