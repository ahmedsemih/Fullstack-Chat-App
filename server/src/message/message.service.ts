import { Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { Channel } from 'src/channel/channel.entity';
import { User } from 'src/user/user.entity';
import { CreateMessageDto } from './dto/create-message-dto';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  async getMessage({ id }) {
    try {
      const message = await Message.findByPk(id);
      return message;
    } catch (error) {
      return {
        statusCode: '404',
        message: 'Message not found.'
      };
    }
  }

  async getMessagesByChannel({ id }) {
    try {
      const messages = await Message.findAll({
        where: { channelId: id },
        order: [['createdAt', 'ASC']],
        include: User
      });
      return messages;
    } catch (error) {
      return {
        statusCode: '404',
        message: 'Message not found.'
      };
    }
  }

  async addMessage({ text, images, channelId, userId }: CreateMessageDto) {
    try {
      const message = await Message.create({ text, images, channelId, userId });
      await Channel.update(
        { messages: sequelize.fn('array_append', sequelize.col('messages'), message.id) },
        { where: { id: message.channelId } }
      );
      return {
        statusCode: '201',
        message: 'Message created successfully.'
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: error
      };
    }
  }

  async updateMessage({ id, message }) {
    try {
      await Message.update(message, { where: { id } });
      return {
        statusCode: '200',
        message: 'Message updated successfully.'
      };
    } catch {
      return {
        statusCode: '404',
        message: 'Message not found.'
      };
    }
  }

  async deleteMessage({ id }) {
    try {
      await Message.destroy({ where: { id } });
      return {
        statusCode: '200',
        message: 'Message deleted successfully.'
      };
    } catch {
      return {
        statusCode: '404',
        message: 'Message not found.'
      };
    }
  }
}
