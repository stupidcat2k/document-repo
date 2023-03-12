import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUser(username: string, actFlg: boolean) {
    return this.userRepository.findOneBy({ usrId: username, actFlg: actFlg });
  }

  async findAll(){
    return this.userRepository.find({
      select:{
        actFlg:true,
        usrId:true,
        usrNm:true
      }});
  }

  async updateUser(updateUserDTO: UpdateUserDTO, userId: string){
    const user = await this.userRepository.findOne({where: {
      usrId: updateUserDTO.usrId
    }});
    user.actFlg = updateUserDTO.actFlg;
    user.usrNm = updateUserDTO.usrNm;
    user.updateDate = new Date();
    user.updateUser = userId;
    if(updateUserDTO.userPassword !== undefined){
      user.usrPwd = await bcrypt.hash(updateUserDTO.userPassword, 10);
    }
    const result = await this.userRepository.save(user);
    return result;
  }

  async create(createUserDTO: CreateUserDto, userId: string){
    const password = await bcrypt.hash(createUserDTO.userPassword, 10);
    const result = await this.userRepository.save({
      actFlg: true,
      usrId: createUserDTO.usrId,
      usrNm: createUserDTO.usrNm,
      usrPwd: password,
      createDate: new Date(),
      createUser: userId,
      updateDate: new Date(),
      updateUser: userId
    })
    return result;
  }
}
