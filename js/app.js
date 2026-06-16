/* ============================================================
   UniMate - app.js
   Điều hướng giữa các trang + tiện ích dùng chung (toast, modal)
   ============================================================ */

/* ---------- ĐIỀU HƯỚNG ---------- */

function navigate(page) {

  // Ẩn tất cả page
  document.querySelectorAll('.page').forEach(el => {
    el.classList.remove('active');
    el.style.display = 'none';
  });

  // Bỏ active trên menu
  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.remove('active');
  });

  // Hiện page được chọn
  const pageEl = document.getElementById('page-' + page);

  if (pageEl) {
    pageEl.classList.add('active');
    pageEl.style.display = 'block';
  }

  // Active menu tương ứng
  const navEl = document.getElementById('nav-' + page);

  if (navEl) {
    navEl.classList.add('active');
  }

  // Render dữ liệu theo từng trang
  if (page === 'suggest') {
    renderSuggest();
  }

  if (page === 'search') {
    renderSearchResults();
  }

  if (page === 'saved') {
    renderSaved();
  }

  if (page === 'compare') {
    renderCompare();
  }

  if (page === 'admin-schools') {
    renderAdminSchools();
  }

  if (page === 'admin-users') {
    renderAdminUsers();
  }
}

/* ---------- TOAST NOTIFICATION ---------- */

let toastTimer;

function showToast(msg, type = '') {
  const el = document.getElementById('toast');

  if (!el) return;

  el.textContent = msg;
  el.className = 'toast show' + (type ? ' ' + type : '');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 2500);
}

/* ---------- MODAL ---------- */

function closeModal(id) {
  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.remove('open');
  }
}

// Click ra ngoài modal để đóng
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(el => {
    el.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('open');
      }
    });
  });
});

/* ---------- TIỆN ÍCH ---------- */

/**
 * Tạo HTML card trường
 */
function schoolCardHTML(s, idx) {
  return `
    <div class="school-card" onclick="openDetail(${s.id})">
      <div class="school-img"
           style="background: linear-gradient(135deg, ${schoolColor(idx)}, ${schoolColor(idx + 3)});">
        <span style="font-size:2.5rem; opacity:0.4">🎓</span>
      </div>

      <div class="school-body">
        <div class="school-name-row">
          <div class="school-name">${s.name}</div>
          <div class="school-rank">☆ #${s.rank}</div>
        </div>

        <div class="school-location">
          📍 ${s.city} • ${s.region}
        </div>

        <div class="school-tags">
          <span class="badge">${s.type}</span>
          <span class="badge blue">
            💰 ${s.feeMin}-${s.feeMax} tr/năm
          </span>
          <span class="badge">
            📖 ${s.majors.length} ngành
          </span>
        </div>
      </div>
    </div>
  `;
}