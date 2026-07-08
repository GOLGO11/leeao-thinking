import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const sequence = '095';
const bookTitle = '李敖发电集';
const bookDir = path.join(repoRoot, 'outputs', `${sequence}.${bookTitle}`);
const inputPath = path.join(bookDir, '思想索引-提取轮.json');

const outputJson = path.join(bookDir, '思想索引-校对轮.json');
const outputCsv = path.join(bookDir, '思想索引-校对轮.csv');
const outputMd = path.join(bookDir, '思想索引-校对轮.md');
const canonicalJson = path.join(bookDir, '思想索引.json');
const canonicalCsv = path.join(bookDir, '思想索引.csv');
const canonicalTxt = path.join(bookDir, '思想索引.txt');
const proofreadNote = path.join(bookDir, '校对说明.md');

const categories = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];
const categorySet = new Set(categories);

function buildDropReasons() {
  const entries = [];
  const add = (ids, reason) => {
    ids.forEach((id) => entries.push([id, reason]));
  };

  add(['LAT095-001', 'LAT095-006', 'LAT095-094', 'LAT095-095', 'LAT095-121', 'LAT095-130', 'LAT095-131', 'LAT095-135', 'LAT095-137', 'LAT095-138', 'LAT095-141', 'LAT095-152', 'LAT095-153', 'LAT095-155', 'LAT095-157', 'LAT095-166', 'LAT095-174', 'LAT095-193', 'LAT095-221', 'LAT095-227', 'LAT095-235'], '同题演讲或论证中的弱重复，已由更完整、更可检索的条目覆盖。');
  add(['LAT095-025', 'LAT095-045', 'LAT095-053', 'LAT095-068', 'LAT095-075', 'LAT095-076', 'LAT095-083', 'LAT095-114', 'LAT095-118', 'LAT095-125', 'LAT095-240'], '偏当日竞选、人际往来或修辞余波，思想独立性较弱。');
  add(['LAT095-028', 'LAT095-060', 'LAT095-062', 'LAT095-067', 'LAT095-110', 'LAT095-173'], '偏轶事、玩笑或自我叙述，保留价值不及同组核心条目。');
  add(['LAT095-072', 'LAT095-073'], '同一土地揭弊链条中的细部线索，已由登记时间、合理怀疑和欲盖弥彰条目覆盖。');
  add(['LAT095-097', 'LAT095-098', 'LAT095-103'], '同一佛教与信命批评中的展开段，已由原始佛教、入世精神、资源转向教育等条目覆盖。');
  add(['LAT095-108'], '党产问题的铺垫段，已由党产信托和党产脱产条目覆盖。');
  add(['LAT095-163'], '校园言论自由同题段，已由“知识分子耻辱是限制言论”条目覆盖。');
  add(['LAT095-165'], '战争惨剧铺垫段，已由台独代价、打仗最坏解决方法等条目覆盖。');
  add(['LAT095-200'], '慰安妇教科书同题重复，已由前文更清楚的教科书条目覆盖。');
  add(['LAT095-209'], '偏个案疑案处理，方法价值已由证据形式和判断能力条目覆盖。');
  add(['LAT095-210'], '偏时局动作判断，后续访谈中已有更完整的安全与谈判判断。');
  add(['LAT095-219'], '偏人身性政治评断，独立思想价值较弱。');

  return new Map(entries);
}

const dropReasons = buildDropReasons();

const overrides = new Map([
  ['LAT095-004', { category: '方法', title: '劝说台独先从功利面入手', keywords: ['劝说', '台独', '功利'] }],
  ['LAT095-027', { title: '书多敌人多才属实', keywords: ['藏书', '敌人', '台湾'] }],
  ['LAT095-030', { title: '冥婚迷信也保存情痴史料', keywords: ['冥婚', '民间', '史料'] }],
  ['LAT095-039', { title: '学术界清高其外卑鄙其中', keywords: ['学术界', '清高', '卑鄙'] }],
  ['LAT095-049', { title: '现代告地状可以登报', keywords: ['告地状', '刘家昌', '媒体'] }],
  ['LAT095-055', { title: '性尺度应走向公开', keywords: ['pubic', 'public', '公开'] }],
  ['LAT095-056', { title: '人体摄影尺度不该落伍', keywords: ['人体美', '新闻局', '限制级'] }],
  ['LAT095-057', { category: '方法', title: '文献整理宁可少剪裁', keywords: ['邓小平', '文献', '剪裁'] }],
  ['LAT095-063', { title: '桃色也会成为政治封口', keywords: ['黑名单', '李登辉', '桃色'] }],
  ['LAT095-066', { title: '桃色封口无分省籍', keywords: ['李登辉', '黑名单', '蒋介石'] }],
  ['LAT095-074', { title: '难友情谊要以行动记得', keywords: ['魏廷朝', '难友', '行动'] }],
  ['LAT095-077', { title: '欲盖弥彰拆穿权力把戏', keywords: ['李登辉', '石掌珠', '别墅'] }],
  ['LAT095-079', { title: '不做乡愿才不怕得罪人', keywords: ['敌人', '乡愿', '理想主义'] }],
  ['LAT095-082', { title: '统一要用开放和选举', keywords: ['统一', '选举', '开放'] }],
  ['LAT095-087', { title: '逃兵没有裁判资格', keywords: ['沈富雄', '逃兵', '台湾'] }],
  ['LAT095-093', { title: '岛上只有聪明人和笨人', keywords: ['族群', '台湾人', '聪明'] }],
  ['LAT095-099', { title: '佛教真义在破格救人', keywords: ['佛教', '破山和尚', '救人'] }],
  ['LAT095-104', { title: '智慧胜过宗教和命', keywords: ['智慧', '宗教', '命'] }],
  ['LAT095-106', { title: '女人不必被政治侮辱', keywords: ['女人', '政治', '副总统'] }],
  ['LAT095-120', { title: '主张必须配办法', keywords: ['主张', '办法', '台湾'] }],
  ['LAT095-128', { title: '国号可以谈出来', keywords: ['一个中国', '国号', '谈判'] }],
  ['LAT095-132', { title: '谈判是现状之外的办法', keywords: ['谈判', '美国', '打仗'] }],
  ['LAT095-134', { title: '五十年会带来意外机会', keywords: ['五十年', '机会', '谈判'] }],
  ['LAT095-164', { title: '限制言论是知识分子耻辱', keywords: ['知识分子', '言论自由', '校园'] }],
  ['LAT095-185', { category: '法权', title: '尊严和自由要口袋支持', keywords: ['尊严', '钱', '言论自由'] }],
  ['LAT095-187', { title: '争自由需要智慧和喜感', keywords: ['言论自由', '智慧', '写文章'] }],
  ['LAT095-190', { title: '言论自由需要表达能力', keywords: ['言论自由', '表达', '勇气'] }],
  ['LAT095-202', { title: '爱台湾爱到不愿离开', keywords: ['台湾', '彭明敏', '爱台湾'] }],
  ['LAT095-203', { title: '讲真话来自了解台湾', keywords: ['台湾', '真话', '现实政治'] }],
  ['LAT095-204', { title: '支持坏党是为了制衡', keywords: ['民主', '制衡', '党外'] }],
  ['LAT095-207', { title: '独来独往不加入政党', keywords: ['政党', '独立', '李敖'] }],
  ['LAT095-208', { title: '当权者不好就该拔根', keywords: ['当权者', '批判', '李敖'] }],
  ['LAT095-216', { title: '真话不能混入浑话', keywords: ['真话', '烂苹果', '王建煊'] }],
  ['LAT095-217', { title: '面对现实才能保留元气', keywords: ['香港', '撒切尔', '现实'] }],
  ['LAT095-220', { title: '浑人引导民意更危险', keywords: ['民意', '李登辉', '智慧'] }],
  ['LAT095-222', { title: '精英爱名位胜过真话', keywords: ['精英', '真话', '台湾'] }],
  ['LAT095-223', { title: '反共教育阴魂仍在', keywords: ['反共抗俄', '蒋介石', '台湾'] }],
  ['LAT095-230', { title: '利益混合才安全', keywords: ['利益', '台湾', '中共'] }],
  ['LAT095-238', { title: '文化切入可以促成和平', keywords: ['故宫', '谈判', '文化'] }],
  ['LAT095-241', { title: '台湾需要谈判高手', keywords: ['塔力兰', '谈判', '台湾'] }],
  ['LAT095-243', { title: '热爱乡土方法错会害乡土', keywords: ['乡土', '方法', '台湾'] }],
  ['LAT095-253', { title: '清醒者维系台湾安全', keywords: ['头脑清醒', '台湾安全', '现况'] }],
  ['LAT095-259', { title: '不被骗是人生快乐', keywords: ['人生', '证据', '不被骗'] }],
]);

function padIndex(index) {
  return String(index).padStart(3, '0');
}

function categoryCounts(records) {
  return categories
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  if (/[",\n\r]/u.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function toCsv(records) {
  const headers = [
    'id',
    'book',
    'round',
    'status',
    'category',
    'title',
    'description',
    'source_file',
    'source_paragraph',
    'source_path',
    'keywords',
    'source_id',
  ];
  const lines = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => {
      if (header === 'keywords') return csvEscape(record.keywords.join(';'));
      return csvEscape(record[header]);
    }).join(',')),
  ];
  return `\uFEFF${lines.join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`,
    '',
    `- 书名：${bookTitle}`,
    '- 轮次：校对轮',
    '- 状态：已校对',
    `- 条目数：${records.length}`,
    '- 说明：description 保持源文本原段落，只校对取舍、标题、分类、关键词和编号。',
    '',
  ];

  for (const record of records) {
    lines.push(`## ${record.id}. ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(`- 关键词：${record.keywords.join('、')}`);
    lines.push(`- 提取轮：${record.source_id}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => [
    `${record.id}. ${record.title}`,
    `分类：${record.category}`,
    `来源：${record.source_file}#${record.source_paragraph}`,
    `关键词：${record.keywords.join('、')}`,
    `提取轮：${record.source_id}`,
    record.description,
  ].join('\n')).join('\n\n')}\n`;
}

function toProofreadNote(records, droppedRecords) {
  const lines = [
    `# ${bookTitle} 校对说明`,
    '',
    '- 轮次：校对轮',
    '- 状态：已校对',
    '- 校对原则：压缩同题演讲和访谈段落，保留李敖自己的可检索判断；剔除弱重复、纯竞选时效、局部人际往来、玩笑余波和低独立性个案细节。',
    '- 原文处理：所有保留条目的 `description` 未改写，仍为源文本原段落。',
    `- 提取轮条目数：${records.length + droppedRecords.length}`,
    `- 校对轮条目数：${records.length}`,
    `- 剔除条目数：${droppedRecords.length}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 剔除记录',
    '',
    ...droppedRecords.map((item) => `- ${item.source_id}｜${item.title}：${item.reason}`),
    '',
    '## 主要收整',
    '',
    '- 将沟通策略、文献整理、证据运用等条目向“方法”集中。',
    '- 将言论自由、审查、校园表达、媒体封锁等条目保持在“法权”。',
    '- 合并一国两制、谈判、台独代价、国际承认等同题演讲重复，只保留判断更完整的段落。',
    '- 保留佛教、命、性别、爱情、写作和人格条目，避免全书被短期政治议题淹没。',
    '',
  ];
  return `${lines.join('\n')}\n`;
}

const source = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const sourceRecords = source.records || [];
const droppedRecords = [];
const keptRecords = [];

for (const record of sourceRecords) {
  const reason = dropReasons.get(record.id);
  if (reason) {
    droppedRecords.push({
      source_id: record.id,
      title: record.title,
      source_file: record.source_file,
      source_paragraph: record.source_paragraph,
      reason,
    });
    continue;
  }

  const override = overrides.get(record.id) || {};
  const category = override.category || record.category;
  if (!categorySet.has(category)) {
    throw new Error(`未知分类：${record.id} ${category}`);
  }

  keptRecords.push({
    ...record,
    round: '校对轮',
    status: '已校对',
    category,
    title: override.title || record.title,
    keywords: override.keywords || record.keywords,
    source_id: record.id,
  });
}

const records = keptRecords.map((record, index) => ({
  ...record,
  id: `LAT${sequence}-${padIndex(index + 1)}`,
}));

const output = {
  generated_at: new Date().toISOString(),
  book: {
    ...source.book,
    round: '校对轮',
    status: '已校对',
    note: '校对轮压缩同题演讲和访谈段落，剔除弱重复、纯竞选时效、局部人际往来和低独立性个案细节；收整标题和分类。只调整取舍、标题、分类、关键词和编号，description 未改写。',
    source_count: sourceRecords.length,
    dropped_count: droppedRecords.length,
    dropped_records: droppedRecords,
    record_count: records.length,
    category_counts: categoryCounts(records),
  },
  taxonomy: source.taxonomy,
  records,
};

fs.writeFileSync(outputJson, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
fs.writeFileSync(outputCsv, toCsv(records), 'utf8');
fs.writeFileSync(outputMd, toMarkdown(records), 'utf8');
fs.writeFileSync(canonicalJson, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
fs.writeFileSync(canonicalCsv, toCsv(records), 'utf8');
fs.writeFileSync(canonicalTxt, toTxt(records), 'utf8');
fs.writeFileSync(proofreadNote, toProofreadNote(records, droppedRecords), 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  source_records: sourceRecords.length,
  records: records.length,
  dropped: droppedRecords.length,
  category_counts: categoryCounts(records),
}, null, 2));
