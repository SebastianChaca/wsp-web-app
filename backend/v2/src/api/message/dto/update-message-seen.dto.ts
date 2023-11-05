import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsBoolean } from 'class-validator';

export class UpdateMessageSeen {
  @ApiProperty({
    description: 'update if the message has benn seen',
    example: true,
  })
  @IsBoolean()
  @Equals(true, { message: 'The "seen" property must be true.' })
  seen: boolean;
}
