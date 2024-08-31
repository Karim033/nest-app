import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GoogleTokenDto {
  @ApiProperty({
    description: 'This is google token',
  })
  @IsNotEmpty()
  token: string;
}
