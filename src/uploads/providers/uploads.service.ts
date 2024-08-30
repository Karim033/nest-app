import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UploadToAws } from './upload-to-aws';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-file.interface';
import { fileTypes } from '../enums/fileTypes.enum';
import { Express } from 'express';
@Injectable()
export class UploadsService {
  constructor(
    /**
     * Injecting uploadRepository
     */
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
    /**
     * Injecting Upload-to-aws provider
     */
    private readonly uploadToAwsprovider: UploadToAws,
    /**
     * Inject Config Service
     */
    private readonly configService: ConfigService,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    // throw error for unknown file type
    if (
      !['image/gif', 'image/jpeg', 'image/png', 'image/jpg'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('Mime type not supported');
    }
    try {
      // Upload file to AWS S3 bucket
      const path = await this.uploadToAwsprovider.fileUpload(file);
      // Generate new entry in database
      const uploadFile: UploadFile = {
        name: path,
        path: `https://${this.configService.get<string>('appConfig.awsCloudfrontUrl')}/${path}`,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };
      const upload = this.uploadRepository.create(uploadFile);
      return await this.uploadRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
