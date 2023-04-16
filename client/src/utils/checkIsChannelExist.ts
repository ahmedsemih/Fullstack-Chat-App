import { getChannelsByUser } from '../services/channelService';

const checkIsChannelExist = async (userId: string, otherId: string) => {
  const { channels } = await getChannelsByUser(userId);
  var channelId: string = '';

  for (let i = 0; i < channels.length; i++) {
    const result = await channels[i].participants.includes(otherId);
    if (result && channels[i].participants.length === 2 && !channels[i].name) return (channelId = channels[i].id);
  } 

  return channelId;
};

export default checkIsChannelExist;
