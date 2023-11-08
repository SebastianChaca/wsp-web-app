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
  userId: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'friend',
    example: '6542e38d81d02967f65f7401',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  friendId: mongoose.Schema.Types.ObjectId;

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

FriendSchema.virtual('isPending').get(function () {
  return this.status === 0;
});
FriendSchema.virtual('isAccepted').get(function () {
  return this.status === 1;
});
FriendSchema.virtual('isBlocked').get(function () {
  return this.status === 2;
});
