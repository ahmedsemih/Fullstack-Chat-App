import { Injectable } from '@nestjs/common';
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
}
