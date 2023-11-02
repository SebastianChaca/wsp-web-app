import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsNumber,
  IsPositive,
} from 'class-validator';
export class CreateFriendDto {
  @ApiProperty({
    example: 'seba@g.com',
    description: 'email of user to add to friend list',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 2,
    description: 'number of notificacions of messages unread',
  })
  @IsNumber()
  @IsPositive()
  notifications?: number;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isRequesting?: boolean;

  @ApiProperty({
    example: 1,
    description: 'friendship status: 0: requested, 1:accepted: 2: blocked',
  })
  @IsNumber()
  @IsInt()
  @IsIn([0, 1, 2])
  status: number;
}
