import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-posts.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { AcitveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({
    summary: 'Fetch specific blog posts with id',
  })
  @ApiResponse({
    status: 200,
    description: 'Post fetched successfully',
  })
  @Get('/:userId?')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    return this.postService.findAll(postQuery, userId);
  }

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created successfully',
  })
  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @AcitveUser() user: ActiveUserData,
  ) {
    return this.postService.create(createPostDto, user);
  }

  @ApiOperation({
    summary: 'Updates an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'A 200 response if your post is updated successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postService.update(patchPostDto);
  }

  @ApiOperation({
    summary: 'Deletes an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'A 200 response if your post is Deleted successfully',
  })
  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
