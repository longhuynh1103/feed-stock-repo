
import {ApiProperty} from '@nestjs/swagger'
import {RolePermission} from './rolePermission.entity'


export class Permission {
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
  maxLength: 50,
  type: 'string',
})
code: string ;
@ApiProperty({
  type: () => RolePermission,
  isArray: true,
  required: false,
})
roles?: RolePermission[] ;
}
