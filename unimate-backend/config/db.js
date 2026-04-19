const mysql = require('mysql2/promise'); // Dùng phiên bản promise để code gọn hơn
require('dotenv').config(); // Load thông tin từ file .env

// Tạo một "hồ chứa" kết nối (Connection Pool)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Gõ thẳng chữ 'root' vào đây
    password: '1234', // Gõ thẳng mật khẩu của bạn vào đây
    database: 'unimate',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test thử kết nối ngay khi khởi động
pool.getConnection()
    .then((connection) => {
        console.log('✅ Đã kết nối thành công với MySQL Database!');
        connection.release(); // Nhả kết nối ra sau khi test xong
    })
    .catch((err) => {
        console.error('❌ Lỗi kết nối Database:', err.message);
    });

module.exports = pool;