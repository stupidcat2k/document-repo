import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSpaceDTO {
  @ApiProperty()
  @IsString()
  spcNm: string;

  @ApiProperty()
  @IsString()
  spcId: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  actFlg: boolean;
}
