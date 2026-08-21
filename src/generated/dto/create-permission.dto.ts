
import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsString,Length} from 'class-validator'




export class CreatePermissionDto {
  @ApiProperty({
  maxLength: 50,
  type: 'string',
})
@IsNotEmpty()
@IsString()
@Length(3, 50)
code: string ;
}
