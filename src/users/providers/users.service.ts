import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersDto } from '../dtos/get-users.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateManyProviders } from './create-many.providers';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProviders } from './create-user.providers';
import { FindOneByEmailProviders } from './find-one-by-email.providers';
import { FindOneByGoogleProvider } from './find-one-by-google.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';
/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting userRepository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    /**
     * Inject createManyProviders
     */
    private readonly createManyProviders: CreateManyProviders,
    /**
     * Inject createUserProviders
     */
    private readonly createUserProviders: CreateUserProviders,
    /**
     * Inject findOneByEmailProviders
     */
    private readonly findOneByEmailProviders: FindOneByEmailProviders,
    /**
     * Inject find googleId provider
     */
    private readonly findOneByGoogleIdProvider: FindOneByGoogleProvider,
    /**
     * Inject create google user provider
     */
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  /**
   * The method to create a new user
   */
  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProviders.createUser(createUserDto);
  }
  /**
   * The method to get all the users form the database
   */
  public findAll(getUserDto: GetUsersDto, limit: number, page: number) {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The API endpoint does not exist',
        fileName: 'users.service.ts',
        lineNumber: 88,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Occured because the API endpoint does not exist',
      },
    );
  }
  /**
   * Finding a single user usin the ID of the user
   */
  public async findOneById(id: number) {
    let user = undefined;
    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment pleases try later.',
        {
          description: 'Error Connectiong to he database.',
        },
      );
    }
    /**
     * Handel the user dones not exist
     */
    if (!user) {
      throw new BadRequestException('User id not exist');
    }
    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.createManyProviders.createMany(createManyUsersDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneByEmailProviders.findOneByEmail(email);
  }

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }
  public async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
