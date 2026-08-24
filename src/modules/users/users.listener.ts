import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const UserEvents = {
  CREATED: 'user.created',
  PASSWORD_CHANGED: 'user.password_changed',
} as const;

// Listener chạy bất đồng bộ, độc lập với request chính:
// đặt các side-effect nặng ở đây (gửi email, push notification, đồng bộ hệ thống ngoài...)
// để không làm chậm response của API tạo user
@Injectable()
export class UsersListener {
  private readonly logger = new Logger(UsersListener.name);

  @OnEvent(UserEvents.CREATED)
  handleUserCreated(payload: { id: string; username: string }) {
    try {
      this.logger.log(`Chào mừng thành viên mới: ${payload.username} (${payload.id})`);
      // TODO: mở rộng side-effect thực tế tại đây (email/notification/sync CRM...)
    } catch (error) {
      // Không được để lỗi side-effect làm ảnh hưởng luồng chính
      this.logger.error(`Xử lý sự kiện ${UserEvents.CREATED} thất bại: ${error}`);
    }
  }

  @OnEvent(UserEvents.PASSWORD_CHANGED)
  handlePasswordChanged(payload: { id: string }) {
    this.logger.log(`User ${payload.id} đã đổi mật khẩu, refresh token đã bị thu hồi`);
  }
}
