const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql2/promise');

// =========================================================================
// 1. CẤU HÌNH CÀO DỮ LIỆU (Thay đổi tại đây khi chuyển trường)
// =========================================================================
const truongHienTai = {
    id_truong: 1, // Khớp với ID trong bảng truong_dh
    ten_truong_log: "Học viện Công nghệ Bưu chính viễn thông",
    he_dao_tao: "Đại học chính quy",
    
    // Danh sách 3 năm liên tiếp
    cacNam: [
        //{ nam: 2023, url: 'https://tuyensinh.ptit.edu.vn/gioi-thieu/xem-diem-cac-nam-truoc/diem-trung-tuyen-2023/' },
        { nam: 2024, url: 'https://tuyensinh.ptit.edu.vn/gioi-thieu/xem-diem-cac-nam-truoc/diem-trung-tuyen-2024/' },
        //{ nam: 2025, url: 'https://tuyensinh.ptit.edu.vn/gioi-thieu/xem-diem-cac-nam-truoc/diem-trung-tuyen-nam-2025/' }
    ],
    
    // BẢN ĐỒ MAPPING: Tùy biến số cột theo từng trường
    mapping: {
        ten_nganh: 3,     // Cột tên ngành
        ma_nganh: 2,      // Cột mã ngành
        diem_chuan: 4,    // Cột điểm chuẩn
        to_hop: null,     // Nếu web không có cột tổ hợp, để null để dùng mặc định
        phuong_thuc: null // Nếu web không có cột phương thức, để null
    }
};

async function thuThapDuLieu() {
    let connection;
    try {
        // --- KẾT NỐI DATABASE ---
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234', 
            database: 'unimate'
        });
        
        // TẮT KIỂM TRA KHÓA NGOẠI TẠM THỜI (Để tránh lỗi nếu bạn chưa INSERT vào bảng truong_dh)
        await connection.query('SET FOREIGN_KEY_CHECKS = 0');
        
        console.log(`🚀 BẮT ĐẦU CÀO DỮ LIỆU: ${truongHienTai.ten_truong_log}\n`);

        for (const item of truongHienTai.cacNam) {
            console.log(`📅 Đang xử lý năm: ${item.nam} | Link: ${item.url}`);
            
            try {
                const response = await axios.get(item.url);
                const $ = cheerio.load(response.data);
                
                // Mẹo: Nếu 'table tr' không ra gì, hãy thử đổi thành 'tr'
                const rows = $('table tr').length > 0 ? $('table tr') : $('tr');
                const map = truongHienTai.mapping;

                let count = 0;
                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    
                    // --- BÓC TÁCH DỮ LIỆU THEO MAPPING ---
                    const ma_nganh = $(row).find(`td:nth-child(${map.ma_nganh})`).text().trim();
                    const ten_nganh = $(row).find(`td:nth-child(${map.ten_nganh})`).text().trim();
                    const diem_raw = $(row).find(`td:nth-child(${map.diem_chuan})`).text().trim();
                    
                    // Xử lý các trường có thể null hoặc cần giá trị mặc định
                    const to_hop = map.to_hop ? $(row).find(`td:nth-child(${map.to_hop})`).text().trim() : "A00, A01, D01";
                    const phuong_thuc = map.phuong_thuc ? $(row).find(`td:nth-child(${map.phuong_thuc})`).text().trim() : "Xét điểm thi THPT";

                    // Chuyển đổi điểm
                    const diem_chuan = parseFloat(diem_raw.replace(',', '.')) || 0;

                    // --- BỘ LỌC DỮ LIỆU ---
                    if (!ma_nganh || ma_nganh.toLowerCase().includes('mã') || diem_chuan > 40 || diem_chuan < 10) {
                        continue;
                    }

                    // --- IN RA ĐỂ KIỂM TRA (SOI X-QUANG) ---
                    console.log(`   [OK] ${ma_nganh} - ${ten_nganh}: ${diem_chuan}`);

                    // --- SQL INSERT (Khớp chính xác bảng nganh_hoc của bạn) ---
                    const sql = `INSERT INTO nganh_hoc 
                        (id_truong, ten_nganh, ma_nganh, he_dao_tao, to_hop, nam, diem_chuan, phuong_thuc) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

                    await connection.execute(sql, [
                        truongHienTai.id_truong,
                        ten_nganh,
                        ma_nganh,
                        truongHienTai.he_dao_tao,
                        to_hop,
                        item.nam,
                        diem_chuan,
                        phuong_thuc
                    ]);
                    count++;
                }
                console.log(`✅ Hoàn tất năm ${item.nam}: Đã lưu ${count} ngành.\n`);
            } catch (err) {
                console.error(`❌ Lỗi tại năm ${item.nam}: ${err.message}`);
            }
        }
        
        // BẬT LẠI KIỂM TRA KHÓA NGOẠI
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log(`🎉 XONG! Đã hoàn thành bộ dữ liệu cho ${truongHienTai.ten_truong_log}.`);

    } catch (error) {
        console.error("❌ Lỗi hệ thống:", error.message);
    } finally {
        if (connection) {
            await connection.end();
            console.log("🔌 Đã đóng kết nối CSDL.");
        }
    }
}

thuThapDuLieu();