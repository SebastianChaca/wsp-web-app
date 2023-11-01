import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    },
  },
})
export class User {
  @Prop()
  name: string;

  @Prop({ lowercase: true, unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ default: false })
  online: boolean;

  @Prop({ default: null })
  lastActive: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: ['user'] })
  roles: string[];
}
export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('test').get(function () {
//   return this.email;
// });
