import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepostiry: Repository<User>,
  ) {}

  async findUser(username: string, actFlg: boolean) {
    return this.userRepostiry.findOneBy({ usrId: username, actFlg: actFlg });
  }
}
