import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;

      delete ret.__v;
    },
  },
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;

      delete ret.__v;
    },
  },
})
export class Message {
  id: string;

  @ApiProperty({
    description: 'from whom is the message',
    example: '6542e38d81d02967f65f7402',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  from: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'to whom is the message',
    example: '6542e38d81d02967f65f7402',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  to: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'chat message',
    example: 'hey !',
  })
  @Prop({ required: true })
  message: string;

  @ApiProperty({
    description: 'chat message status',
    example: false,
  })
  @Prop({ default: false, required: false })
  seen: boolean;

  @ApiProperty({
    description: 'response to message',
    example: 'hi !',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    required: false,
    default: null,
  })
  responseTo: mongoose.Schema.Types.ObjectId;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
