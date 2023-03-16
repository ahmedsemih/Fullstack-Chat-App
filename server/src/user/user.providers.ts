import { User } from './user.entity';

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];