import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { checkBlock, setBlocked } from '../services/userService';

const useBlockStatus = (id: string) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [isBlocked, setIsBlocked] = useState<boolean>(false);

    useEffect(() => {
        setIsPending(true);
        const fetchBlocked = async () => {
            const result = await checkBlock(user?.id!, id);
            setIsBlocked(result);
        }

        fetchBlocked();
        setIsPending(false);
    }, [user?.id, id]);

    const addBlock = () => {
        setBlocked(user?.id!, id, true);
        setIsBlocked(true);
    };

    const removeBlock = () => {
        setBlocked(user?.id!, id, false);
        setIsBlocked(false);
    }

    return { isPending, isBlocked, addBlock, removeBlock };
}

export default useBlockStatus;