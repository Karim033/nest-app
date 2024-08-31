import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiHeaders,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Express } from 'express';
import { UploadsService } from './providers/uploads.service';

@Controller('uploads')
@ApiTags('Uploads Images')
export class UploadsController {
  constructor(
    /**
     * Inject Uploads Service
     */
    private readonly uploadsService: UploadsService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiHeaders([
    { name: 'Content-Type', description: 'multipart/form-data' },
    { name: 'Authorization', description: 'Bearer Token' },
  ])
  @ApiOperation({
    summary: 'Uploads a new image to the server',
  })
  @ApiResponse({
    status: 200,
    description: 'Images successfully uploaded',
  })
  @Post('file')
  public uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.uploadFile(file);
  }
}
