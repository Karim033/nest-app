import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProviders } from 'src/auth/providers/hashing.providers';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProviders {
  constructor(
    /**
     * Injecting userRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    /**
     * Inject hashingProviders
     */
    @Inject(forwardRef(() => HashingProviders))
    private readonly hashingProviders: HashingProviders,
    /**
     * Inject mailService
     */
    private readonly mailService: MailService,
  ) {}
  /**
   * The method to create a new user
   */
  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;
    try {
      // Check is user exists with same email
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      // Might save the details of the exception
      // Information which is sensitive
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    // Handle exception
    if (existingUser) {
      throw new BadRequestException(
        'The user already exists, please check your email.',
      );
    }
    // Create a new user
    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProviders.hashPassword(
        createUserDto.password,
      ),
    });
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }
    // try {
    //   await this.mailService.sendUserWelcome(newUser);
    // } catch (error) {
    //   throw new RequestTimeoutException(error);
    // }
    return newUser;
  }
}
