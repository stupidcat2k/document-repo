import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupRequest {
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
