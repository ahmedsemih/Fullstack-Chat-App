import { Sequelize } from 'sequelize-typescript';
import { Channel } from 'src/channel/channel.entity';
import { Message } from 'src/message/message.entity';
import { User } from 'src/user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'link-chat-app'
      });
      sequelize.addModels([User, Message, Channel]);
      await sequelize.sync();
      return sequelize;
    }
  }
];
