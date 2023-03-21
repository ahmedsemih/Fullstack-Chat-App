import { Message } from "./message.entity";

export const MessageProvider = [
    {   
        provide:'MESSAGE_REPOSITORY',
        useValue:Message
    }
]