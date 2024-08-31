import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from './dtos/create-post-metaOption.dto';
import { MetaOptionsService } from './providers/meta-options.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Meta Options')
@Controller('meta-options')
export class MetaOptionsController {
  constructor(
    /**
     * Inject the MetaOptionsService
     */
    private readonly metaOptionsService: MetaOptionsService,
  ) {}

  @ApiOperation({
    summary: 'Create a new meta option',
  })
  @ApiResponse({
    status: 201,
    description: 'Meta option created successfully',
  })
  @Post()
  public create(@Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    return this.metaOptionsService.create(createPostMetaOptionsDto);
  }
}
