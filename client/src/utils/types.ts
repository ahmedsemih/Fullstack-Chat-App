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
