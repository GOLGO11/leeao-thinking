import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 82;
const bookTitle = '挑战李敖';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT082-008', '段落重心是投诉材料如何揭穿李远哲神主牌，偏事件资料，方法判断不够独立，校对轮不保留。'],
  ['LAT082-012', '段落主要说明照片资料与胡适博士履历细节，适合人物材料，不适合作为思想索引。'],
  ['LAT082-017', '段落集中在机密资料取得方式和胡因梦个案，材料性强于可独立检索的思想判断。'],
  ['LAT082-027', '“公开接触隔绝黑金”的判断已由 LAT082-016 更集中承载，本条作为重复表达删除。'],
  ['LAT082-033', '政治人物会用人的判断与 LAT082-007、LAT082-064 重复，且本段更偏人物称赞，校对轮删除。'],
  ['LAT082-036', '领袖品质在用人的判断与同书多条重复，本段独立信息量不足，校对轮删除。'],
  ['LAT082-045', '段落重心是李敖自我历史定位，思想判断独立性弱于同书公共议题条目。'],
  ['LAT082-053', '弃选判断偏当时选举棋局推测，作为长期思想索引价值较低。'],
  ['LAT082-058', '段落是文学死尸情欲问题的现场问答，题旨过窄，校对轮不列入思想索引。'],
  ['LAT082-060', '段落多为李登辉男女私生活攻防，公共思想判断不够集中。'],
  ['LAT082-067', '段落主要是选战中谁保护谁的责任归属，时事策略性强，思想密度不足。'],
  ['LAT082-071', '段落主要劝人读李敖著作，带有自我宣传性质，校对轮删除。'],
  ['LAT082-083', '段落更像节目开场与候选人信用铺陈，思想判断不够完整独立。'],
  ['LAT082-090', '段落主要推荐读《李登辉的真面目》，自我宣传性强于索引价值。'],
  ['LAT082-104', '段落主要称赞来宾石齐平的基础和表达，思想条目独立性不足。'],
  ['LAT082-106', '总统豁免导致普通罪无法起诉的判断已由 LAT082-003 承载，本条删除以免重复。'],
]);

const overrides = new Map([
  ['LAT082-001', { title: '挨骂也属于言论自由' }],
  ['LAT082-002', { title: '司法党化时投票比诉讼有效' }],
  ['LAT082-003', { title: '总统豁免不等于卸任免责' }],
  ['LAT082-004', { title: '不懂专业边界就不能乱承诺' }],
  ['LAT082-005', { title: '政治人物职责是任用专家' }],
  ['LAT082-006', { title: '死刑执行不能破坏程序' }],
  ['LAT082-007', { title: '政治人物要会用人而非亲临现场' }],
  ['LAT082-009', { title: '控告政府需要公信力法律团体' }],
  ['LAT082-010', { title: '博士身份不能替代法律专业' }],
  ['LAT082-011', { title: '行政许可也可能被政治反悔' }],
  ['LAT082-013', { title: '洞明世事本身就是学问' }],
  ['LAT082-014', { title: '政治家价值在培养接班人' }],
  ['LAT082-015', { title: '面对大陆不能自欺' }],
  ['LAT082-016', { title: '黑金人物接触必须公开透明' }],
  ['LAT082-018', { title: '简体字有古代传统' }],
  ['LAT082-019', { title: '妇女问题需要部会级保障' }],
  ['LAT082-020', { title: '权利法案不能乱解释' }],
  ['LAT082-021', { title: '台独战争不能回避死亡代价' }],
  ['LAT082-022', { title: '集权常借爱国主义动员' }],
  ['LAT082-023', { title: '学历不该被政权立场否认' }],
  ['LAT082-024', { title: '序跋也可能是写作掩护策略' }],
  ['LAT082-025', { title: '两岸谈判是最大国家大事' }],
  ['LAT082-026', { title: '两岸制度不能预先设定' }],
  ['LAT082-028', { title: '没有证据不能宣称被窃听' }],
  ['LAT082-029', { title: '资金流向比账面买卖更重要' }],
  ['LAT082-030', { title: '合法裁量还要受公共检验' }],
  ['LAT082-031', { title: '政治筹码要服务中国前途' }],
  ['LAT082-032', { title: '恢复宪法是总统首要任务' }],
  ['LAT082-034', { title: '市长公共责任高于党内处境' }],
  ['LAT082-035', { title: '选战判断要看基本盘' }],
  ['LAT082-037', { title: '国家定位口号会制造台独风险' }],
  ['LAT082-038', { title: '揭发黑暗要有承担风险的勇气' }],
  ['LAT082-039', { title: '政治人物不能用含糊逃避立场' }],
  ['LAT082-040', { title: '有为才能改变公共标准' }],
  ['LAT082-041', { title: '现代民主需要政党政治运作' }],
  ['LAT082-042', { title: '思想人物要用道德标准自律' }],
  ['LAT082-043', { title: '卖台指控要先问实际能力' }],
  ['LAT082-044', { title: '省籍牌背后是选战利益' }],
  ['LAT082-046', { title: '一国两制要凭证据冷静面对' }],
  ['LAT082-047', { title: '地区政治不能靠个人独断推动' }],
  ['LAT082-048', { title: '捡战利品不是白色恐怖受难' }],
  ['LAT082-049', { title: '厌女哲学可暴露性道德虚伪' }],
  ['LAT082-050', { title: '智慧高于聪明' }],
  ['LAT082-051', { title: '中国概念不必切成多种中国' }],
  ['LAT082-052', { title: '香港终审权折射法治层级冲突' }],
  ['LAT082-054', { title: '清廉叙事要接受生活证据检验' }],
  ['LAT082-055', { title: '国家命题不能只问第一命题' }],
  ['LAT082-056', { title: '博学记忆可以靠方法训练' }],
  ['LAT082-057', { title: '公投不能脱离宪法设计' }],
  ['LAT082-059', { title: '旧体制核心人物须先过忏悔之桥' }],
  ['LAT082-061', { title: '选举要守基本行规和法律' }],
  ['LAT082-062', { title: '长期研究才配称专家判断' }],
  ['LAT082-063', { title: '辨别真理要追求真相和洞达人情' }],
  ['LAT082-064', { title: '领导者要知人分责而非亲知细节' }],
  ['LAT082-065', { title: '批评财团也要先抓主要黑暗' }],
  ['LAT082-066', { title: '言论自由需要合理游戏规则' }],
  ['LAT082-068', { title: '情欲也是爱情的重要比例' }],
  ['LAT082-069', { title: '宪法不能随统治者轻改' }],
  ['LAT082-070', { title: '面对大陆要维持现实平衡' }],
  ['LAT082-072', { title: '党产承诺要回查旧记录' }],
  ['LAT082-073', { title: '邦联方案要看大陆是否接受' }],
  ['LAT082-074', { title: '参选目标是宣传理念揭发黑暗' }],
  ['LAT082-075', { title: '主权独立需要国际法承认' }],
  ['LAT082-076', { title: '案件过量会拖垮司法品质' }],
  ['LAT082-077', { title: '被架空的总统仍有道德影响力' }],
  ['LAT082-078', { title: '三通问题上的掩耳盗铃是自欺' }],
  ['LAT082-079', { title: '新党知识分子专而不博' }],
  ['LAT082-080', { title: '学术自由叙事不能遮住党内斗争' }],
  ['LAT082-081', { title: '两岸制度可谈出弹性安排' }],
  ['LAT082-082', { title: '早期白话文仍有旧语法负担' }],
  ['LAT082-084', { title: '坟上钉钉子暴露现代迷信' }],
  ['LAT082-085', { title: '言论自由应容纳身体呈现' }],
  ['LAT082-086', { title: '艺术色情不能一查询就查禁' }],
  ['LAT082-087', { title: '中国迷信土壤容易制造骗子' }],
  ['LAT082-088', { title: '钓鱼台问题不能对日本沉默' }],
  ['LAT082-089', { title: '台独动员多来自选票和自大' }],
  ['LAT082-091', { title: '历史人物评价会被长期污蔑' }],
  ['LAT082-092', { title: '言论自由是制衡乱政的方法' }],
  ['LAT082-093', { title: '公审状态会让解释失效' }],
  ['LAT082-094', { title: '豺狼当道时先抓主要黑暗' }],
  ['LAT082-095', { title: '拒绝辩论就谈不上民主先生' }],
  ['LAT082-096', { title: '凯撒妻子典故不能乱引' }],
  ['LAT082-097', { title: '为真理可与朋友分道扬镳' }],
  ['LAT082-098', { title: '司法工具化比政治斗争更恐怖' }],
  ['LAT082-099', { title: '鉴别假政见比罗列政见重要' }],
  ['LAT082-100', { title: '鉴定机关不能合意就用不合就否' }],
  ['LAT082-101', { title: '真民主必须有言论自由和法治' }],
  ['LAT082-102', { title: '教育不能失掉中原文化根本' }],
  ['LAT082-103', { title: '选人要看可用之才而非圣人' }],
  ['LAT082-105', { title: '谈判筹码会因时机丧失' }],
  ['LAT082-107', { title: '骂人要能证明他错在哪里' }],
  ['LAT082-108', { title: '国民党下台不等于轮替给民进党' }],
  ['LAT082-109', { title: '学历史是为了避免重蹈覆辙' }],
]);

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function writeCsv(filePath, records) {
  const headers = [
    'id',
    'source_id',
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
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’？！。，、：；（）()\s]+/g, '')
    .slice(0, 18);
}

function buildKeywords(record, title, category) {
  const words = [category, cleanKeyword(title), cleanKeyword(fileTitle(record.source_file))].filter(Boolean);
  return [...new Set(words)].join(',');
}

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引（${payload.book.round}）`,
    '',
    `- 书号：${payload.book.sequence}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 来源目录：${payload.book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`, '');
    for (const record of records) {
      lines.push(
        `### ${record.id}｜${record.title}`,
        '',
        record.description,
        '',
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
        '',
      );
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const extractionIds = new Set(extraction.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!extractionIds.has(id)) {
    throw new Error(`Unknown extraction id: ${id}`);
  }
}

const dropped = extraction.records
  .filter((record) => dropReasons.has(record.id))
  .map((record) => ({
    id: record.id,
    title: record.title,
    reason: dropReasons.get(record.id),
  }));

const records = extraction.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const edit = overrides.get(record.id) ?? {};
    const category = edit.category ?? record.category;
    const title = edit.title ?? record.title;

    return {
      ...record,
      ...edit,
      id: `LAT${String(bookSeq).padStart(3, '0')}-${String(index + 1).padStart(3, '0')}`,
      source_id: record.id,
      round: '校对轮',
      status: '已校对',
      category,
      title,
      keywords: edit.keywords ?? buildKeywords(record, title, category),
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} for ${record.id}`);
  }

  const source = extraction.records.find((item) => item.id === record.source_id);
  if (!source) {
    throw new Error(`Missing source record for ${record.id}`);
  }

  if (record.description !== source.description) {
    throw new Error(`Description changed for ${record.id}`);
  }
}

const payload = {
  ...extraction,
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除材料性投诉、照片履历、机密资料个案、自我宣传、时事棋局推测、重复用人论、重复总统豁免论和私生活攻防条目；保留政治批判、法权主张、治理方法、知识考据、人格标准、文化判断、写作观察和情爱判断等可独立检索条目。只调整取舍、标题、分类和关键词，description 未改写。',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    category_counts: categoryCounts(records),
  },
  records,
  dropped,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);

fs.writeFileSync(path.join(outputDir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(path.join(outputDir, '思想索引.csv'), records);
fs.writeFileSync(
  path.join(outputDir, '思想索引.txt'),
  records
    .map((record) =>
      [
        `${record.id}｜${record.category}｜${record.title}`,
        `来源：${record.source_file}#${record.source_paragraph}`,
        record.description,
      ].join('\n'),
    )
    .join('\n\n'),
  'utf8',
);

const note = [
  `# ${bookTitle}校对说明`,
  '',
  `来源：${path.relative(rootDir, extractionPath).replaceAll(path.sep, '/')}`,
  '',
  `提取轮 ${extraction.records.length} 条；校对轮 ${records.length} 条；删除 ${dropped.length} 条。`,
  '',
  '校对原则：',
  '',
  '- 保留政治批判、法权主张、治理方法、知识考据、人格标准、文化判断、写作观察和情爱判断等可独立检索条目。',
  '- 删除材料性投诉、照片履历、机密资料个案、自我宣传、时事棋局推测、重复用人论、重复总统豁免论和私生活攻防条目。',
  '- 只调整取舍、标题、分类和关键词；所有 `description` 均沿用提取轮原文段落。',
  '',
  '删除条目：',
  '',
  ...dropped.map((item) => `- ${item.id} ${item.title}：${item.reason}`),
  '',
  '分类统计：',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, '校对说明.md'), note, 'utf8');

console.log(`Proofread ${bookTitle}: ${records.length} records, dropped ${dropped.length}.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
