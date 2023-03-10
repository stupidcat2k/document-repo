import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDocDTO {
  @ApiProperty()
  @IsString()
  hdrId: string;

  @ApiProperty()
  @IsString()
  hdrNm: string;

  @ApiProperty()
  @IsString()
  txtCtnt: string;
}
