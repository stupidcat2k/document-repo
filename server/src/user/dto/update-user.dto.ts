import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
    @ApiProperty()
    @IsString()
    usrNm : string;

    @ApiProperty()
    @IsString()
    usrId: string;

    @ApiProperty()
    @IsOptional()
    actFlg: boolean;

    @ApiProperty()
    @IsOptional()
    userPassword: string;
}