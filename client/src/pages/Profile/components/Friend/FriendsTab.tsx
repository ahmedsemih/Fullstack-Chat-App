import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getFriends } from "../../../../services/userService";
import FriendBox from "./FriendBox";

const FriendsTab = () => {
  const location = useLocation();
  const [friends, setFriends] = useState<User[]>();

  useEffect(() => {
    const fetchFriends = async () => {
      const result = await getFriends(location.state.userId);
      setFriends(result.friends);
    };

    fetchFriends();
  }, [location.state.userId]);

  return (
    <div>
      {
        (friends && friends.length > 0)
        &&
        friends.map((friend: User) => {
          return <FriendBox key={friend.id} friend={friend} />
        })
      }
    </div>
  )
}

export default FriendsTab;