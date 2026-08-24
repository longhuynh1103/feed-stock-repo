import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { BaseCrudService } from '@/common/base/base-crud.service';
import { CreateUserDto } from '@/generated/dto/create-user.dto';
import { UpdateUserDto } from '@/generated/dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { UpdateUserRequestDto } from './dto/update-user.request.dto';

const BCRYPT_ROUNDS = 10;

@Injectable()
export class UsersService extends BaseCrudService<User, CreateUserDto, UpdateUserDto> {
  constructor(
    prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super(prismaService, 'user');
  }

  // Không bao giờ trả passwordHash ra client
  protected override serializeOne(entity: User): User {
    const { passwordHash, ...safe } = entity;
    void passwordHash;
    return safe as User;
  }

  override async create(data: { payload: CreateUserRequestDto }): Promise<User> {
    const { password, ...payload } = data.payload;
    if (!password) throw new BadRequestException('password là bắt buộc khi tạo user');
    const passwordHash = await hash(password, BCRYPT_ROUNDS);
    const user = await super.create({ payload: { ...payload, passwordHash } as unknown as CreateUserDto });
    // Phát sự kiện để service khác xử lý tiếp bất đồng bộ (gửi mail chào mừng, thống kê...),
    // lỗi ở listener không ảnh hưởng request này
    this.eventEmitter.emit('user.created', { id: user.id, username: user.username });
    return user;
  }

  override async update(data: { id: string; payload: UpdateUserRequestDto }): Promise<User> {
    const { old_password, new_password, ...payload } = data.payload;

    // Không có ý định đổi mật khẩu -> đi theo luồng mặc định của base
    // (phải strip 2 field password ra khỏi payload, nếu không Prisma sẽ báo unknown arg)
    if (!new_password) {
      void old_password;
      return await super.update({ id: data.id, payload });
    }
    if (!old_password) throw new BadRequestException('old_password là bắt buộc khi đổi mật khẩu');

    // Ví dụ module dùng NHIỀU model: cập nhật user + thu hồi toàn bộ refresh token cũ
    // trong CÙNG 1 transaction (atomic - sai một chỗ rollback toàn bộ)
    const updated = await this.runInTransaction(async (tx) => {
      const where = this.getUniqueFilter(data.id) as unknown as Prisma.UserWhereUniqueInput;
      const user = await tx.user.findUniqueOrThrow({ where });
      const matched = await compare(old_password, user.passwordHash);
      if (!matched) throw new BadRequestException('old_password không đúng');
      const passwordHash = await hash(new_password, BCRYPT_ROUNDS);
      const result = await tx.user.update({
        where,
        data: { ...payload, passwordHash },
      });
      await tx.refreshToken.deleteMany({ where: { userId: result.id } });
      return result;
    });

    // Emit sau khi transaction đã commit thành công
    this.eventEmitter.emit('user.password_changed', { id: updated.id });
    return this.serializeOne(updated);
  }
}
