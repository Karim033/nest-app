import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signIn.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProviders } from './hashing.providers';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class SingInProviders {
  constructor(
    /**
     * Inject user service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /**
     * Inject hashing provider
     */
    private readonly hashingProviders: HashingProviders,
    /**
     * Injecting GenerateTokenProvider
     */
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}
  public async signIn(signInDto: SignInDto) {
    // find user using email id
    // Throw an expetion user not found.
    let user = await this.usersService.findOneByEmail(signInDto.email);
    // compare the password to the password in the database
    let isEqual: Boolean = false;
    try {
      isEqual = await this.hashingProviders.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare passwords',
      });
    }
    if (!isEqual) {
      throw new UnauthorizedException('Incorrect password');
    }
    // send confirmation
    return await this.generateTokenProvider.generateToken(user);
  }
}
