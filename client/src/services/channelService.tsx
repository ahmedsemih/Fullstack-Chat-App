import axiosWithAuth from "../utils/axiosWithAuth";

export const getChannel = async (id: string) => {
    const { data } = await axiosWithAuth.get(`/channels/${id}`);

    const participants:string[]=[];

    if(data.name){
        await data.participants.forEach((participant:User)=>{
            participants.push(participant.id);
        });
    }

    return {
        channel:data,
        participants
    };
}

export const getChannelsByUser = async (id: string) => {
    const { data } = await axiosWithAuth.get(`/channels/user/${id}`);
    return data;
}

export const createChannel = async (channel:any) => {
    const { data } = await axiosWithAuth.post('/channels', channel);
    return data;
}

export const updateChannel = async (id: string, channel: any) => {
    const { data } = await axiosWithAuth.put(`/channels/${id}`, channel);
    return data;
}

export const deleteChannel = async (id: string) => {
    const { data } = await axiosWithAuth.delete(`/channels/${id}`);
    return data;
}