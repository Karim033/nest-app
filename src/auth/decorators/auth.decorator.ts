import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enums';
import { AUTH_TYPE_KEY } from '../constants/auth.constatns';
export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
