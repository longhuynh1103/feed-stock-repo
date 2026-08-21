
import {ApiProperty} from '@nestjs/swagger'
import {IsOptional,IsString,Length} from 'class-validator'




export class ConnectRoleDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
id?: string ;
@ApiProperty({
  maxLength: 30,
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@Length(2, 30)
name?: string ;
}
