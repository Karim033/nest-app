import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    description: 'This is the First Name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;
  @ApiPropertyOptional({
    description: 'This is the Last Name of User',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;
  @ApiProperty({
    description: 'This is the Email of the User',
    example: 'john@doe.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;
  @ApiProperty({
    description: 'This is the Password of the User',
    example: 'password123@',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
  password: string;
}
