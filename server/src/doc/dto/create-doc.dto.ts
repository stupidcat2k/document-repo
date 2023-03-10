import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocDTO {
  @ApiProperty()
  @IsString()
  hdrNm: string;

  @ApiProperty()
  @IsString()
  txtCtnt: string;

  @ApiProperty()
  @IsString()
  spcId: string;
}
