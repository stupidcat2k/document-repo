import { IsEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpaceDto {
  @ApiProperty()
  @IsString()
  spcNm: string;

  @ApiProperty({ required: false })
  prntSpcId: string;

  @ApiProperty({ required: false })
  dmnId: string;
}
