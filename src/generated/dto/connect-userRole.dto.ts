
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty,IsString,ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

export class UserRoleUserIdRoleIdUniqueInputDto {
    @ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
userId: string ;
@ApiProperty({
  type: 'string',
})
@IsNotEmpty()
@IsString()
roleId: string ;
  }

@ApiExtraModels(UserRoleUserIdRoleIdUniqueInputDto)
export class ConnectUserRoleDto {
  @ApiProperty({
  type: UserRoleUserIdRoleIdUniqueInputDto,
})
@IsNotEmpty()
@ValidateNested()
@Type(() => UserRoleUserIdRoleIdUniqueInputDto)
userId_roleId: UserRoleUserIdRoleIdUniqueInputDto ;
}
