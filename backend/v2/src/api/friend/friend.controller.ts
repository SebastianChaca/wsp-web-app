import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Friend } from './entities/friend.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { UniqueConstraintFilter } from 'src/common/filters/uniquie-constraint.filter';
//import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('friend')
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @ApiResponse({
    status: 201,
    description: 'add a friend to list',
    type: Friend,
  })
  @ApiResponse({
    status: 400,
    description: 'invalid email',
    type: Friend,
  })
  @Auth()
  @UseFilters(UniqueConstraintFilter)
  @Post()
  create(@Body() createFriendDto: CreateFriendDto, @GetUser() user: User) {
    return this.friendService.create(createFriendDto, user);
  }

  @Get()
  findAll() {
    return this.friendService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
    return this.friendService.update(+id, updateFriendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendService.remove(+id);
  }
}
