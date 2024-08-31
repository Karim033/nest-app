import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersDto } from './dtos/get-users.dto';
import { PatchUserDtp } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enums';
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id?')
  @ApiOperation({
    summary: 'Fetches a list of registered users on th application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number taht you want the API to return',
    example: 1,
  })
  public getUsers(
    @Param() getUserDto: GetUsersDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUserDto, limit, page);
  }

  @ApiOperation({
    summary: 'Creates a new user on the application',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({
    summary: 'Creates multiple users on the application',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createMany(createManyUsersDto);
  }

  @ApiOperation({
    summary: 'Updates a registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'User Updated successfully',
  })
  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDtp) {
    return patchUserDto;
  }
}
