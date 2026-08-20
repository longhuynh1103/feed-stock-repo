
import {UserRole} from '../../userRole/entities/userRole.entity'
import {RolePermission} from '../../rolePermission/entities/rolePermission.entity'


export class Role {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
deletedAt: Date  | null;
name: string ;
users?: UserRole[] ;
permissions?: RolePermission[] ;
}
