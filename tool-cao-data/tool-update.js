const mysql = require('mysql2/promise');

/**
 * HÀM CẬP NHẬT THÔNG TIN NGÀNH HỌC THEO CỤM NĂM
 * Tái sử dụng được cho mọi trường, mọi năm.
 */
async function batchUpdateStats(idTruong, dataset) {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: 'localhost', user: 'root', password: '1234', database: 'unimate'
        });

        console.log(`🚀 Bắt đầu cập nhật dữ liệu cho Trường ID: ${idTruong}...`);

        for (const item of dataset) {
            const sql = `
                UPDATE nganh_hoc 
                SET hoc_phi = ?, 
                    chi_tieu = ?, 
                    ty_le_viec_lam = ?, 
                    luong_trung_binh = ?
                WHERE id_truong = ? AND ma_nganh = ? AND nam = ?
            `;

            const [result] = await connection.execute(sql, [
                item.hoc_phi || null, 
                item.chi_tieu || null, 
                item.ty_le_viec_lam || null, 
                item.luong_trung_binh || null,
                idTruong,
                item.ma_nganh,
                item.nam
            ]);

            if (result.affectedRows > 0) {
                console.log(`   ✅ Đã cập nhật: ${item.ma_nganh} - Năm ${item.nam}`);
            } else {
                console.log(`   ⚠️ Không tìm thấy dòng để update: ${item.ma_nganh} - Năm ${item.nam}`);
            }
        }
    } catch (err) {
        console.error("❌ Lỗi hệ thống:", err.message);
    } finally {
        if (connection) await connection.end();
    }
}

// ==========================================================
// DATASET: Chi chỉ cần sửa/thêm dữ liệu ở đây
// ==========================================================
const dataPTIT = [
    // Dữ liệu năm 2025 (Đã có thông tin)
    { nam: 2025, ma_nganh: '7480201', hoc_phi: 33000000, chi_tieu: 500, ty_le_viec_lam: 94.50, luong_trung_binh: 12000000 },
    { nam: 2025, ma_nganh: '7480107', hoc_phi: 34000000, chi_tieu: 150, ty_le_viec_lam: 96.00, luong_trung_binh: 15000000 },
    
    // Dữ liệu năm 2026 (Chưa công bố -> Để null)
    { nam: 2026, ma_nganh: '7480201', hoc_phi: null, chi_tieu: null, ty_le_viec_lam: null, luong_trung_binh: null },
    { nam: 2026, ma_nganh: '7480107', hoc_phi: null, chi_tieu: null, ty_le_viec_lam: null, luong_trung_binh: null }
];

// GỌI HÀM: Chạy cho PTIT (ID = 1)
batchUpdateStats(1, dataPTIT);