import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty()
    usrId: string

    @ApiProperty()
    password: string

    @ApiProperty()
    firstNm: string

    @ApiProperty()
    lastNm: string

    @ApiProperty()
    brdy_val: Date
}
