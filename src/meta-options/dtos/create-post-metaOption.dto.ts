import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @ApiPropertyOptional({
    description: 'This is the MetaValue of the metaOptions',
    example: '{"sidebarEnables":true , "footerActive":true}',
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
