/* ============================================================
   UniMate - search.js
   Tra cứu trường, xem chi tiết trường, lưu yêu thích
   ============================================================ */

/* ---------- TRA CỨU TRƯỜNG ---------- */

function renderSearchResults() {
  const query  = (document.getElementById('search-input')?.value || '').toLowerCase();
  const region = document.getElementById('filter-region')?.value || '';
  const type   = document.getElementById('filter-type')?.value   || '';

  const results = schools.filter(s => {
    const matchQ = !query  || s.name.toLowerCase().includes(query) || s.code.toLowerCase().includes(query);
    const matchR = !region || s.region === region;
    const matchT = !type   || s.type   === type;
    return matchQ && matchR && matchT;
  });

  const el = document.getElementById('search-results');
  if (!el) return;

  el.innerHTML = results.length
    ? results.map((s, i) => schoolCardHTML(s, i)).join('')
    : '<p style="color:var(--text-secondary); padding:20px;">Không tìm thấy trường nào.</p>';
}

function filterSchools() { renderSearchResults(); }

function clearFilters() {
  document.getElementById('search-input').value  = '';
  document.getElementById('filter-region').value = '';
  document.getElementById('filter-type').value   = '';
  renderSearchResults();
}

/* ---------- CHI TIẾT TRƯỜNG ---------- */

async function openDetail(id) {
  currentDetailId = id;
  const s       = schools.find(x => x.id === id);
  const idx     = schools.indexOf(s);
  const isSaved = savedSchools.has(id);
  const response = await fetch(
    `http://localhost:5000/api/truong/${id}/nganh`
);

const majors = await response.json();
const hocPhis = majors.map(m => m.hoc_phi);

const feeMin =
    hocPhis.length > 0
        ? Math.min(...hocPhis)
        : 0;

const feeMax =
    hocPhis.length > 0
        ? Math.max(...hocPhis)
        : 0;

console.log("MAJORS =", majors);

  const majorsHTML = majors.map(m => `
    <tr>
      <td>${m.ten_nganh}</td>
      <td><span class="code-badge">${m.ma_nganh}</span></td>
      <td><span class="code-badge">${m.to_hop}</span></td>
      <td class="score-val">${m.diem_chuan}</td>
    </tr>
`).join('');

  document.getElementById('detail-content').innerHTML = `
    <div style="margin-bottom:16px;">
      <button class="btn-outline" style="padding:8px 16px; font-size:0.82rem;"
              onclick="navigate('search')">← Quay lại</button>
    </div>

    <!-- Hero banner trường -->
    <div class="detail-hero"
         style="background: linear-gradient(135deg, ${schoolColor(idx)} 30%, ${schoolColor(idx + 2)});">
      <div class="detail-hero-content">
        <h1>${s.name}</h1>
        <div class="detail-hero-badges">
          <span class="detail-badge">${s.type}</span>
          <span class="detail-badge">📍 ${s.city} • ${s.region}</span>
          <span class="detail-badge">☆ Xếp hạng #${s.rank}</span>
        </div>
      </div>
    </div>

    <!-- Nút hành động -->
    <div class="detail-actions">
      <button class="btn-heart ${isSaved ? 'saved' : ''}" id="detail-save-btn"
              onclick="toggleSave(${s.id})">
        ${isSaved ? '♥ Đã lưu' : '♡ Thêm yêu thích'}
      </button>
      <button class="btn-web" onclick="window.open('${s.web}','_blank')">
        🌐 Website trường
      </button>
    </div>

    <!-- Thông tin cơ bản -->
    <div class="info-grid">
      <div class="info-card">
        <div class="info-icon purple">🎓</div>
        <div>
          <div class="info-label">Mã trường</div>
          <div class="info-value">${s.code}</div>
        </div>
      </div>
      <div class="info-card">
        <div class="info-icon yellow">💰</div>
        <div>
          <div class="info-label">Học phí</div>
          <div class="info-value">
    ${(feeMin / 1000000).toFixed(0)}
    -
    ${(feeMax / 1000000).toFixed(0)}
    triệu/năm
</div>
        </div>
      </div>
    </div>

    <!-- Giới thiệu -->
    <div class="card">
      <div class="card-title">Giới thiệu</div>
      <p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.7;">${s.desc}</p>
    </div>

    <!-- Ngành đào tạo -->
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div class="card-title" style="margin-bottom:0;">📖 Ngành đào tạo (${majors.length} ngành)</div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Ngành</th><th>Mã ngành</th><th>Tổ hợp</th><th>Điểm chuẩn</th>
            </tr>
          </thead>
          <tbody>${majorsHTML}</tbody>
        </table>
      </div>
    </div>`;

  navigate('detail');
}

/* ---------- LƯU YÊU THÍCH ---------- */

function toggleSave(id) {
  if (savedSchools.has(id)) {
    savedSchools.delete(id);
    showToast('Đã bỏ lưu trường.', '');
  } else {
    savedSchools.add(id);
    showToast('Đã lưu trường yêu thích! ♥', 'success');
  }

  // Cập nhật nút trong trang chi tiết nếu đang mở
  const btn = document.getElementById('detail-save-btn');
  if (btn) {
    const saved = savedSchools.has(id);
    btn.className = 'btn-heart' + (saved ? ' saved' : '');
    btn.innerHTML = saved ? '♥ Đã lưu' : '♡ Thêm yêu thích';
  }

  renderSaved();
}

/* ---------- TRƯỜNG YÊU THÍCH ---------- */

function renderSaved() {
  const list    = schools.filter(s => savedSchools.has(s.id));
  const emptyEl = document.getElementById('saved-empty');
  const listEl  = document.getElementById('saved-list');

  document.getElementById('saved-count').textContent =
    `Danh sách trường đại học bạn đã lưu (${list.length} trường)`;

  if (list.length === 0) {
    emptyEl.style.display = '';
    listEl.style.display  = 'none';
  } else {
    emptyEl.style.display = 'none';
    listEl.style.display  = 'grid';
    listEl.innerHTML = list.map((s, i) => schoolCardHTML(s, i)).join('');
  }
}
