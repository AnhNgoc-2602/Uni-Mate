const mysql = require('mysql2/promise');
const ExcelJS = require('exceljs');

async function importDataToDB() {
    console.log("🚀 Đang khởi động hệ thống nạp dữ liệu vào MySQL...");
    let connection;
    
    try {
        // 1. KẾT NỐI DATABASE
        connection = await mysql.createConnection({
            host: 'localhost', 
            user: 'root', 
            password: '1234', // Thay mật khẩu của bạn nếu cần
            database: 'unimate'
        });

        // 2. MỞ FILE EXCEL HOÀN THIỆN
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile('DiemChuan_MockData.xlsx'); // Tên file bạn vừa tạo
        const sheet = workbook.getWorksheet(1);
        
        let successCount = 0;

        console.log(`📂 Đã mở file Excel, phát hiện ${sheet.rowCount - 1} dòng dữ liệu. Đang xử lý...`);

        // 3. QUÉT TỪNG DÒNG VÀ ĐẨY VÀO DB (Bắt đầu từ dòng 2 để bỏ qua tiêu đề)
        for (let i = 2; i <= sheet.rowCount; i++) {
            const row = sheet.getRow(i);
            
            // Nếu dòng trống (không có tên ngành) thì bỏ qua
            if (!row.getCell(3).value) continue; 

            // Gom đúng 14 cột theo thứ tự trong CSDL
            const values = [
                null,                           // id_nganh (Để null để MySQL tự đánh số)
                row.getCell(2).value,           // id_truong
                row.getCell(3).value,           // ten_nganh
                row.getCell(4).value,           // ma_nganh
                row.getCell(5).value,           // he_dao_tao
                row.getCell(6).value,           // to_hop
                row.getCell(7).value,           // nam
                row.getCell(8).value || null,   // diem_chuan (Xử lý năm 2026 đang trống)
                row.getCell(9).value || null,   // hoc_phi
                row.getCell(10).value || null,  // chi_tieu
                row.getCell(11).value,          // phuong_thuc
                row.getCell(12).value,          // thang_diem
                row.getCell(13).value || null,  // ty_le_viec_lam
                row.getCell(14).value || null   // luong_trung_binh
            ];

            const sql = `
                INSERT INTO nganh_hoc 
                (id_nganh, id_truong, ten_nganh, ma_nganh, he_dao_tao, to_hop, nam, diem_chuan, hoc_phi, chi_tieu, phuong_thuc, thang_diem, ty_le_viec_lam, luong_trung_binh)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            // Bắn câu lệnh SQL vào Database
            await connection.execute(sql, values);
            successCount++;
        }

        console.log(`\n🎉 HOÀN TẤT QUY TRÌNH ETL!`);
        console.log(`✅ Đã đẩy thành công ${successCount} bản ghi vào bảng "nganh_hoc" trong Database.`);
        console.log(`🔍 Bạn có thể mở MySQL Workbench để kiểm tra thành quả!`);

    } catch (err) {
        console.error("❌ Lỗi Import:", err.message);
    } finally {
        if (connection) {
            await connection.end();
            console.log("🔌 Đã đóng kết nối CSDL an toàn.");
        }
    }
}

importDataToDB();