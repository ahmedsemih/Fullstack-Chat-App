import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    return user;
  }

  async findBySearch(search: string): Promise<any> {
    const users = await User.findAll({ where: { username: { [Op.iLike]: `%${search}%` } } });
    return users;
  }

  async createUser({ email, username, password }: CreateUserDto): Promise<any> {
    const user = await User.create({
      email,
      username,
      password
    });
    return user;
  }

  async updateUser(user: any): Promise<any> {
    try {
      const updatedUser = await User.update(user, { where: { id: user.id } });
      return updatedUser;
    } catch {
      return {
        statusCode: '409',
        message: 'This username is already in use.'
      };
    }
  }

  async getFriends({ id }) {
    try {
      const friends: User[] = [];

      const friendIds = (await User.findByPk(id)).friends;

      for (let i = 0; i < friendIds.length; i++) {
        const user = await User.findByPk(friendIds[i]);
        friends.push(user);
      }

      return {
        statusCode: '200',
        friends
      };
    } catch (error) {
      return {
        statusCode: '404',
        message: 'Friends not found.'
      };
    }
  }

  async setFriend({ id, otherId, status }) {
    const firstUser = await this.findById(id);
    const secondUser = await this.findById(otherId);

    // Check if user exists
    if (!firstUser || !secondUser) throw new NotFoundException('User not found.');

    // Check if user is blocked
    if (
      (firstUser.blocked && firstUser.blocked.includes(otherId)) ||
      (secondUser.blocked && secondUser.blocked.includes(id))
    )
      return {
        status: '406',
        message: 'You cannot do this. You are blocked.'
      };

    // Check if users are friends
    if (status && firstUser.friends && firstUser.friends.includes(otherId))
      return {
        statusCode: '409',
        message: 'You are already friend.'
      };

    if (status) {
      this.setRequest({ id:otherId, otherId:id, status: false });

      User.update(
        { friends: sequelize.fn('array_append', sequelize.col('friends'), otherId) },
        { where: { id } }
      );
      User.update(
        { friends: sequelize.fn('array_append', sequelize.col('friends'), id) },
        { where: { id: otherId } }
      );
    } else {
      User.update(
        { friends: sequelize.fn('array_remove', sequelize.col('friends'), otherId) },
        { where: { id } }
      );
      User.update(
        { friends: sequelize.fn('array_remove', sequelize.col('friends'), id) },
        { where: { id: otherId } }
      );
    }

    return {
      statusCode: '200',
      message: 'User updated successfully.'
    };
  }

  async getRequests({ id }) {
    try {
      const requests: User[] = [];
      const requestIds = (await User.findByPk(id)).requests;

      for (let i = 0; i < requestIds.length; i++) {
        const user = await User.findByPk(requestIds[i]);
        requests.push(user);
      }

      return {
        statusCode: '200',
        requests
      };
    } catch {
      return {
        statusCode: '404',
        message: 'Requests not found.'
      };
    }
  }

  async setRequest({ id, otherId, status }) {
    const firstUser = await this.findById(id);
    const secondUser = await this.findById(otherId);

    // Check if user exists
    if (!firstUser || !secondUser) throw new NotFoundException('User not found.');

    // Check if user is blocked
    if (
      (firstUser.blocked && firstUser.blocked.includes(otherId)) ||
      (secondUser.blocked && secondUser.blocked.includes(id))
    )
      return {
        status: '406',
        message: 'You cannot do this. You are blocked.'
      };

    // Check if users are friends
    if (status && secondUser.friends && secondUser.friends.includes(id))
      return {
        statusCode: '406',
        message: 'You are already friends.'
      };
    if (status && secondUser.requests && secondUser.requests.includes(id))
      return {
        statusCode: '409',
        message: 'You already sent a request to this user.'
      };

    if (status) {
      User.update(
        { requests: sequelize.fn('array_append', sequelize.col('requests'), id) },
        { where: { id:otherId } }
      );
    } else {
      User.update(
        { requests: sequelize.fn('array_remove', sequelize.col('requests'), id) },
        { where: { id:otherId } }
      );
    }

    return {
      statusCode: '200',
      message: 'User updated successfully.'
    };
  }

  async getBlocked({ id }) {
    try {
      const blocked: User[] = [];
      const blockedIds = (await User.findByPk(id)).blocked;

      for (let i = 0; i < blockedIds.length; i++) {
        const user = await User.findByPk(blockedIds[i]);
        blocked.push(user);
      }

      return {
        statusCode: '200',
        blocked
      };
    } catch {
      return {
        statusCode: '404',
        message: 'Blocked not found.'
      };
    }
  }

  async setBlocked({ id, otherId, status }) {
    const firstUser = await this.findById(id);
    const secondUser = await this.findById(otherId);

    // Check if user exists
    if (!firstUser || !secondUser) throw new NotFoundException('User not found.');

    // Check if user is blocked
    if (status && firstUser.blocked && firstUser.blocked.includes(otherId))
      return {
        statusCode: '409',
        message: 'This user has already been blocked.'
      };

    this.setRequest({ id, otherId, status: false });

    if (status) {
      await this.setFriend({ id, otherId, status: false });
      await this.setRequest({ id, otherId, status: false });

      User.update(
        { blocked: sequelize.fn('array_append', sequelize.col('blocked'), otherId) },
        {
          where: { id }
        }
      );
    } else {
      User.update(
        { blocked: sequelize.fn('array_remove', sequelize.col('blocked'), otherId) },
        {
          where: { id }
        }
      );
    }

    return {
      statusCode: '200',
      message: 'User updated successfully.'
    };
  }
}
