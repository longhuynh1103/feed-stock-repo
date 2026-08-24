import { Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { alsContext } from '@/common/context/als.context';
import { PrismaService } from '@/modules/prisma/prisma.service';

// Danh sách tên các model có CRUD trên PrismaClient (tự sinh theo schema.prisma, có gợi ý khi gõ)
export type PrismaModelName = {
  [K in keyof PrismaClient]: PrismaClient[K] extends { findMany(): unknown } ? K : never;
}[keyof PrismaClient];

// Cấu trúc tối thiểu của một Prisma model delegate mà BaseCrudService sử dụng
export interface ICrudDelegate<TModel, TCreateInput, TUpdateInput, TWhereInput> {
  create(args: { data: TCreateInput }): Promise<TModel>;
  findMany(args?: { take?: number; skip?: number; where?: TWhereInput; orderBy?: Record<string, Prisma.SortOrder> }): Promise<TModel[]>;
  findUniqueOrThrow(args: { where: Record<string, string> }): Promise<TModel>;
  update(args: { where: Record<string, string>; data: TUpdateInput }): Promise<TModel>;
  delete(args: { where: Record<string, string> }): Promise<TModel>;
}

export interface IPaginationQuery {
  limit: number;
  page: number;
  orderBy?: string;
  orderType?: string;
}

/**
 * Class base chứa đầy đủ CRUD cho một model.
 *
 * - Mặc định: chỉ cần extends + super(prismaService, '<tên-model>') là dùng được ngay.
 * - Muốn chỉnh logic: override lại method tương ứng (có thể gọi super(...) để giữ hành vi gốc),
 *   hoặc chỉ override các hook nhỏ (getUniqueFilter, getListWhere, transformCreateData, transformUpdateData).
 * - Lỗi Prisma (P2025 not found, P2002 trùng...) đã được HttpExceptionFilter xử lý tập trung ở tầng global.
 */
export abstract class BaseCrudService<TModel, TCreateInput = any, TUpdateInput = any, TWhereInput = any> {
  protected readonly logger: Logger;
  // Delegate được resolve một lần duy nhất tại đây, các lớp con dùng qua kiểu an toàn ICrudDelegate
  protected readonly delegate: ICrudDelegate<TModel, TCreateInput, TUpdateInput, TWhereInput>;

  constructor(
    protected readonly prismaService: PrismaService,
    modelName: PrismaModelName,
  ) {
    this.logger = new Logger(this.constructor.name);
    const delegate = (prismaService as unknown as Record<string, ICrudDelegate<TModel, TCreateInput, TUpdateInput, TWhereInput>>)[modelName];
    if (!delegate) {
      throw new Error(`Not found model "${modelName}" on PrismaService`);
    }
    this.delegate = delegate;
  }

  // ==================== Hook ghi đè khi cần tùy chỉnh ====================

  /** Điều kiện unique khi tra cứu 1 bản ghi (mặc định theo id, đổi sang slug/code... tại đây) */
  protected getUniqueFilter(id: string): Record<string, string> {
    return { id };
  }

  /** Điều kiện where cho danh sách (mặc định không lọc) */
  protected getListWhere(query: IPaginationQuery): TWhereInput | undefined {
    void query;
    return undefined;
  }

  /** Biến đổi payload trước khi tạo (set mặc định, chuẩn hóa dữ liệu...) */
  protected transformCreateData(payload: TCreateInput): TCreateInput {
    return payload;
  }

  /** Biến đổi payload trước khi cập nhật */
  protected transformUpdateData(id: string, payload: TUpdateInput): TUpdateInput {
    void id;
    return payload;
  }

  // ==================== CRUD mặc định ====================

  async create(data: { payload: TCreateInput }): Promise<TModel> {
    const store = alsContext.getStore();
    const action = this.create.name;
    this.logger.log(`[ReqId: ${store?.requestId} | Action: ${action}]`);
    return await this.delegate.create({ data: this.transformCreateData(data.payload) });
  }

  async findAll(data: IPaginationQuery): Promise<TModel[]> {
    const store = alsContext.getStore();
    const action = this.findAll.name;
    this.logger.log(`[ReqId: ${store?.requestId} | Action: ${action}]`);
    const { limit, page, orderBy, orderType } = data;
    return await this.delegate.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: this.getListWhere(data),
      orderBy: orderBy ? ({ [orderBy]: orderType ?? 'desc' } as Record<string, Prisma.SortOrder>) : { createdAt: 'desc' },
    });
  }

  async findOne(data: { id: string }): Promise<TModel> {
    const store = alsContext.getStore();
    const { id } = data;
    const action = this.findOne.name;
    this.logger.log(`[ReqId: ${store?.requestId} | Action: ${action}]`);
    return await this.delegate.findUniqueOrThrow({ where: this.getUniqueFilter(id) });
  }

  async update(data: { id: string; payload: TUpdateInput }): Promise<TModel> {
    const store = alsContext.getStore();
    const { id, payload } = data;
    const action = this.update.name;
    this.logger.log(`[ReqId: ${store?.requestId} | Action: ${action}]`);
    return await this.delegate.update({
      where: this.getUniqueFilter(id),
      data: this.transformUpdateData(id, payload),
    });
  }

  async remove(data: { id: string }): Promise<TModel> {
    const store = alsContext.getStore();
    const { id } = data;
    const action = this.remove.name;
    this.logger.log(`[ReqId: ${store?.requestId} | Action: ${action}]`);
    return await this.delegate.delete({ where: this.getUniqueFilter(id) });
  }
}
