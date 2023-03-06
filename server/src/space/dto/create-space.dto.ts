import { ApiProperty } from '@nestjs/swagger';

export class CreateSpaceDto {
  @ApiProperty()
  spc_nm: string;

  @ApiProperty()
  prnt_spc_id: string;
}
