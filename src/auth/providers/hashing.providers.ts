import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProviders {
  abstract hashPassword(data: string | Buffer): Promise<string>;

  abstract comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
}
