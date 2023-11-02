import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Query,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { UniqueConstraintFilter } from 'src/common/filters/uniquie-constraint.filter';
import { CreateSwaggerDecorator, FindFriendsSwaggerDecorator } from './swagger';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('friend')
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @CreateSwaggerDecorator()
  @Auth()
  @UseFilters(UniqueConstraintFilter)
  @Post()
  create(@Body() createFriendDto: CreateFriendDto, @GetUser() user: User) {
    return this.friendService.create(createFriendDto, user);
  }

  @FindFriendsSwaggerDecorator()
  @Auth()
  @Get()
  findAllFriendsById(
    @GetUser() user: User,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.friendService.findAllFriends(user, paginationDto);
  }

  // @Get()
  // findAll() {
  //   return this.friendService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.friendService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
    return this.friendService.update(id, updateFriendDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.friendService.remove(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseMongoIdPipe) id: string) {
  //   return this.pokemonService.remove(id);
  // }
}
