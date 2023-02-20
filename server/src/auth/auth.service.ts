import { Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor( 
        private userService: UserService,
        private jwtService: JwtService
        ) {}

    async validateUser(usrId: string, password: string){
       const user = await this.userService.findOne(usrId);
       if (user && user.password === password) {
            const { ...result} = user;
            return result;
       }
       return null; 
    }

    async login(user: any) {
        const payload = { username: user.username, location: 'Ho Chi Minh' };
        return {
          access_token: this.jwtService.sign(payload),
          success: true
        };
      }
}
