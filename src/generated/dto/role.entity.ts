
import {ApiProperty} from '@nestjs/swagger'
import {UserRole} from './userRole.entity'
import {RolePermission} from './rolePermission.entity'


export class Role {
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
  maxLength: 30,
  type: 'string',
})
name: string ;
@ApiProperty({
  type: () => UserRole,
  isArray: true,
  required: false,
})
users?: UserRole[] ;
@ApiProperty({
  type: () => RolePermission,
  isArray: true,
  required: false,
})
permissions?: RolePermission[] ;
}
