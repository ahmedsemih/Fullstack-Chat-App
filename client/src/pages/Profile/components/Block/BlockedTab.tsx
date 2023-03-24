import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import { getBlocked } from '../../../../services/userService';
import BlockedBox from './BlockedBox';

const BlockedTab = () => {
  const location = useLocation();
  const [blocked, setBlocked] = useState<User[]>();

  useEffect(() => {
    const fetchBlocked = async () => {
      const result = await getBlocked(location.state.userId);
      setBlocked(result.blocked);
    }

    fetchBlocked();
  }, [location.state.userId]);

  return (
    <div>
      {
        (blocked && blocked.length > 0)
        &&
        blocked.map((item)=>{
          return <BlockedBox key={item.id} blocked={item} />
        })
      }
    </div>
  )
}

export default BlockedTab