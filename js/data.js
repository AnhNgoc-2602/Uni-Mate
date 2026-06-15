/* ============================================================
   UniMate - data.js
   Dữ liệu mẫu: danh sách trường và người dùng
   ============================================================ */

const SCHOOLS = [
  {
    id: 1, code: 'VNU', name: 'Đại học Quốc gia Hà Nội',
    type: 'Công lập', city: 'Hà Nội', region: 'Miền Bắc',
    rank: 1, feeMin: 12, feeMax: 28,
    desc: 'Trường đại học hàng đầu Việt Nam với bề dày lịch sử hơn 100 năm, đào tạo đa ngành đa lĩnh vực.',
    img: '', web: 'https://vnu.edu.vn',
    majors: [
      { name: 'Công nghệ thông tin', code: 'CNT01', combo: 'A00', score: 27.5 },
      { name: 'Kinh tế',             code: 'KTE01', combo: 'A00', score: 26.0 },
      { name: 'Luật',                code: 'LUT01', combo: 'C00', score: 25.5 },
      { name: 'Ngôn ngữ Anh',        code: 'NNA01', combo: 'D01', score: 28.0 },
    ]
  },
  {
    id: 2, code: 'HUST', name: 'Đại học Bách Khoa Hà Nội',
    type: 'Công lập', city: 'Hà Nội', region: 'Miền Bắc',
    rank: 2, feeMin: 14, feeMax: 30,
    desc: 'Trường kỹ thuật hàng đầu, đào tạo kỹ sư và nhà khoa học chất lượng cao.',
    img: '', web: 'https://hust.edu.vn',
    majors: [
      { name: 'Kỹ thuật phần mềm', code: 'KTP01', combo: 'A00', score: 28.5 },
      { name: 'Kỹ thuật điện tử',  code: 'KTD01', combo: 'A00', score: 27.0 },
      { name: 'Cơ khí',            code: 'CKH01', combo: 'A00', score: 25.5 },
      { name: 'Hóa công nghệ',     code: 'HCN01', combo: 'A00', score: 24.0 },
    ]
  },
  {
    id: 3, code: 'NEU', name: 'Đại học Kinh tế Quốc dân',
    type: 'Công lập', city: 'Hà Nội', region: 'Miền Bắc',
    rank: 3, feeMin: 13, feeMax: 25,
    desc: 'Trường đào tạo kinh tế và quản trị hàng đầu Việt Nam.',
    img: '', web: 'https://neu.edu.vn',
    majors: [
      { name: 'Quản trị kinh doanh', code: 'QTK01', combo: 'A00', score: 26.0 },
      { name: 'Tài chính ngân hàng', code: 'TCN01', combo: 'A00', score: 25.5 },
      { name: 'Kế toán',             code: 'KTO01', combo: 'A01', score: 25.0 },
      { name: 'Marketing',           code: 'MKT01', combo: 'D01', score: 25.5 },
    ]
  },
  {
    id: 4, code: 'VNU-HCM', name: 'Đại học Quốc gia TP. Hồ Chí Minh',
    type: 'Công lập', city: 'TP. Hồ Chí Minh', region: 'Miền Nam',
    rank: 4, feeMin: 15, feeMax: 32,
    desc: 'Hệ thống đại học lớn nhất miền Nam, đào tạo đa dạng các ngành học chất lượng cao.',
    img: '', web: 'https://vnuhcm.edu.vn',
    majors: [
      { name: 'Công nghệ thông tin', code: 'CNT02', combo: 'A00', score: 26.5 },
      { name: 'Kinh tế',             code: 'KTE02', combo: 'A00', score: 25.5 },
      { name: 'Khoa học tự nhiên',   code: 'KHT01', combo: 'A00', score: 24.0 },
    ]
  },
  {
    id: 5, code: 'HCMUT', name: 'Đại học Bách Khoa TP. Hồ Chí Minh',
    type: 'Công lập', city: 'TP. Hồ Chí Minh', region: 'Miền Nam',
    rank: 5, feeMin: 14, feeMax: 28,
    desc: 'Trường kỹ thuật hàng đầu miền Nam với nhiều chương trình đào tạo chất lượng cao.',
    img: '', web: 'https://hcmut.edu.vn',
    majors: [
      { name: 'Kỹ thuật phần mềm', code: 'KTP02', combo: 'A00', score: 27.0 },
      { name: 'Kỹ thuật điện',     code: 'KTD02', combo: 'A00', score: 26.0 },
      { name: 'Xây dựng',          code: 'XAY01', combo: 'A00', score: 24.5 },
      { name: 'Hóa công nghệ',     code: 'HCN02', combo: 'A00', score: 23.5 },
    ]
  },
  {
    id: 6, code: 'FTU', name: 'Đại học Ngoại thương',
    type: 'Công lập', city: 'Hà Nội', region: 'Miền Bắc',
    rank: 6, feeMin: 12, feeMax: 22,
    desc: 'Trường đào tạo kinh tế đối ngoại và ngoại ngữ hàng đầu cả nước.',
    img: '', web: 'https://ftu.edu.vn',
    majors: [
      { name: 'Kinh tế quốc tế',      code: 'KTQ01', combo: 'A00', score: 27.0 },
      { name: 'Tiếng Anh thương mại', code: 'TAT01', combo: 'D01', score: 26.5 },
      { name: 'Quản trị kinh doanh',  code: 'QTK02', combo: 'A01', score: 26.0 },
    ]
  },
  {
    id: 7, code: 'HMU', name: 'Đại học Y Hà Nội',
    type: 'Công lập', city: 'Hà Nội', region: 'Miền Bắc',
    rank: 7, feeMin: 13, feeMax: 20,
    desc: 'Trường y khoa lớn nhất và lâu đời nhất Việt Nam.',
    img: '', web: 'https://hmu.edu.vn',
    majors: [
      { name: 'Y đa khoa',     code: 'YDK01', combo: 'B00', score: 28.5 },
      { name: 'Dược học',      code: 'DUO01', combo: 'B00', score: 27.5 },
      { name: 'Răng hàm mặt', code: 'RHM01', combo: 'B00', score: 27.0 },
    ]
  },
  {
    id: 8, code: 'UD', name: 'Đại học Đà Nẵng',
    type: 'Công lập', city: 'Đà Nẵng', region: 'Miền Trung',
    rank: 8, feeMin: 11, feeMax: 20,
    desc: 'Trung tâm đào tạo lớn của khu vực miền Trung với nhiều chuyên ngành đa dạng.',
    img: '', web: 'https://ud.edu.vn',
    majors: [
      { name: 'Công nghệ thông tin', code: 'CNT03', combo: 'A00', score: 24.0 },
      { name: 'Kinh tế',             code: 'KTE03', combo: 'A01', score: 23.5 },
      { name: 'Kiến trúc',           code: 'KIE01', combo: 'V00', score: 22.5 },
      { name: 'Y dược',              code: 'YDU01', combo: 'B00', score: 24.5 },
    ]
  },
  {
    id: 9, code: 'HU', name: 'Đại học Huế',
    type: 'Công lập', city: 'Huế', region: 'Miền Trung',
    rank: 10, feeMin: 10, feeMax: 18,
    desc: 'Trường đại học trọng điểm khu vực miền Trung với lịch sử lâu đời, đào tạo đa lĩnh vực.',
    img: '', web: 'https://hueuni.edu.vn',
    majors: [
      { name: 'Y đa khoa',    code: 'YDK02', combo: 'B00', score: 26.5 },
      { name: 'Luật',         code: 'LUT02', combo: 'C00', score: 22.0 },
      { name: 'Sư phạm Văn', code: 'SPV01', combo: 'C00', score: 21.5 },
      { name: 'Kinh tế',      code: 'KTE04', combo: 'A00', score: 20.8 },
    ]
  },
  {
    id: 10, code: 'CTU', name: 'Đại học Cần Thơ',
    type: 'Công lập', city: 'Cần Thơ', region: 'Miền Nam',
    rank: 9, feeMin: 9, feeMax: 18,
    desc: 'Trường đại học trọng điểm vùng đồng bằng sông Cửu Long.',
    img: '', web: 'https://ctu.edu.vn',
    majors: [
      { name: 'Nông nghiệp',            code: 'NON01', combo: 'B00', score: 20.5 },
      { name: 'Nuôi trồng thủy sản',    code: 'NTS01', combo: 'B00', score: 19.5 },
      { name: 'Công nghệ thực phẩm',    code: 'CNT04', combo: 'A00', score: 21.0 },
      { name: 'Kinh tế',                code: 'KTE05', combo: 'A01', score: 20.0 },
    ]
  },
];

let users = [
  { id: 1, name: '34.Nguyễn Thị Anh Ngọc-11A1', email: 'anhngocanh@gmail.com', role: 'admin',   school: '',                joined: '18/3/2026', password: '123456' },
  { id: 2, name: 'Trần Văn Bình',                email: 'tvbinh@gmail.com',      role: 'student', school: 'THPT Chu Văn An', joined: '20/3/2026', password: '123456' },
];

// Trạng thái toàn ứng dụng
let schools         = JSON.parse(JSON.stringify(SCHOOLS)); // bản sao có thể chỉnh sửa
let currentUser     = null;
let savedSchools    = new Set();
let compareSchools  = [];
let editingSchoolId = null;
let tempMajors      = [];
let currentDetailId = null;

// Màu sắc đại diện cho từng trường
const COLORS = [
  '#3B5BDB','#7950F2','#F03E3E','#E67700',
  '#2F9E44','#1098AD','#C92A2A','#5C7CFA',
  '#862E9C','#D6336C'
];
function schoolColor(i) { return COLORS[i % COLORS.length]; }
