// =========================================================================
// 1. CẤU HÌNH DANH SÁCH MỤC TIÊU KÈM "BẢN ĐỒ CỘT" (MAPPING)
// =========================================================================
const danhSachCrawl = [
    {
        university_id: 1, // PTIT
        year: 2023,
        url: 'https://tuyensinh.ptit.edu.vn/gioi-thieu/xem-diem-cac-nam-truoc/diem-trung-tuyen-2023/', // Link của PTIT
        
        // Khai báo bản đồ cột dựa theo hình chụp của PTIT:
        mapping: {
            maNganh: 3,  // Mã ngành ở cột 3
            tenNganh: 2, // Tên ngành ở cột 2
            diemChuan: 4 // Điểm ở cột 4
        }
    },
    {
        university_id: 1, // UET
        year: 2024,
        url: 'https://tuyensinh.ptit.edu.vn/gioi-thieu/xem-diem-cac-nam-truoc/diem-trung-tuyen-2024/', // Link của UET
        
        // Khai báo bản đồ cột dựa theo hình chụp của UET:
        mapping: {
            maNganh: 2,  // Mã xét tuyển ở cột 2
            tenNganh: 3, // Ngành đào tạo ở cột 3
            diemChuan: 4 // Điểm trúng tuyển ở cột 4
        }
    }
];

// ... (Đoạn mã kết nối DB giữ nguyên) ...

// =========================================================================
// 2. BÓC TÁCH DỮ LIỆU ĐỘNG (DYNAMIC PARSING)
// =========================================================================
// Bên trong vòng lặp for (let i = 0; i < danhSachNganh.length; i++) {
const row = danhSachNganh[i];

// Lấy bản đồ cột của trường hiện tại đang cào
const map = target.mapping;

// Truyền linh hoạt số thứ tự cột vào nth-child
const major_code = $(row).find(`td:nth-child(${map.maNganh})`).text().trim();
const major_name = $(row).find(`td:nth-child(${map.tenNganh})`).text().trim();
const admission_score_raw = $(row).find(`td:nth-child(${map.diemChuan})`).text().trim();

// Tạm thời tổ hợp môn web không có hoặc chưa rõ, ta có thể set cứng hoặc thêm vào mapping sau
const subject_groups = "A00, A01"; 

// BẬT CHẾ ĐỘ SOI X-QUANG ĐỂ KIỂM TRA TRƯỚC KHI LƯU
console.log(`[Trường ${target.university_id}] Mã: ${major_code} | Tên: ${major_name} | Điểm: ${admission_score_raw}`);

// ... (Phần Data Validation và Insert DB giữ nguyên) ...