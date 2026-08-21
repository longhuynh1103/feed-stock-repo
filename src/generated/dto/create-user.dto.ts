
import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsOptional,IsString,Length,Matches} from 'class-validator'




export class CreateUserDto {
  @ApiProperty({
  minLength: 3,
  maxLength: 50,
  example: 'nhanvien01',
  type: 'string',
})
@IsNotEmpty()
@IsString()
@Length(3, 50)
username: string ;
@ApiProperty({
  maxLength: 100,
  type: 'string',
})
@IsNotEmpty()
@IsString()
@Length(2, 100)
fullName: string ;
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
}
