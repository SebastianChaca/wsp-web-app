import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(Message.name);
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    this.logger.log('create message');
    const { to, from, message } = createMessageDto;
    try {
      const createMessage = await this.messageModel.create({
        to,
        from,
        message,
      });
      return createMessage;
    } catch (error) {
      this.logger.error('create message error');
      throw error;
    }
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
