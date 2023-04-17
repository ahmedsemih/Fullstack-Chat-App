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

  @Default('https://res.cloudinary.com/dtzs4c2uv/image/upload/v1666326774/noavatar_rxbrbk.png')
  @Column(DataType.STRING)
  public image: string;

  @Column(DataType.ARRAY(DataType.UUID))
  public friends: Array<string>;

  @Column(DataType.ARRAY(DataType.UUID))
  public blocked: Array<string>;

  @Column(DataType.ARRAY(DataType.UUID))
  public requests: Array<string>;

  @BeforeCreate
  static async hashPassword(user: User) {
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.getDataValue('password'), salt);
      return user.setDataValue('password', hashedPassword);
    }
  }
}
