
import {ApiProperty} from '@nestjs/swagger'
import {IsOptional,IsString,Length} from 'class-validator'




export class ConnectUserDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  minLength: 3,
  maxLength: 50,
  example: 'nhanvien01',
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@Length(3, 50)
username?: string ;
}
