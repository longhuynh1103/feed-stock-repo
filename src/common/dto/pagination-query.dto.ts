import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

// Query param luôn là string nên bắt buộc @Type(() => Number) để ValidationPipe transform,
// nếu không Prisma sẽ từ chối vì nhận vào take/skip kiểu chuỗi
export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsString()
  orderBy: string = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  orderType: 'asc' | 'desc' = 'desc';
}
