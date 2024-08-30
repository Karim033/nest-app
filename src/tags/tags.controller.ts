import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTagsDto } from './dtos/create-tags.dtos';
import { TagsService } from './providers/tags.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  constructor(
    /**
     * Injecting Tags Service
     */
    private readonly tagsService: TagsService,
  ) {}
  @ApiOperation({
    summary: 'Creates a new Tag',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your Tag is created successfully',
  })
  @Post()
  public create(@Body() createTagDto: CreateTagsDto) {
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({
    summary: 'Deletes Tags',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response if your Tag is Deleted successfully',
  })
  @Delete()
  public delete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  @Delete('soft-delete')
  public softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softRemove(id);
  }
}
