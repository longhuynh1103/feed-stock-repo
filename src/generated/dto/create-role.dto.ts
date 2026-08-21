
import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsString,Length} from 'class-validator'




export class CreateRoleDto {
  @ApiProperty({
  maxLength: 30,
  type: 'string',
})
@IsNotEmpty()
@IsString()
@Length(2, 30)
name: string ;
}
