import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import sequelize from 'sequelize';
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

  async createUser({ email, username, password }: CreateUserDto): Promise<any> {
    const user = await User.create({
      email,
      username,
      password
    });
    return user;
  }

  async updateUser(user: any): Promise<any> {
    const updatedUser = await User.update(user, { where: { id: user.id } });
    return updatedUser;
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
    if (status && firstUser.friends && firstUser.friends.includes(otherId))
      return {
        statusCode: '406',
        message: 'You are already friends.'
      };
    if (status && firstUser.requests && firstUser.requests.includes(otherId))
      return {
        statusCode: '409',
        message: 'You already sent a request to this user.'
      };

    if (status) {
      User.update(
        { requests: sequelize.fn('array_append', sequelize.col('requests'), otherId) },
        { where: { id } }
      );
    } else {
      User.update(
        { requests: sequelize.fn('array_remove', sequelize.col('requests'), otherId) },
        { where: { id } }
      );
    }

    return {
      statusCode: '200',
      message: 'User updated successfully.'
    };
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
