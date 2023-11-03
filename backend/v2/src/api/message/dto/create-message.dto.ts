import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'from whom is the message',
    example: '6542e38d81d02967f65f7402',
  })
  @IsString()
  from: string;

  @ApiProperty({
    description: 'to whom is the message',
    example: '6542e38d81d02967f65f7402',
  })
  @IsString()
  to: string;

  @ApiProperty({
    description: 'chat message',
    example: 'hey !',
  })
  @IsString()
  message: string;
}
