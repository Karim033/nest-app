import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokenProvider } from 'src/auth/providers/generate-token.provider';
import { CreateUserProviders } from 'src/users/providers/create-user.providers';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    /**
     * Injecting Jwt configigration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigration: ConfigType<typeof jwtConfig>,
    /**
     * Inject user service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /**
     * Inject generate tokens provider
     */
    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfigration.googleClientId;
    const clientSecret = this.jwtConfigration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authentication(GoogleTokenDto: GoogleTokenDto) {
    try {
      // VERFY THE GOOGLE TOKEN SET BY USER
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: GoogleTokenDto.token,
      });
      // Extract the payload from google jwt
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();
      // find the user in the database using the googleId
      const user = await this.usersService.findOneByGoogleId(googleId);
      // if the google exist genetate token
      if (user) {
        return await this.generateTokenProvider.generateToken(user);
      }
      // if not create a new user and then generate tokens
      const newUser = await this.usersService.createGoogleUser({
        email: email,
        firstName: firstName,
        lastName: lastName,
        googleId: googleId,
      });
      return await this.generateTokenProvider.generateToken(newUser);
    } catch (error) {
      // throw UnauthorizedException if not found
      throw new UnauthorizedException(error);
    }
  }
}
