import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
export class PatchUserDtp extends PartialType(CreateUserDto) {}
