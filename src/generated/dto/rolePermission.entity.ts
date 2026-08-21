
import {ApiProperty} from '@nestjs/swagger'
import {Role} from './role.entity'
import {Permission} from './permission.entity'


export class RolePermission {
  @ApiProperty({
  type: 'string',
})
roleId: string ;
@ApiProperty({
  type: 'string',
})
permissionId: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
assignedAt: Date ;
@ApiProperty({
  type: () => Role,
  required: false,
})
role?: Role ;
@ApiProperty({
  type: () => Permission,
  required: false,
})
permission?: Permission ;
}
