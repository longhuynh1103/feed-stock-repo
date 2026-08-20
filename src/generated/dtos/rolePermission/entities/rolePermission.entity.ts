
import {Role} from '../../role/entities/role.entity'
import {Permission} from '../../permission/entities/permission.entity'


export class RolePermission {
  roleId: string ;
permissionId: string ;
assignedAt: Date ;
role?: Role ;
permission?: Permission ;
}
