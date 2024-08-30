import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateTagsDto } from '../dtos/create-tags.dtos';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Injecting Tags Repository
     */
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async create(creaTagDto: CreateTagsDto) {
    let tag = this.tagsRepository.create(creaTagDto);
    return await this.tagsRepository.save(tag);
  }

  public async findMultipleTags(tags: number[]) {
    let results = undefined;
    try {
      results = await this.tagsRepository.find({
        where: {
          id: In(tags),
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment pleases try later.',
        {
          description: 'Error Connectiong to he database.',
        },
      );
    }
    return results;
  }

  public async delete(id: number) {
    let tag = undefined;
    try {
      await this.tagsRepository.delete(id);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment pleases try later.',
        {
          description: 'Error Connectiong to he database.',
        },
      );
    }
    if (!tag) {
      throw new BadRequestException('The tag id does not exist');
    }
    return tag;
  }

  public async softRemove(id: number) {
    let tag = undefined;
    try {
      await this.tagsRepository.softDelete(id);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment pleases try later.',
        {
          description: 'Error Connectiong to he database.',
        },
      );
    }
    if (!tag) {
      throw new BadRequestException('The tag id does not exist');
    }
    return tag;
  }
}
