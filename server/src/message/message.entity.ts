import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Default,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Channel } from 'src/channel/channel.entity';
import { User } from 'src/user/user.entity';

@Table({ updatedAt: false })
export class Message extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV1())
  @Column(DataType.UUID)
  public id: string;

  @ForeignKey(() => Channel)
  @Column(DataType.UUID)
  public channelId: string;
  
  @BelongsTo(() => Channel)
  public channel: Channel;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public userId: string;

  @BelongsTo(() => User)
  public user: User;

  @Column(DataType.STRING)
  public text: string;

  @Column(DataType.ARRAY(DataType.STRING))
  public images: string[];
}
