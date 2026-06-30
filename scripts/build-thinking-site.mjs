import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const sourcePath = path.join(rootDir, 'outputs', '思想索引总表.json');
const siteDir = path.join(rootDir, 'site');

function ensureDirs() {
  fs.mkdirSync(siteDir, { recursive: true });
}

function writeData(payload) {
  const dataJs = [
    'window.THINKING_INDEX = ',
    JSON.stringify(payload, null, 2),
    ';',
    '',
  ].join('');
  fs.writeFileSync(path.join(siteDir, 'data.js'), dataJs, 'utf8');
}

function writeHomeHtml() {
  const html = `<!doctype html>
<html lang="zh-Hans">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>李敖思想与智慧</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="home-page">
  <main class="home-shell" aria-labelledby="homeTitle">
    <p class="kicker">大李敖全集 6.0</p>
    <h1 id="homeTitle">李敖思想与智慧</h1>
    <p class="home-subtitle">从原文出发，把思想、人生经验和可检索的段落整理成入口清楚的资料库。</p>

    <nav class="home-actions" aria-label="站点入口">
      <a class="entry-card primary" href="thinking.html">
        <span class="entry-kicker">当前项目</span>
        <strong>李敖思想索引</strong>
        <span>进入思想分类、检索和原文索引。</span>
      </a>
      <a class="entry-card" href="https://lifewisdom.leeaoweb.com">
        <span class="entry-kicker">外部站点</span>
        <strong>李敖人生智慧</strong>
        <span>打开人生智慧专题站。</span>
      </a>
    </nav>
  </main>
</body>
</html>
`;
  fs.writeFileSync(path.join(siteDir, 'index.html'), html, 'utf8');
}

function writeThinkingHtml() {
  const html = `<!doctype html>
<html lang="zh-Hans">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>李敖思想索引</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="page-shell">
    <header class="topbar">
      <div class="title-block">
        <p class="kicker">大李敖全集 6.0 / 思想索引</p>
        <h1>李敖思想索引</h1>
        <p class="subtitle">按书目与主题保存原文思想段落。标题用于检索，正文保留原文。</p>
      </div>
      <a class="home-link" href="index.html">首页</a>
    </header>

    <main class="workspace">
      <aside class="sidebar" aria-label="筛选">
        <section class="control-panel">
          <label class="search-label" for="searchInput">搜索</label>
          <input id="searchInput" class="search-input" type="search" placeholder="标题、分类、关键词、原文">
          <div class="stats" id="stats"></div>
        </section>

        <section class="filter-panel" aria-label="思想分类">
          <h2>思想分类</h2>
          <nav class="button-list" id="categoryList"></nav>
        </section>
      </aside>

      <section class="content-area">
        <div class="content-head">
          <div>
            <p class="eyebrow">当前结果</p>
            <h2 id="resultTitle">全部条目</h2>
          </div>
          <button class="small-button" id="clearButton" type="button">清除</button>
        </div>
        <div class="record-list" id="recordList"></div>
      </section>
    </main>
  </div>

  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(siteDir, 'thinking.html'), html, 'utf8');
}

function writeCss() {
  const css = `:root {
  color-scheme: light;
  --page: #f2f4f0;
  --surface: #ffffff;
  --surface-soft: #f8f9f6;
  --ink: #1f2723;
  --muted: #66706a;
  --line: #d7ded6;
  --accent: #8e2f3c;
  --accent-2: #226b61;
  --accent-3: #a5792e;
  --shadow: 0 12px 30px rgba(32, 39, 35, 0.08);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background: var(--page);
  color: var(--ink);
  font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", system-ui, sans-serif;
  line-height: 1.65;
}

a,
button,
input {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

.home-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 28px;
}

.home-shell {
  width: min(920px, 100%);
  text-align: center;
}

.home-shell h1 {
  margin: 0;
  font-size: clamp(42px, 8vw, 76px);
  line-height: 1.05;
  font-weight: 800;
}

.home-subtitle {
  max-width: 680px;
  margin: 18px auto 0;
  color: var(--muted);
  font-size: 18px;
}

.home-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 44px;
  text-align: left;
}

.entry-card {
  display: grid;
  gap: 8px;
  min-height: 168px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.entry-card:hover,
.entry-card:focus-visible {
  border-color: rgba(34, 107, 97, 0.38);
  outline: none;
  transform: translateY(-1px);
}

.entry-card.primary {
  border-color: rgba(142, 47, 60, 0.35);
}

.entry-card strong {
  display: block;
  font-size: 28px;
  line-height: 1.2;
}

.entry-card span:last-child {
  color: var(--muted);
}

.entry-kicker {
  color: var(--accent-2);
  font-size: 13px;
  font-weight: 700;
}

.page-shell {
  width: min(1440px, 100%);
  margin: 0 auto;
}

.topbar {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: end;
  padding: 38px 44px;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
}

.home-link {
  flex: 0 0 auto;
  min-height: 36px;
  padding: 7px 12px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: #fff;
}

.home-link:hover {
  border-color: var(--accent-2);
  color: var(--accent-2);
}

.kicker,
.eyebrow {
  margin: 0 0 6px;
  color: var(--accent-2);
  font-size: 13px;
  font-weight: 700;
}

h1,
h2,
h3,
p {
  letter-spacing: 0;
}

.topbar h1 {
  margin: 0;
  font-size: 44px;
  line-height: 1.12;
  font-weight: 800;
}

.subtitle {
  max-width: 720px;
  margin: 14px 0 0;
  color: var(--muted);
  font-size: 16px;
}

.workspace {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 28px;
  padding: 28px 44px 48px;
}

.sidebar {
  position: sticky;
  top: 18px;
  align-self: start;
  max-height: calc(100vh - 36px);
  overflow-y: auto;
  padding-right: 2px;
}

.control-panel,
.filter-panel,
.content-head,
.record {
  border: 1px solid var(--line);
  background: var(--surface);
  border-radius: 8px;
}

.control-panel,
.filter-panel {
  padding: 16px;
  box-shadow: var(--shadow);
}

.filter-panel {
  margin-top: 14px;
}

.filter-panel h2 {
  margin: 0 0 10px;
  color: var(--muted);
  font-size: 14px;
}

.search-label {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}

.search-input {
  width: 100%;
  min-height: 42px;
  padding: 9px 11px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: #fff;
  color: var(--ink);
  outline: none;
}

.search-input:focus {
  border-color: var(--accent-2);
  box-shadow: 0 0 0 3px rgba(34, 107, 97, 0.13);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 14px;
}

.stat {
  min-width: 0;
  padding: 9px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--surface-soft);
}

.stat strong {
  display: block;
  font-size: 20px;
  line-height: 1.1;
}

.stat span {
  display: block;
  overflow-wrap: anywhere;
  color: var(--muted);
  font-size: 12px;
}

.button-list {
  display: grid;
  gap: 6px;
}

.filter-button,
.small-button {
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
}

.filter-button {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  min-height: 38px;
  padding: 8px 10px;
  text-align: left;
}

.filter-button:hover,
.filter-button.active {
  border-color: rgba(142, 47, 60, 0.28);
  background: #fbf2f3;
  color: var(--accent);
}

.button-text {
  min-width: 0;
  overflow-wrap: anywhere;
}

.button-count {
  flex: 0 0 auto;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.content-area {
  min-width: 0;
}

.content-head {
  position: sticky;
  top: 18px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  padding: 16px 18px;
  box-shadow: var(--shadow);
}

.content-head h2 {
  margin: 0;
  font-size: 22px;
}

.small-button {
  min-height: 36px;
  padding: 7px 12px;
  border-color: var(--line);
  background: #fff;
}

.small-button:hover {
  border-color: var(--accent-2);
  color: var(--accent-2);
}

.record-list {
  display: grid;
  gap: 14px;
  margin-top: 14px;
}

.record {
  padding: 22px;
}

.record-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: start;
}

.record h3 {
  margin: 0;
  font-size: 22px;
  line-height: 1.35;
}

.record-id {
  flex: 0 0 auto;
  color: var(--accent);
  font-family: Consolas, "SFMono-Regular", monospace;
  font-size: 13px;
}

.record-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 0;
}

.pill {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-height: 26px;
  padding: 3px 8px;
  border: 1px solid var(--line);
  border-radius: 6px;
  color: var(--muted);
  background: var(--surface-soft);
  font-size: 12px;
}

.quote {
  margin: 16px 0 0;
  padding-left: 16px;
  border-left: 3px solid var(--accent-3);
  color: #28302b;
  font-size: 15px;
}

.empty {
  padding: 28px;
  border: 1px dashed var(--line);
  border-radius: 8px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.72);
}

mark {
  background: #f1d67d;
  color: var(--ink);
  padding: 0 2px;
}

@media (max-width: 960px) {
  .topbar,
  .workspace,
  .home-actions {
    grid-template-columns: 1fr;
  }

  .topbar {
    align-items: start;
    padding: 28px 24px;
  }

  .sidebar,
  .content-head {
    position: static;
  }

  .sidebar {
    max-height: none;
    overflow: visible;
    padding-right: 0;
  }
}

@media (max-width: 620px) {
  .home-page {
    place-items: start stretch;
    padding: 22px 16px;
  }

  .home-shell h1,
  .topbar h1 {
    font-size: 34px;
  }

  .home-actions {
    margin-top: 30px;
  }

  .entry-card {
    min-height: 142px;
    padding: 18px;
  }

  .entry-card strong {
    font-size: 24px;
  }

  .topbar {
    flex-direction: column;
    padding: 22px 16px;
  }

  .workspace {
    padding: 18px 12px 32px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .content-head,
  .record-header {
    align-items: stretch;
    flex-direction: column;
  }

  .record {
    padding: 16px;
  }

  .home-link,
  .small-button {
    width: 100%;
    text-align: center;
  }
}
`;
  fs.writeFileSync(path.join(siteDir, 'styles.css'), css, 'utf8');
}

function writeAppJs() {
  const js = `const payload = window.THINKING_INDEX || {};
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
  const specials = '\\\\^$.*+?()[]{}|';
  return [...value].map((char) => specials.includes(char) ? '\\\\' + char : char).join('');
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
`;
  fs.writeFileSync(path.join(siteDir, 'app.js'), js, 'utf8');
}

ensureDirs();

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Missing master index: ${sourcePath}. Run scripts/build-thinking-master.mjs first.`);
}

const payload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
writeData(payload);
writeHomeHtml();
writeThinkingHtml();
writeCss();
writeAppJs();

console.log(`Built site at ${path.join(siteDir, 'index.html')} and ${path.join(siteDir, 'thinking.html')}`);
