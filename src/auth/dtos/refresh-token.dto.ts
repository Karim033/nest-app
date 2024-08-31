import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'This is the Refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImlhdCI6MTcyNTEzNTY1MywiZXhwIjoxNzI1MjIyMDUzLCJhdWQiOiJsb2NhbGhvc3Q6MzAwMCIsImlzcyI6ImxvY2FsaG9zdDozMDAwIn0.ARKAuelMIhkMRDS3yf5xklcTOXq1tfe4QzMX3Jju174',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
