import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 70;
const bookTitle = '历史与人像';
const outputDir = path.join(rootDir, 'outputs', '070.历史与人像');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT070-003', '段落过短，信教自由与尊孔偏倚已由袁世凯复古政治和孔教化两条更完整承载。'],
  ['LAT070-008', '主要是《宋史》原文引述，偏人物史料，不如余玠独当与专制收拾两条能呈现李敖判断。'],
  ['LAT070-012', '杜威教育七端中的单项，偏他人思想摘录，独立李敖思想密度不足。'],
  ['LAT070-015', '杜威在中国的活动长叙述偏资料性，保留哲学教育贯通和早年旧作自觉即可。'],
  ['LAT070-018', '桑格夫人家庭与新女性背景偏传记铺陈，后文节育法权与女性自由段落更强。'],
  ['LAT070-021', '《女反抗者》创刊叙事已由直接行动、拒服恶法和不生孩子自由几条覆盖。'],
  ['LAT070-023', '节育指导所开幕偏事件过程，核心观念已由女性控制命运和不生孩子自由承载。'],
  ['LAT070-025', '法院宽大解释偏法律史转折细节，作为思想索引不如拒服恶法与人道自由段落。'],
  ['LAT070-038', '所取段落只是脚注引子，正文四点未在同段展开，校对轮删除。'],
  ['LAT070-039', '“两存疑”过短，考证方法已由两昆仑与行李引文核对条目覆盖。'],
  ['LAT070-043', '文意推断理由不足这一短段已由前后两昆仑考证条目覆盖。'],
  ['LAT070-045', '帝王异象比例表引子偏图表说明，保留古人思想模式与排比研究两条。'],
  ['LAT070-054', '父系只是三特征之一，校对轮集中保留妇人人格、夫妻同体与桎梏总论。'],
  ['LAT070-055', '父权只是三特征之一，校对轮集中保留妇人人格、夫妻同体与桎梏总论。'],
  ['LAT070-056', '父处只是三特征之一，校对轮集中保留妇人人格、夫妻同体与桎梏总论。'],
  ['LAT070-059', '夫妻同体桎梏为概括句，已由妇人无人格和夫妻同体主义两条展开。'],
  ['LAT070-064', '寡妇再嫁段落过长且资料铺陈较多，保留贞操礼教流毒和李易安再嫁私事两条。'],
  ['LAT070-070', '丈夫失踪可裁判离婚偏单项法条，和整体婚姻法权问题相比过窄。'],
  ['LAT070-075', '离书手续偏程序细项，校对轮保留更能呈现制度不平等的条目。'],
  ['LAT070-077', '日本法史学启发偏后记感谢，方法性不如清明集新史料与近代亲属法分类。'],
  ['LAT070-082', '称谓文征辨伪与李易安再嫁案其他证据链重复，保留更强的社会史推断和考据不易。'],
  ['LAT070-088', '为亲者不讳错较短，父子传记难在不乱捧一条更完整。'],
  ['LAT070-095', '亲日解释事实检验与私德不能抵消卖国、非法杀人批评重复，校对轮保留更强段落。'],
]);

const overrides = new Map([
  ['LAT070-001', { title: '旧作保留思想过渡' }],
  ['LAT070-002', { title: '复古政治把圣人宗教化' }],
  ['LAT070-004', { title: '尊孔反动裹着旧道德' }],
  ['LAT070-005', { title: '孔教化不能自称非宗教' }],
  ['LAT070-006', { title: '人格心理学进入史传分析' }],
  ['LAT070-007', { title: '余玠不是孱然儒生' }],
  ['LAT070-009', { title: '独当就是独坐其责' }],
  ['LAT070-010', { title: '功成能臣难免被收拾' }],
  ['LAT070-011', { title: '专制帝王兔死狗烹' }],
  ['LAT070-013', { title: '经验是应付未来的工具' }],
  ['LAT070-014', { title: '哲学就是广义教育学说' }],
  ['LAT070-016', { title: '旧作保留进步教育渴望' }],
  ['LAT070-017', { title: '文明古国也有残忍习俗' }],
  ['LAT070-019', { title: '法律封锁避孕知识' }],
  ['LAT070-020', { title: '献身解救苦难女性' }],
  ['LAT070-022', { title: '直接行动促成废法' }],
  ['LAT070-024', { title: '不能服从不尊重的法律' }],
  ['LAT070-026', { title: '社会运动要扩大问题视野' }],
  ['LAT070-027', { title: '女人应有不生孩子自由' }],
  ['LAT070-029', { title: '节育问题照出中国退缩' }],
  ['LAT070-030', { title: '单纯案件牵出观念问题' }],
  ['LAT070-031', { title: '从历史线索检讨性道德' }],
  ['LAT070-034', { title: '强奸鉴定偏压女性' }],
  ['LAT070-036', { title: '监狱文化暴露妇女屈辱' }],
  ['LAT070-037', { title: '爱情自由要付社会高价' }],
  ['LAT070-041', { title: '引用须核对原文' }],
  ['LAT070-042', { title: '解释不能停在猜想' }],
  ['LAT070-044', { title: '解释以吻合妥贴为准' }],
  ['LAT070-046', { title: '异象可见古人思想模式' }],
  ['LAT070-047', { title: '排比研究可成论文题目' }],
  ['LAT070-048', { title: '出版自由属于意见自由' }],
  ['LAT070-050', { title: '宋代出版管制采检查制' }],
  ['LAT070-051', { title: '情报名义禁书是因噎废食' }],
  ['LAT070-052', { title: '禁书堵不住潮流需求' }],
  ['LAT070-053', { title: '用宋会要做专题史' }],
  ['LAT070-057', { title: '婚后妇人被吸收人格' }],
  ['LAT070-058', { title: '宋代婚姻属夫妻同体' }],
  ['LAT070-060', { title: '用近代亲属法解释古法' }],
  ['LAT070-061', { title: '良贱为婚暴露身分等级' }],
  ['LAT070-063', { title: '重婚禁令维护嫡庶形式' }],
  ['LAT070-065', { title: '贞操思想成为礼教流毒' }],
  ['LAT070-066', { title: '夫妻贞操没有相对性' }],
  ['LAT070-067', { title: '家长权力制造婚姻悲剧' }],
  ['LAT070-069', { title: '两愿离婚承认不相安' }],
  ['LAT070-071', { title: '夫家亲强奸可请求离婚' }],
  ['LAT070-072', { title: '义绝规则偏压妻方' }],
  ['LAT070-073', { title: '婚约约束偏向女方' }],
  ['LAT070-074', { title: '离婚财产观偏向丈夫' }],
  ['LAT070-076', { title: '重视清明集等新史料' }],
  ['LAT070-078', { title: '才女受谣言源于嫉忌' }],
  ['LAT070-079', { title: '近时记录也须检查手法' }],
  ['LAT070-080', { title: '文章少传导致赝品可能' }],
  ['LAT070-083', { title: '用社会史推断案件不可信' }],
  ['LAT070-084', { title: '官方命令再嫁说不成立' }],
  ['LAT070-086', { title: '历史考据真不容易' }],
  ['LAT070-087', { category: '法权', title: '再嫁守寡都是个人私事' }],
  ['LAT070-089', { title: '父子传记难在不乱捧' }],
  ['LAT070-090', { title: '打开天窗会曲解历史' }],
  ['LAT070-091', { title: '史料运用要守史源' }],
  ['LAT070-092', { title: '年谱史例法度要纯' }],
  ['LAT070-093', { title: '守旧派不能包装成新人物' }],
  ['LAT070-094', { title: '私德不能抵消卖国行为' }],
  ['LAT070-096', { title: '非法杀人不能洗作苦衷' }],
  ['LAT070-097', { title: '玩法弄权缺少法制观念' }],
  ['LAT070-098', { title: '外蒙筹边高压后患无穷' }],
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
  return fileName.replace(/^《[^《》]+》/u, bookTitle).replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"'.，。！？、?:：；;\s]+/g, '')
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
      '校对轮删除短句、纯史料引文、过窄法条程序、传记铺陈、图表引子、后记感谢和已由更强段落覆盖的重复主题；保留能够独立呈现李敖历史方法、史料批判、反复古政治、出版法权、节育与性道德、婚姻制度批判、女性处境、人物判断和年谱批评的原文段落。description 未改写。',
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

fs.writeFileSync(
  path.join(outputDir, '思想索引.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
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
  `从提取轮 ${extraction.records.length} 条校为 ${records.length} 条，删除 ${dropped.length} 条。`,
  '',
  '删除原则：',
  '',
  '- 删除短句、图表引子、脚注引子、纯史料引文和过窄程序细项。',
  '- 删除传记铺陈、后记感谢，以及已由更强段落覆盖的重复主题。',
  '- 不改写 description；仅调整取舍、标题、分类和 ID。',
  '',
  '分类统计：',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '删除条目：',
  '',
  ...dropped.map((item) => `- ${item.id}｜${item.title}：${item.reason}`),
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, '校对说明.md'), note, 'utf8');

console.log(`Proofread ${bookTitle}: ${records.length}/${extraction.records.length} kept.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
