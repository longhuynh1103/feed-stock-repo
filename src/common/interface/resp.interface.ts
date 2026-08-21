export default interface IResp<T = any> {
  statusCode: number;
  message?: string;
  requestId?: string;
  executionTime: string;
  data?: T;
  error?: Record<string, any>;
}
