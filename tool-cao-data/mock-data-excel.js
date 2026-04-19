const ExcelJS = require('exceljs');

// Hàm tạo số ngẫu nhiên trong khoảng
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hàm tạo số thập phân ngẫu nhiên (ví dụ: 95.50)
function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

async function autoFillMockData() {
    console.log("🚀 Đang khởi động Robot bơm dữ liệu giả (Mock Data)...");
    
    const workbook = new ExcelJS.Workbook();
    
    try {
        // Đọc file thô của bạn
        await workbook.xlsx.readFile('DiemChuan_Tho.xlsx');
        const sheet = workbook.getWorksheet(1); // Lấy sheet đầu tiên
        
        let filledCount = 0;

        // Quét từ dòng 2 (bỏ qua tiêu đề)
        for (let i = 2; i <= sheet.rowCount; i++) {
            const row = sheet.getRow(i);
            
            // Lấy thông tin Tên ngành (cột 3) và Năm (cột 7) để làm logic giả
            const tenNganh = row.getCell(3).value ? row.getCell(3).value.toString().toLowerCase() : '';
            const nam = parseInt(row.getCell(7).value) || 2024;
            
            // ==========================================
            // LOGIC LÀM GIẢ DỮ LIỆU THÔNG MINH
            // ==========================================
            let baseHocPhi, baseChiTieu, baseViecLam, baseLuong;

            // Nếu là nhóm ngành HOT (Công nghệ thông tin, AI, Máy tính...)
            if (tenNganh.includes('công nghệ thông tin') || tenNganh.includes('trí tuệ nhân tạo') || tenNganh.includes('máy tính') || tenNganh.includes('phần mềm')) {
                baseHocPhi = getRandomInt(30, 38) * 1000000;    // 30 - 38 triệu
                baseChiTieu = getRandomInt(30, 60) * 10;        // 300 - 600 sinh viên
                baseViecLam = getRandomFloat(94, 98.5);         // 94% - 98.5%
                baseLuong = getRandomInt(12, 18) * 1000000;     // 12 - 18 triệu
            } 
            // Các nhóm ngành Kỹ thuật / Điện tử
            else if (tenNganh.includes('kỹ thuật') || tenNganh.includes('điện') || tenNganh.includes('viễn thông')) {
                baseHocPhi = getRandomInt(26, 32) * 1000000;
                baseChiTieu = getRandomInt(15, 35) * 10; 
                baseViecLam = getRandomFloat(90, 95);
                baseLuong = getRandomInt(10, 14) * 1000000;
            }
            // Các nhóm ngành Kinh tế / Khác
            else {
                baseHocPhi = getRandomInt(22, 28) * 1000000;
                baseChiTieu = getRandomInt(10, 25) * 10; 
                baseViecLam = getRandomFloat(85, 92);
                baseLuong = getRandomInt(8, 11) * 1000000;
            }

            // Lạm phát học phí và lương theo năm (Mỗi năm tăng một chút)
            const heSoNam = nam - 2023; // Mốc 2023
            const hocPhiFinal = baseHocPhi + (heSoNam * 1500000); 
            const luongFinal = baseLuong + (heSoNam * 500000);

            // ==========================================
            // BƠM DỮ LIỆU VÀO CÁC CỘT TRỐNG
            // (Cột 9: Học phí, Cột 10: Chỉ tiêu, Cột 13: Việc làm, Cột 14: Lương)
            // ==========================================
            
            // Chỉ điền nếu ô đó đang trống (null) để không đè lên dữ liệu bạn đã nhập thật
            if (!row.getCell(9).value) row.getCell(9).value = hocPhiFinal;
            if (!row.getCell(10).value) row.getCell(10).value = baseChiTieu;
            if (!row.getCell(13).value) row.getCell(13).value = parseFloat(baseViecLam);
            if (!row.getCell(14).value) row.getCell(14).value = luongFinal;
            
            row.commit();
            filledCount++;
        }

        // Lưu ra file mới để tránh hỏng file gốc
        await workbook.xlsx.writeFile('DiemChuan_MockData.xlsx');
        console.log(`\n🎉 THÀNH CÔNG! Đã bơm dữ liệu giả siêu logic cho ${filledCount} dòng.`);
        console.log(`📁 Bạn hãy mở file "DiemChuan_MockData.xlsx" lên để xem thành quả nhé!`);
        
    } catch (err) {
        console.error("❌ Lỗi: Nhớ để file DiemChuan_Tho.xlsx chung thư mục với code nhé!", err.message);
    }
}

autoFillMockData();