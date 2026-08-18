const { Signale } = require('signale');

/**
 * @typedef {Object} LoggerConfig - Cấu hình hiển thị cho giao diện log.
 * @property {boolean} [displayTimestamp=true] - Hiển thị mốc thời gian (Giờ:Phút:Giây).
 * @property {boolean} [displayDate=false] - Hiển thị ngày tháng năm.
 * @property {boolean} [displayFilename=false] - Hiển thị tên file xảy ra dòng log.
 */

/**
 * @typedef {Object} LoggerOptions - Các tham số cấu hình khởi tạo Logger.
 * @property {string} [scope='LOG'] - Tiêu đề, phạm vi hoạt động của log (ví dụ: 'AUTH', 'DATABASE').
 * @property {boolean} [disabled=false] - Vô hiệu hóa hoàn toàn log, không in ra màn hình console.
 * @property {Object} [signaleInstance=null] - Instance Signale có sẵn nếu muốn tái sử dụng kế thừa.
 * @property {LoggerConfig} [config={}] - Tùy chỉnh nâng cao về cách hiển thị log.
 * @property {Object} [types={}] - Định nghĩa thêm các kiểu log tùy chỉnh mới của riêng bạn.
 */

/**
 * Class Logger tùy biến cao dựa trên thư viện Signale.
 * Hỗ trợ hiển thị log chuyên nghiệp, phân loại màu sắc và quản lý scope.
 */
class Logger extends Signale {
    /**
     * Khởi tạo một cấu hình Logger mới.
     * @param {LoggerOptions} options - Đối tượng chứa toàn bộ cấu hình đầu vào.
     */
    constructor({
        scope = 'LOG',
        disabled = false,
        signaleInstance = null,
        config = {},
        types = {}
    } = {}) {

        // Gộp cấu hình hiển thị mặc định với cấu hình người dùng truyền vào
        const mergedConfig = {
            displayTimestamp: true,
            displayDate: false,
            displayFilename: false,
            ...config
        };

        // Nếu người dùng truyền vào một signaleInstance sẵn có, ta tận dụng cấu hình của nó
        if (signaleInstance && signaleInstance.options) {
            super({
                scope: scope || signaleInstance.options.scope,
                config: { ...signaleInstance.options.config, ...config },
                types: { ...signaleInstance.options.types, ...types }
            });
        } else {
            // Ngược lại khởi tạo mới hoàn toàn với cấu hình chuẩn
            super({
                scope: scope,
                config: mergedConfig,
                types: types
            });
        }

        // Kiểm tra trạng thái vô hiệu hóa log
        if (disabled) {
            this.disable();
        }
    }

    /**
     * Log thông tin ở chế độ Debug (Nhật ký sửa lỗi).
     * Thường dùng để theo dõi luồng dữ liệu chạy ngầm.
     * @param {...*} args - Các tin nhắn, đối tượng dữ liệu cần in ra.
     */
    static debug(...args) {
        return super.debug(...args);
    }

    /**
     * Log thông tin chung (Information).
     * Dùng để thông báo trạng thái bình thường của hệ thống.
     * @param {...*} args - Các tin nhắn, đối tượng dữ liệu cần in ra.
     */
    static info(...args) {
        return super.info(...args);
    }

    /**
     * Log cảnh báo (Warning).
     * Dùng khi hệ thống gặp lỗi nhẹ không gây dừng chương trình nhưng cần lưu ý.
     * @param {...*} args - Các tin nhắn, đối tượng dữ liệu cần in ra.
     */
    static warn(...args) {
        return super.warn(...args);
    }

    /**
     * Log thành công (Success).
     * Dùng khi một tính năng hoặc tiến trình thành công.
     * @param {...*} args - Các tin nhắn, đối tượng dữ liệu cần in ra.
     */
    static success(...args) {
        return super.success(...args);
    }

    /**
     * Log thông báo lỗi (Error).
     * Dùng khi một tính năng hoặc tiến trình bị thất bại, crash cục bộ.
     * @param {...*} args - Các tin nhắn, đối tượng dữ liệu cần in ra.
     */
    static error(...args) {
        return super.error(...args);
    }

    /**
     * Log lỗi nghiêm trọng chết người (Fatal).
     * Dùng khi hệ thống gặp sự cố lớn buộc phải dừng hoặc sập nguồn ứng dụng.
     * @param {...*} args - Các tin nhắn, đối tượng dữ liệu cần in ra.
     */
    static fatal(...args) {
        return super.fatal(...args);
    }
}

module.exports = Logger;
