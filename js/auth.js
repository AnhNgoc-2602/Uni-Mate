/* ============================================================
   UniMate - auth.js
   Xử lý đăng nhập, đăng ký, đăng xuất
   ============================================================ */

/**
 * Hiển thị trang auth (login / register)
 */
function showPage(id) {
  document.querySelectorAll('[id^="page-"]').forEach(el => {
    el.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
}

/**
 * Đăng nhập
 */
function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  const user  = users.find(u => u.email === email && u.password === pass);

  if (!user) {
    showToast('Email hoặc mật khẩu không đúng!', 'error');
    return;
  }

  currentUser = user;
  initApp();
}

/**
 * Đăng ký tài khoản mới
 */
function doRegister() {
  showToast('Đăng ký thành công! Vui lòng đăng nhập.', 'success');
  showPage('page-login');
}

/**
 * Đăng xuất
 */
function doLogout() {
  currentUser = null;
  document.getElementById('app').style.display = 'none';
  showPage('page-login');
}

/**
 * Khởi tạo ứng dụng sau khi đăng nhập thành công
 */
function initApp() {
  // Ẩn trang auth, hiện app
  document.getElementById('page-login').style.display    = 'none';
  document.getElementById('page-register').style.display = 'none';
  document.getElementById('app').style.display           = 'block';

  // Cập nhật thông tin user trên navbar
  document.getElementById('nav-username').textContent = currentUser.name;
  document.getElementById('nav-avatar').textContent   = currentUser.name[0].toUpperCase();

  // Hiện / ẩn menu admin
  document.querySelectorAll('.admin-only').forEach(el => {
    el.style.display = currentUser.role === 'admin' ? 'flex' : 'none';
  });

  // Load thông tin cá nhân vào form hồ sơ
  document.getElementById('p-name').value  = currentUser.name;
  document.getElementById('p-email').value = currentUser.email;
  document.getElementById('p-school').value = currentUser.school || '';

  // Render dữ liệu ban đầu
  renderAdminSchools();
  renderAdminUsers();
  renderSearchResults();
  navigate('home');
}
