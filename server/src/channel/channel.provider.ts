import { Channel } from "./channel.entity";

export const ChannelProvider = [
    {
        provide:'CHANNEL_REPOSITORY',
        useValue:Channel
    }
]