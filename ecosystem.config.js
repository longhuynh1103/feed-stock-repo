module.exports = {
  apps: [
    {
      name: 'feed-stock-prod',     // Tên ứng dụng hiển thị trong danh sách PM2
      script: 'dist/main.js',          // Đường dẫn tới file chạy sau khi đã build bằng SWC
      instances: 'max',                // "max" = Tự động bật chế độ Cluster, chạy hết số nhân CPU
      exec_mode: 'cluster',            // Chế độ Cluster giúp cân bằng tải (Load Balancing) giữa các nhân
      autorestart: true,               // Tự động khởi động lại ứng dụng nếu bị crash đột ngột
      watch: false,                    // Tắt chế độ watch trên production để tránh reload liên tục ngoài ý muốn
      max_memory_restart: '1G',        // Tự động khởi động lại nếu ứng dụng bị rò rỉ bộ nhớ vượt quá 1GB
      
      // Quản lý lưu trữ Log qua PM2
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z', // Định dạng thời gian ghi vào đầu mỗi dòng log
      out_file: './logs/out.log',      // Nơi lưu trữ log thông thường (Console.log / Logger.log)
      error_file: './logs/error.log',  // Nơi lưu trữ log lỗi (Logger.error)
      merge_logs: true,                // Gom log của tất cả các nhân CPU (các instance) vào chung một file
      
      // Biến môi trường
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',        // Tự động kích hoạt khi chạy lệnh --env production
        PORT: 3000
      },
    },
  ],
};
