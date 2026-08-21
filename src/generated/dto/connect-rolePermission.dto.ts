
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class RolePermissionRoleIdPermissionIdUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
roleId: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
permissionId: string ;
  }

@ApiExtraModels(RolePermissionRoleIdPermissionIdUniqueInputDto)
export class ConnectRolePermissionDto {
  @ApiProperty({
  type: RolePermissionRoleIdPermissionIdUniqueInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => RolePermissionRoleIdPermissionIdUniqueInputDto)
roleId_permissionId: RolePermissionRoleIdPermissionIdUniqueInputDto ;
}
