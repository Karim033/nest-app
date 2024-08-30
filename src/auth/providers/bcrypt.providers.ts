import { Injectable } from '@nestjs/common';
import { HashingProviders } from './hashing.providers';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProviders implements HashingProviders {
  public async hashPassword(data: string | Buffer): Promise<string> {
    // Generate Salt
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }

  comparePassword(data: string | Buffer, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
