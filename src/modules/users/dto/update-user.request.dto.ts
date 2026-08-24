import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';
import { UpdateUserDto } from '@/generated/dto/update-user.dto';

// Gửi new_password thì bắt buộc phải có old_password để service đối chiếu
export class UpdateUserRequestDto extends UpdateUserDto {
  @ApiProperty({
    minLength: 8,
    example: 'MatKhau@123',
    type: 'string',
    required: false,
  })
  @ValidateIf((o: UpdateUserRequestDto) => o.new_password !== undefined && o.new_password !== null)
  @IsString()
  old_password?: string;

  @ApiProperty({
    minLength: 8,
    example: 'MatKhauMoi@456',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  new_password?: string;
}
