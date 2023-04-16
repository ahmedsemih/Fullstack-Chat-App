type signFormType = {
  email: string;
  username?: string;
  password: string;
};

type User = {
  id: string;
  username: string;
  email: string;
  image: string;
  about: string;
  friends: string[];
  requests: string[];
  blockeds: string[];
};

type Channel = {
  id: string;
  participants: any[];
  messages: string[];
  name?: string;
  description?: string;
  image?: string;
  admins?: string[];
  createdAt:any;
  updatedAt:any;
};

type Message = {
  id: string;
  userId: string;
  user?: User;
  text?: string;
  images?: string[];
  createdAt: Date;
};
