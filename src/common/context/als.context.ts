import { AsyncLocalStorage } from 'async_hooks';

// Định nghĩa cấu trúc dữ liệu bạn muốn lưu trữ trong Store
export interface IRequestContext<T = any> {
  ip: string;
  requestId: string;
  method: string;
  path: string;
  startTime: string;
  requester?: T;
}

// Khởi tạo một instance duy nhất cho toàn ứng dụng
export const alsContext = new AsyncLocalStorage<IRequestContext>();
