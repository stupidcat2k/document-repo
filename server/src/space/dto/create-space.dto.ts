import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpaceDTO {
  @ApiProperty()
  @IsString()
  spcNm: string;

  @ApiProperty({ required: false })
  prntSpcId: string;

  @ApiProperty({ required: false })
  dmnId: string;
}
