import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'This is the Email of the user',
    example: 'john@doe.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'This is the password of the user',
    example: 'password123@',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
