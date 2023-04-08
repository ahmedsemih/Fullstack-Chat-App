import { useLocation } from 'react-router-dom';
import PageInfo from '../../components/layout/ContentArea/PageInfo';
import EditForm from './components/EditForm';
import { useEffect, useState } from 'react';
import { getChannel } from '../../services/channelService';

const Create = () => {
    const { state } = useLocation();
    const [channel, setChannel] = useState<Channel>();
    const [participants, setParticipants] = useState<string[]>([]);
    const [admins, setAdmins] = useState<string[]>([]);
    const [image, setImage] = useState();

    useEffect(() => {
        const fetchChannel = async () => {
            const result = await getChannel(state.channelId);
            setImage(result.channel.image);
            setChannel(result.channel);
            setAdmins(result.channel.admins)
            setParticipants(result.participants);
        }

        fetchChannel();
    }, [state]);

    return (
        <section>
            <PageInfo isChannel={false} name='Edit Channel' />
            <EditForm
                channel={channel!}
                participants={participants}
                setParticipants={setParticipants}
                admins={admins}
                setAdmins={setAdmins}
                image={image}
                setImage={setImage}
            />
        </section>
    )
}

export default Create;