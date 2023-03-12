import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  usrId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userPassword: string;

  @ApiProperty()
  @IsString()
  usrNm: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  actFlg: boolean;
}
