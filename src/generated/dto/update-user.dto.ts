
import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean,IsOptional,IsString,Length,Matches} from 'class-validator'




export class UpdateUserDto {
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
@ApiProperty({
  maxLength: 100,
  type: 'string',
  required: false,
})
@IsOptional()
@IsString()
@Length(2, 100)
fullName?: string ;
@ApiProperty({
  maxLength: 15,
  type: 'string',
  required: false,
  nullable: true,
})
@IsOptional()
@IsString()
@Matches(/^\+?[0-9]{8,15}$/)
phone?: string  | null;
@ApiProperty({
  type: 'boolean',
  default: true,
  required: false,
})
@IsOptional()
@IsBoolean()
isActive?: boolean ;
}
