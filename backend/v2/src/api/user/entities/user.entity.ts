import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
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

  @Prop({ default: new Date() })
  creationDate: Date;

  @Prop({ default: null })
  updated: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: ['user'] })
  roles: string[];
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.method('toJSON', function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, password, ...object } = this.toObject();

  return {
    id: _id,
    ...object,
  };
});
