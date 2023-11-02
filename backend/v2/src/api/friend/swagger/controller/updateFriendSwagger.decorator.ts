import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function UpdateFriendSwaggerDecorator() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'update friend',
    }),
    ApiResponse({
      status: 400,
      description: '65440fc50dc61df15f1 is not a valid mongo id',
    }),
  );
}
