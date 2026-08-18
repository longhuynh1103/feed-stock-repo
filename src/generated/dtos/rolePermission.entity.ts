
import {Role} from './role.entity'
import {Permission} from './permission.entity'


export class RolePermission {
  roleId: string ;
permissionId: string ;
assignedAt: Date ;
role?: Role ;
permission?: Permission ;
}
