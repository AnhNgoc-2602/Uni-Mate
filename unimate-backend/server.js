const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Nhúng cấu hình Database vào để server tự động kết nối khi khởi động
const db = require('./config/db'); 

const app = express();

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Chào mừng đến với Backend của UniMate!');
});
// API: Lấy danh sách tất cả các trường Đại học
app.get('/api/truong-dh', async (req, res) => {
  try {
    // Dùng pool connection để gửi lệnh SQL xuống Database
    const [rows] = await db.query('SELECT * FROM truong_dh');
    
    // Trả dữ liệu về cho Frontend dưới dạng JSON
    res.json({
      success: true,
      message: "Lấy danh sách trường thành công!",
      tong_so: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách trường:', error);
    res.status(500).json({ 
      success: false, 
      message: "Lỗi máy chủ nội bộ" 
    });
  }
});
// API: Lấy danh sách trường/ngành yêu thích của một học sinh cụ thể
// Dấu hai chấm (/:id) ở URL dùng để nhận ID của học sinh truyền vào
app.get('/api/yeu-thich/:id_nd', async (req, res) => {
  try {
    const idNguoiDung = req.params.id_nd; // Lấy ID từ trên thanh URL

    // Câu lệnh SQL JOIN 3 bảng để lấy ra tên trường và tên ngành
    const sqlQuery = `
      SELECT 
          tdh.ma_truong,
          tdh.ten_truong,
          nh.ma_nganh,
          nh.ten_nganh,
          nh.to_hop,
          tyt.ngay_luu
      FROM truong_yeu_thich tyt
      JOIN nganh_hoc nh ON tyt.id_nganh = nh.id_nganh
      JOIN truong_dh tdh ON nh.id_truong = tdh.id_truong
      WHERE tyt.id_nd = ?
    `;

    // Thực thi câu lệnh, truyền idNguoiDung vào chỗ dấu ? để chống hack (SQL Injection)
    const [rows] = await db.query(sqlQuery, [idNguoiDung]);

    res.json({
      success: true,
      message: `Lấy danh sách yêu thích của học sinh ID ${idNguoiDung} thành công!`,
      tong_so: rows.length,
      data: rows
    });

  } catch (error) {
    console.error('Lỗi khi lấy danh sách yêu thích:', error);
    res.status(500).json({ 
      success: false, 
      message: "Lỗi máy chủ nội bộ" 
    });
  }
});
// -- CHÚNG TA SẼ VIẾT CÁC API VÀO CHỖ NÀY --

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy mượt mà tại cổng ${PORT}`);
});