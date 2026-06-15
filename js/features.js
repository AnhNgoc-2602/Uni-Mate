/* ============================================================
   UniMate - features.js
   Gợi ý trường, So sánh trường, Hồ sơ cá nhân
   ============================================================ */

/* ---------- GỢI Ý TRƯỜNG ---------- */

function renderSuggest() {
  const toan = parseFloat(document.getElementById('s-toan')?.value) || 0;
  const ly   = parseFloat(document.getElementById('s-ly')?.value)   || 0;
  const anh  = parseFloat(document.getElementById('s-anh')?.value)  || 0;

  const hasScores = toan > 0 || ly > 0 || anh > 0;

  document.getElementById('suggest-no-score').style.display  = hasScores ? 'none' : '';
  document.getElementById('suggest-results').style.display   = hasScores ? ''     : 'none';

  if (!hasScores) return;

  // Tính điểm trung bình tổ hợp A00 (Toán + Lý + Anh) thang 30
  const avg = ((toan + ly + anh) * 10 / 3).toFixed(1);
  document.getElementById('avg-score').textContent = avg;

  // Lọc trường có ngành đạt được với điểm hiện tại (± 2 điểm)
  const suitable = schools
    .filter(s => s.majors.some(m => m.score <= parseFloat(avg) + 2))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 6);

  document.getElementById('suggest-list').innerHTML = suitable.length
    ? suitable.map((s, i) => schoolCardHTML(s, i)).join('')
    : '<p style="padding:20px; color:var(--text-secondary);">Không có trường phù hợp. Hãy cố gắng hơn!</p>';
}

/* ---------- SO SÁNH TRƯỜNG ---------- */

function renderCompare() {
  const chipsEl = document.getElementById('compare-chips');

  // Render chip từng trường đã thêm
  const chipHTML = compareSchools.map(s => `
    <div class="chip">
      <span style="background:${schoolColor(schools.indexOf(s))}; color:white;
                   padding:2px 8px; border-radius:6px; font-size:0.75rem;">${s.code}</span>
      ${s.name}
      <button class="chip-remove" onclick="removeFromCompare(${s.id})">✕</button>
    </div>`).join('');

  chipsEl.innerHTML = chipHTML +
    `<button class="btn-add-school" onclick="openAddCompare()">+ Thêm trường</button>`;

  const emptyEl    = document.getElementById('compare-empty');
  const tableWrap  = document.getElementById('compare-table-wrap');

  if (compareSchools.length < 2) {
    emptyEl.style.display   = '';
    tableWrap.style.display = 'none';
    return;
  }

  emptyEl.style.display   = 'none';
  tableWrap.style.display = '';

  // Header cột
  const colsHTML = compareSchools.map(s => `
    <th class="school-col">
      <div class="school-avatar"
           style="background:${schoolColor(schools.indexOf(s))}">${s.code}</div>
      <div style="font-weight:700; font-size:0.9rem;">${s.name}</div>
      <div style="font-size:0.78rem; color:var(--text-secondary);">${s.code}</div>
    </th>`).join('');

  // Các hàng so sánh
  const rows = [
    ['Loại trường',           s => `<b>${s.type}</b>`],
    ['Khu vực',               s => `📍 ${s.region}`],
    ['Thành phố',             s => s.city],
    ['Xếp hạng',              s => `<span style="color:var(--primary);font-weight:700">🏆 #${s.rank}</span>`],
    ['Học phí (triệu/năm)',   s => `📋 ${s.feeMin} – ${s.feeMax}`],
    ['Số ngành',              s => `📖 ${s.majors.length} ngành`],
    ['Điểm chuẩn thấp nhất', s => `<b>${s.majors.length ? Math.min(...s.majors.map(m => m.score)) : '—'}</b>`],
    ['Điểm chuẩn cao nhất',  s => `<b>${s.majors.length ? Math.max(...s.majors.map(m => m.score)) : '—'}</b>`],
  ];

  const rowsHTML = rows.map(([label, fn]) => `
    <tr>
      <td style="color:var(--text-secondary); font-size:0.85rem;">${label}</td>
      ${compareSchools.map(s => `<td style="text-align:center; font-size:0.875rem;">${fn(s)}</td>`).join('')}
    </tr>`).join('');

  document.getElementById('compare-table').innerHTML = `
    <thead><tr><th>Tiêu chí</th>${colsHTML}</tr></thead>
    <tbody>${rowsHTML}</tbody>`;
}

function openAddCompare() {
  document.getElementById('compare-search').value = '';
  renderCompareSearch();
  document.getElementById('modal-compare').classList.add('open');
}

function renderCompareSearch() {
  const q          = document.getElementById('compare-search').value.toLowerCase();
  const compareIds = new Set(compareSchools.map(s => s.id));

  const list = schools.filter(s =>
    !compareIds.has(s.id) &&
    (s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q))
  );

  document.getElementById('compare-search-list').innerHTML = list.map(s => `
    <div class="school-search-item">
      <div>
        <div class="name">${s.name}</div>
        <div class="code">${s.code} • ${s.city}</div>
      </div>
      <button class="btn-add-to-compare" onclick="addToCompare(${s.id})">+ Thêm</button>
    </div>`).join('') ||
    '<p style="padding:16px; color:var(--text-secondary); text-align:center;">Không tìm thấy trường.</p>';
}

function addToCompare(id) {
  if (compareSchools.length >= 5) {
    showToast('Tối đa 5 trường!', 'error');
    return;
  }
  const s = schools.find(x => x.id === id);
  compareSchools.push(s);
  renderCompare();
  closeModal('modal-compare');
  showToast(`Đã thêm ${s.name}`, 'success');
}

function removeFromCompare(id) {
  compareSchools = compareSchools.filter(s => s.id !== id);
  renderCompare();
}

/* ---------- HỒ SƠ CÁ NHÂN ---------- */

function toggleTag(el) {
  el.classList.toggle('selected');
}

function saveProfile() {
  showToast('Đã lưu thông tin thành công! ✓', 'success');
  renderSuggest(); // Cập nhật lại gợi ý nếu điểm thay đổi
}
