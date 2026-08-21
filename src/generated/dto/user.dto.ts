
import {ApiProperty} from '@nestjs/swagger'


export class UserDto {
  @ApiProperty({
  type: 'string',
})
id: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
createdAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
updatedAt: Date ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
  nullable: true,
})
deletedAt: Date  | null;
@ApiProperty({
  minLength: 3,
  maxLength: 50,
  example: 'nhanvien01',
  type: 'string',
})
username: string ;
@ApiProperty({
  maxLength: 100,
  type: 'string',
})
fullName: string ;
@ApiProperty({
  maxLength: 15,
  type: 'string',
  nullable: true,
})
phone: string  | null;
@ApiProperty({
  type: 'boolean',
})
isActive: boolean ;
}
