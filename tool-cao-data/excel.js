const axios = require('axios');
const cheerio = require('cheerio');
const ExcelJS = require('exceljs');

// =========================================================================
// CẤU HÌNH CÀO DỮ LIỆU ĐA CẤU TRÚC (TỰ ĐỘNG MAPPING THEO NĂM)
// =========================================================================
const truongHienTai = {
    id_truong: 1, 
    ten_truong_log: "Học viện Công nghệ Bưu chính viễn thông",
    he_dao_tao: "Đại học chính quy",
    
    cacNam: [
        { 
            nam: 2023, 
            url: 'https://tuyensinh.ptit.edu.vn/gioi-thieu/xem-diem-cac-nam-truoc/diem-trung-tuyen-2023/',
            mapping: { ten_nganh: 2, ma_nganh: 3, diem_chuan: 5, to_hop: null, phuong_thuc: null } 
        },
        { 
            nam: 2024, 
            url: 'https://tuyensinh.ptit.edu.vn/gioi-thieu/xem-diem-cac-nam-truoc/diem-trung-tuyen-2024/',
            mapping: { ten_nganh: 3, ma_nganh: 2, diem_chuan: 4, to_hop: null, phuong_thuc: null } 
        },
        { 
            nam: 2025, 
            url: 'https://tuyensinh.ptit.edu.vn/gioi-thieu/xem-diem-cac-nam-truoc/diem-trung-tuyen-nam-2025/',
            mapping: { ten_nganh: 2, ma_nganh: 3, diem_chuan: 4, to_hop: null, phuong_thuc: null } 
        }
    ]
};

async function thuThapVaXuatExcel() {
    console.log(`🚀 BẮT ĐẦU CÀO DỮ LIỆU: ${truongHienTai.ten_truong_log}\n`);
    
    const tatCaDuLieu = [];

    for (const item of truongHienTai.cacNam) {
        console.log(`📅 Đang quét dữ liệu năm: ${item.nam}...`);
        
        try {
            const response = await axios.get(item.url);
            const $ = cheerio.load(response.data);
            
            const rows = $('table tr').length > 0 ? $('table tr') : $('tr');
            const map = item.mapping; 

            let count = 0;
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                
                const ma_nganh = $(row).find(`td:nth-child(${map.ma_nganh})`).text().trim();
                const ten_nganh = $(row).find(`td:nth-child(${map.ten_nganh})`).text().trim();
                const diem_raw = $(row).find(`td:nth-child(${map.diem_chuan})`).text().trim();
                
                const to_hop = map.to_hop ? $(row).find(`td:nth-child(${map.to_hop})`).text().trim() : "A00, A01, D01";
                const phuong_thuc = map.phuong_thuc ? $(row).find(`td:nth-child(${map.phuong_thuc})`).text().trim() : "Xét điểm thi THPT";

                const diem_chuan = parseFloat(diem_raw.replace(',', '.')) || 0;

                if (!ma_nganh || ma_nganh.toLowerCase().includes('mã') || diem_chuan === 0) {
                    continue;
                }

                // GOM DỮ LIỆU - THỨ TỰ VÀ TÊN BIẾN KHỚP 100% VỚI ẢNH DB CỦA BẠN
                tatCaDuLieu.push({
                    id_nganh: null, // Để trống vì MySQL sẽ tự động tăng (Auto Increment)
                    id_truong: truongHienTai.id_truong,
                    ten_nganh: ten_nganh,
                    ma_nganh: ma_nganh,
                    he_dao_tao: truongHienTai.he_dao_tao,
                    to_hop: to_hop,
                    nam: item.nam,
                    diem_chuan: diem_chuan,
                    hoc_phi: null,
                    chi_tieu: null,
                    phuong_thuc: phuong_thuc,
                    thang_diem: 30, // Thêm mặc định là 30 theo tiêu chuẩn VN
                    ty_le_viec_lam: null,
                    luong_trung_binh: null
                });
                count++;
            }
            console.log(`   ✔️ Hoàn tất năm ${item.nam}: Gom được ${count} ngành.`);
        } catch (err) {
            console.error(`   ❌ Lỗi tại năm ${item.nam}: ${err.message}`);
        }
    }

    // =========================================================================
    // XUẤT RA EXCEL (CẤU TRÚC KHỚP VỚI CƠ SỞ DỮ LIỆU)
    // =========================================================================
    if (tatCaDuLieu.length > 0) {
        console.log(`\n💾 Đang tiến hành tạo file Excel với tổng cộng ${tatCaDuLieu.length} bản ghi...`);
        
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('nganh_hoc'); // Đổi tên sheet cho giống tên bảng

        // ĐỊNH NGHĨA CỘT ĐÚNG THỨ TỰ (Dùng luôn tên biến trong CSDL làm Header để dễ import)
        sheet.columns = [
            { header: 'id_nganh', key: 'id_nganh', width: 10 },
            { header: 'id_truong', key: 'id_truong', width: 10 },
            { header: 'ten_nganh', key: 'ten_nganh', width: 35 },
            { header: 'ma_nganh', key: 'ma_nganh', width: 15 },
            { header: 'he_dao_tao', key: 'he_dao_tao', width: 20 },
            { header: 'to_hop', key: 'to_hop', width: 20 },
            { header: 'nam', key: 'nam', width: 10 },
            { header: 'diem_chuan', key: 'diem_chuan', width: 15 },
            { header: 'hoc_phi', key: 'hoc_phi', width: 15 },
            { header: 'chi_tieu', key: 'chi_tieu', width: 15 },
            { header: 'phuong_thuc', key: 'phuong_thuc', width: 25 },
            { header: 'thang_diem', key: 'thang_diem', width: 15 },
            { header: 'ty_le_viec_lam', key: 'ty_le_viec_lam', width: 20 },
            { header: 'luong_trung_binh', key: 'luong_trung_binh', width: 20 }
        ];

        sheet.addRows(tatCaDuLieu);
        
        // Làm đẹp hàng tiêu đề
        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } }; 

        await workbook.xlsx.writeFile('DiemChuan_Tho.xlsx');
        console.log(`🎉 XONG! File "DiemChuan_Tho.xlsx" đã sẵn sàng!`);
    }
}

thuThapVaXuatExcel();