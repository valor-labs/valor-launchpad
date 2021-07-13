import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {HELPERS} from "../seed_helpers/data";

@Injectable()
export class CryptService {
  saltRounds = HELPERS.saltRounds;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async validateHash(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
