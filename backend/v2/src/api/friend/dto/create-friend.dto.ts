import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
export class CreateFriendDto {
  @ApiProperty({
    example: 'seba@g.com',
    description: 'email of user to add to friend list',
  })
  @IsEmail()
  email: string;
}
