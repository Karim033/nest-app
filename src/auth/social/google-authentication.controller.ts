import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enums';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
@ApiTags('OAuth With Google')
export class GoogleAuthenticationController {
  constructor(
    /**
     * Inject googleAuthenticationService
     */
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @ApiOperation({
    summary: 'Authenticate with Google',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns access token and refresh token',
  })
  @Post()
  public async authentication(@Body() GoogleTokenDto: GoogleTokenDto) {
    return await this.googleAuthenticationService.authentication(
      GoogleTokenDto,
    );
  }
}
