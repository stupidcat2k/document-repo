import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDocNameDTO {
  @ApiProperty()
  @IsString()
  hdrId: string;

  @ApiProperty()
  @IsString()
  hdrNm: string;
}
