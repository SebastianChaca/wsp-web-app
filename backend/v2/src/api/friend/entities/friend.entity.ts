import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/api/user/entities/user.entity';
import { Message } from 'src/api/message/entities/message.entity';

@Schema({
  timestamps: true,
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      // delete ret.password;
      delete ret.__v;
    },
  },
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      //delete ret.password;
      delete ret.__v;
    },
  },
})
export class Friend {
  @ApiProperty({
    example: '6541ad729d7d41d1d9dfb6e0',
    description: ' id',
    uniqueItems: true,
  })
  id: string;

  @ApiProperty({
    description: 'user',
    example: '6542e38d81d02967f65f7402',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

    required: true,
  })
  user: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'friend',
    example: '6542e38d81d02967f65f7401',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  friend: mongoose.Schema.Types.ObjectId;

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
  //   lasMessage: Message;

  @ApiProperty({
    example: 1,
    description: 'number of notifications messages pending to read',
  })
  @Prop({ default: 0 })
  notifications: number;

  @ApiProperty({
    example: true,
    description: 'if that friend is requesting to reach you',
  })
  @Prop({ default: false })
  isRequesting: boolean;

  @ApiProperty({
    example: 1,
    description: 'friendship status: 0: requested, 1:accepted: 2: blocked',
  })
  @Prop({ default: 0, enum: [0, 1, 2] })
  status: number;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
