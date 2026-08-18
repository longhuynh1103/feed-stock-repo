
import {UserRole} from './userRole.entity'
import {RolePermission} from './rolePermission.entity'


export class Role {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
deletedAt: Date  | null;
name: string ;
users?: UserRole[] ;
permissions?: RolePermission[] ;
}
