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
async function doLogin() {

  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;

  try {

    const response = await fetch(
      "http://localhost:5000/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          mat_khau: pass
        })
      }
    );

    if (!response.ok) {
      showToast("Email hoặc mật khẩu không đúng!", "error");
      return;
    }

    const user = await response.json();

    currentUser = {
      id: user.id_nd,
      name: user.ho_ten,
      email: user.email,
      role: user.vai_tro === "ADMIN"
        ? "admin"
        : "student"
    };

    initApp();

  } catch (error) {

    console.error(error);

    showToast(
      "Không kết nối được server",
      "error"
    );
  }
}

/**
 * Đăng ký tài khoản mới
 */
async function doRegister() {

  const ho_ten = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const mat_khau = document.getElementById("reg-pass").value;

  if (!ho_ten || !email || !mat_khau) {
    showToast("Vui lòng nhập đầy đủ thông tin", "error");
    return;
  }

  try {

    const response = await fetch(
      "http://localhost:5000/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ho_ten,
          email,
          mat_khau
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      showToast(result.message, "error");
      return;
    }

    showToast(
      "Đăng ký thành công!",
      "success"
    );

    showPage("page-login");

  } catch (error) {

    console.error(error);

    showToast(
      "Không kết nối được server",
      "error"
    );
  }
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
    // Render dữ liệu ban đầu
  renderAdminSchools();
renderAdminUsers();
renderSearchResults();

loadProfile();

navigate('home');
}
