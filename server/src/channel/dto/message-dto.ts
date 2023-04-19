export class MessageDto {
  userId: string;
  text: string;
  images: string[];
  channelId: string;
  user:{
    username:string;
  }
}
