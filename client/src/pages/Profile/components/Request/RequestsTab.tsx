import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getRequests } from '../../../../services/userService';
import RequestBox from './RequestBox';

const RequestsTab = () => {
  const location = useLocation();
  const [requests, setRequests] = useState<User[]>();
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    const fetchRequests = async () => {
      const result = await getRequests(location.state.userId);
      setRequests(result.requests);
    }

    fetchRequests();
  }, [location.state.userId, trigger]);

  return (
    <div>
      {
        (requests && requests.length > 0)
        &&
        requests.map((request) => {
          return <RequestBox key={request.id} request={request} setTrigger={setTrigger} />
        })
      }
    </div>
  )
}

export default RequestsTab