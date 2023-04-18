import { useEffect, useState } from "react";
import { RxExit } from "react-icons/rx";
import { AiFillEdit } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import IconButton from "../../components/buttons/IconButton";
import PageInfo from "../../components/layout/ContentArea/PageInfo";
import { RootState } from "../../redux/store";
import { getChannel, updateChannel } from "../../services/channelService";
import Participant from "./components/Participant";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../redux/features/channelSlice";

const Channel = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const [channel, setChannel] = useState<Channel>();

    useEffect(() => {
        const fetchChannel = async () => {
            const result = await getChannel(location.state.channelId);
            setChannel(result.channel);
        }

        fetchChannel();
    }, [location.state]);

    const handleClick = async () => {
        const newParticipants: string[] = [];

        for (let i = 0; i > channel?.participants.length!; i++) {
            if (channel?.participants[i].id === user?.id) return;

            newParticipants.push(channel?.participants[i].id);
        }

        await updateChannel(location.state.channelId, {
            participants: newParticipants
        });

        dispatch(setRefresh());
        return navigate('/');
    }

    return (
        <section>
            <PageInfo isChannel name={channel?.name!} image={channel?.image} participants={channel?.participants} />
            <div className="w-full flex flex-col items-center py-1 xl:py-10">
                <div className="flex xl:flex-row flex-col my-5 p-3 max-w-[800px]">
                    <LazyLoadImage
                        src={channel?.image}
                        alt='user-pp'
                        effect="blur"
                        className="w-52 h-52 object-cover rounded-full mx-auto mb-5 xl:mb-0"
                    />
                    <div className="max-w-[400px] lg:w-[800px] md:pl-5">
                        <h1 className="text-2xl font-semibold my-2 xl:text-start text-center">{channel?.name}</h1>
                        <p className="min-h-[100px]">{channel?.description ? channel.description : 'No Information.'}</p>
                        <div className="flex">
                            {
                                channel?.admins?.includes(user?.id!)
                                &&
                                <IconButton Icon={AiFillEdit}
                                    handleClick={() => navigate('/edit', { state: { channelId: channel.id } })}
                                    isTextCanClosed
                                    text="Edit"
                                    type="button"
                                />
                            }
                            <IconButton
                                Icon={RxExit}
                                handleClick={handleClick}
                                isTextCanClosed
                                text="Leave"
                                type="button"
                            />
                        </div>
                    </div>
                </div>
                <div className="max-w-[800px] w-full flex flex-col items-start p-3 overflow-y-auto border-t border-neutral-600 pt-10">
                    {
                        channel &&
                        channel?.participants.map((participant) => {
                            return <Participant key={participant.id} participant={participant} isAdmin={channel.admins?.includes(participant.id)!} />
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Channel;