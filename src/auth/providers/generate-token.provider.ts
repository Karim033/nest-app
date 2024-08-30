import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { User } from 'src/users/user.entity';

@Injectable()
export class GenerateTokenProvider {
  constructor(
    /**
     * Inject JWT Service
     */
    private readonly jwtService: JwtService,
    /**
     * Jnject JwtConfigration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfigration.audience,
        issuer: this.jwtConfigration.issuer,
        secret: this.jwtConfigration.secret,
        expiresIn,
      },
    );
  }

  public async generateToken(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      // Generata access token
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfigration.accessTokenTtl,
        { email: user.email },
      ),

      // Generate refresh token
      this.signToken(user.id, this.jwtConfigration.refreshTokenTtl),
    ]);
    return { accessToken, refreshToken };
  }
}
