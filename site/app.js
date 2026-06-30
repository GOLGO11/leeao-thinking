const payload = window.THINKING_INDEX || {};
const records = payload.records || [];
const taxonomy = payload.taxonomy || [];
const books = payload.books || [];

const state = {
  category: '全部',
  query: '',
};

const categoryList = document.querySelector('#categoryList');
const recordList = document.querySelector('#recordList');
const searchInput = document.querySelector('#searchInput');
const resultTitle = document.querySelector('#resultTitle');
const clearButton = document.querySelector('#clearButton');
const stats = document.querySelector('#stats');

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeRegExp(value) {
  const specials = '\\^$.*+?()[]{}|';
  return [...value].map((char) => specials.includes(char) ? '\\' + char : char).join('');
}

function highlight(value) {
  const text = escapeHtml(value);
  const query = state.query.trim();
  if (!query) return text;
  return text.replace(new RegExp(escapeRegExp(query), 'gi'), (match) => '<mark>' + match + '</mark>');
}

function categoryCounts() {
  return taxonomy.map((category) => ({
    category,
    count: records.filter((record) => record.category === category).length,
  }));
}

function filteredRecords() {
  const query = state.query.trim().toLowerCase();
  return records.filter((record) => {
    const categoryMatch = state.category === '全部' || record.category === state.category;
    if (!categoryMatch) return false;
    if (!query) return true;
    const haystack = [
      record.id,
      record.book,
      record.round,
      record.status,
      record.category,
      record.title,
      record.description,
      record.source_file,
      record.source_path,
      record.keywords,
    ].join(' ').toLowerCase();
    return haystack.includes(query);
  });
}

function renderStats(filtered) {
  stats.innerHTML = [
    '<div class="stat"><strong>' + filtered.length + '</strong><span>当前条目</span></div>',
    '<div class="stat"><strong>' + books.length + '</strong><span>书目</span></div>',
    '<div class="stat"><strong>' + taxonomy.length + '</strong><span>分类</span></div>',
  ].join('');
}

function renderCategories() {
  const counts = categoryCounts();
  const totalButton = '<button class="filter-button ' + (state.category === '全部' ? 'active' : '') + '" data-category="全部" type="button"><span class="button-text">全部</span><span class="button-count">' + records.length + '</span></button>';
  const categoryButtons = counts.map(({ category, count }) => {
    const active = state.category === category ? ' active' : '';
    return '<button class="filter-button' + active + '" data-category="' + escapeHtml(category) + '" type="button"><span class="button-text">' + escapeHtml(category) + '</span><span class="button-count">' + count + '</span></button>';
  }).join('');
  categoryList.innerHTML = totalButton + categoryButtons;
}

function renderTitle() {
  const parts = [];
  if (state.category !== '全部') parts.push(state.category);
  resultTitle.textContent = parts.length ? parts.join(' / ') : '全部条目';
}

function renderRecords() {
  const filtered = filteredRecords();
  renderStats(filtered);
  renderTitle();

  if (!filtered.length) {
    recordList.innerHTML = '<div class="empty">没有匹配的条目。</div>';
    return;
  }

  recordList.innerHTML = filtered.map((record) => {
    return '<article class="record">'
      + '<div class="record-header"><h3>' + highlight(record.title) + '</h3><span class="record-id">' + escapeHtml(record.id) + '</span></div>'
      + '<div class="record-meta">'
      + '<span class="pill">' + escapeHtml(record.book) + '</span>'
      + '<span class="pill">' + escapeHtml(record.round) + ' / ' + escapeHtml(record.status) + '</span>'
      + '<span class="pill">' + escapeHtml(record.category) + '</span>'
      + '<span class="pill">' + escapeHtml(record.source_file) + ' / P' + escapeHtml(record.source_paragraph) + '</span>'
      + '<span class="pill">' + escapeHtml(record.keywords) + '</span>'
      + '</div>'
      + '<p class="quote">' + highlight(record.description) + '</p>'
      + '</article>';
  }).join('');
}

function render() {
  renderCategories();
  renderRecords();
}

categoryList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-category]');
  if (!button) return;
  state.category = button.dataset.category;
  render();
});

searchInput.addEventListener('input', (event) => {
  state.query = event.target.value;
  renderRecords();
});

clearButton.addEventListener('click', () => {
  state.category = '全部';
  state.query = '';
  searchInput.value = '';
  render();
});

render();
