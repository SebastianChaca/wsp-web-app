import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { UpdateMessageSeen } from './dto/update-message-seen.dto';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(Message.name);
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    this.logger.log('create message');
    const { to, from, message, responseTo } = createMessageDto;
    try {
      const createMessage = await this.messageModel.create({
        to,
        from,
        message,
        responseTo,
      });
      return createMessage;
    } catch (error) {
      this.logger.error('create message error');
      throw error;
    }
  }

  async findAll(user: User, id: string, paginationDto: PaginationDto) {
    this.logger.log('search messages');
    const { limit = 20, offset = 0 } = paginationDto;
    try {
      const findMessages = await this.messageModel
        .find({
          $or: [
            { from: user.id, to: id },
            { from: id, to: user.id },
          ],
        })
        .sort({ createdAt: 'desc' })
        .populate('to', '-roles -isActive -online -lastActive')
        .populate('responseTo', '-responseTo -from -to -seen')
        .limit(limit)
        .skip(offset);
      return findMessages;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateMessageSeen: UpdateMessageSeen) {
    this.logger.log('update message');
    try {
      const updatedMessage = await this.messageModel.findOneAndUpdate(
        { _id: id },
        updateMessageSeen,
        { new: true },
      );
      return updatedMessage;
    } catch (error) {
      this.logger.error('update message seen status error');
      throw error;
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
