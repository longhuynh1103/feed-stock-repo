
import {ApiProperty} from '@nestjs/swagger'
import {IsOptional,IsString,Length} from 'class-validator'




export class UpdatePermissionDto {
  @ApiProperty({
  maxLength: 50,
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@Length(3, 50)
code?: string ;
}
