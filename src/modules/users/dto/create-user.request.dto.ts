import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { CreateUserDto } from '@/generated/dto/create-user.dto';

// Request DTO riêng cho API: kế thừa DTO generated và bổ sung field password.
// (passwordHash bị @DtoCreateHidden nên không có trong CreateUserDto, service tự hash)
export class CreateUserRequestDto extends CreateUserDto {
  @ApiProperty({
    minLength: 8,
    example: 'MatKhau@123',
    type: 'string',
  })
  @IsString()
  @MinLength(8)
  password!: string;
}
