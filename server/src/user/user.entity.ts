import {
  Table,
  Column,
  Model,
  PrimaryKey,
  HasMany,
  DataType,
  Default,
  BeforeCreate,
  Unique
} from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';

@Table({ createdAt: false, updatedAt: false })
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4())
  @Column(DataType.UUID)
  public id: string;

  @Unique
  @Column(DataType.STRING('100'))
  public email: string;

  @Unique
  @Column(DataType.STRING(20))
  public username: string;

  @Column(DataType.STRING)
  public password: string;

  @Column(DataType.STRING)
  public about: string;

  @Column(DataType.STRING)
  public image: string;

  @HasMany(() => User, 'friendId')
  public friends: Array<User>;

  @HasMany(() => User, 'blockedId')
  public blocked: Array<User>;

  @HasMany(() => User, 'requestId')
  public requests: Array<User>;

  @BeforeCreate
  static async hashPassword(user: User) {
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.getDataValue('password'), salt);
      return user.setDataValue('password', hashedPassword);
    }
  }
}
