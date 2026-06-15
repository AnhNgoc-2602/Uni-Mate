# UniMate - Hệ thống Gợi ý Đại học Thông minh

## Cấu trúc thư mục

```
UniMate/
│
├── index.html              ← File chính, mở file này để chạy
│
├── css/                    ← Toàn bộ file CSS
│   ├── style.css           ← CSS dùng chung (biến màu, navbar, card, form, modal...)
│   ├── auth.css            ← Trang đăng nhập / đăng ký
│   ├── home.css            ← Trang chủ (hero, feature cards)
│   ├── search.css          ← Trang tra cứu trường (search bar, school card grid)
│   ├── detail.css          ← Chi tiết trường + So sánh trường
│   ├── compare.css         ← (Placeholder, có thể mở rộng thêm)
│   └── admin.css           ← Trang quản lý trường và người dùng
│
└── js/                     ← Toàn bộ file JavaScript
    ├── data.js             ← Dữ liệu mẫu (danh sách trường, người dùng, biến toàn cục)
    ├── app.js              ← Điều hướng + tiện ích dùng chung (navigate, toast, modal, schoolCardHTML)
    ├── auth.js             ← Đăng nhập, đăng ký, đăng xuất, khởi tạo app
    ├── search.js           ← Tra cứu trường, chi tiết trường, lưu yêu thích
    ├── features.js         ← Gợi ý trường, so sánh trường, hồ sơ cá nhân
    └── admin.js            ← Quản lý trường đại học và người dùng (Admin)
```

## Cách chạy

### Cách 1 — Đơn giản
Mở file `index.html` bằng trình duyệt (Chrome/Edge/Firefox).

### Cách 2 — VS Code + Live Server (Khuyến nghị)
1. Mở VS Code → **File → Open Folder** → chọn thư mục `UniMate`
2. Cài extension **Live Server** (Ritwick Dey)
3. Click chuột phải vào `index.html` → **Open with Live Server**
4. Trình duyệt tự mở tại `http://127.0.0.1:5500`

## Tài khoản đăng nhập

| Vai trò       | Email                    | Mật khẩu |
|---------------|--------------------------|-----------|
| Quản trị viên | anhngocanh@gmail.com     | 123456    |
| Học sinh      | tvbinh@gmail.com         | 123456    |

> Đăng nhập Admin sẽ hiện thêm menu **Quản lý trường** và **Quản lý người dùng**.

## Thứ tự load JS (quan trọng)

Các file JS phải được load theo đúng thứ tự trong `index.html`:
1. `data.js`     — khai báo biến toàn cục trước
2. `app.js`      — tiện ích dùng chung
3. `auth.js`     — xác thực người dùng
4. `search.js`   — tính năng tìm kiếm
5. `features.js` — gợi ý, so sánh, hồ sơ
6. `admin.js`    — quản trị (load cuối vì phụ thuộc các file trên)
