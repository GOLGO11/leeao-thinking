import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const letterGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('008.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, letterGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('004.'));
const sourceDir = path.join(rootDir, sourceRoot, letterGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '061.李敖书简集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '061',
  title: '李敖书简集',
  slug: 'leeao-shujianji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖书简集》的公开信、狱中秘密通信、司法申辩、政治书信和短札中提取思想索引。description 保留源文本原段落；目录、制作信息、外部剪报长引、单纯问候、案情流水、法条机械铺陈和缺少独立判断的材料不进入本轮。法律与财阀材料仅保留能独立呈现李敖法权意识、证据方法、政治批判、人格伦理、知识分子判断、新闻写作和情爱道德的段落。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['法权', '001', 12, '公司纠偏', '公司法,主管机关,处罚纠正'],
  ['法权', '001', 65, '股东追查', '股东权利,特权阶级,法律途径'],
  ['法权', '001', 76, '诚信举证', '诚信原则,举证责任,邮局证明'],
  ['法权', '001', 91, '命令违法', '法律,行政命令,无效'],
  ['法权', '001', 124, '私生信用卡', '银行法,信用卡,人格侮辱'],
  ['法权', '001', 144, '信托目的', '信托,委托人,特定目的'],
  ['法权', '001', 179, '受托禁利', '信托关系,不当利益,受托人'],
  ['政治', '001', 220, '关系企业', '信托投资,关系企业,财务健全'],
  ['法权', '001', 240, '诚信权利', '公序良俗,诚信原则,权利滥用'],
  ['政治', '001', 255, '财阀横行', '财阀,特权,法律途径'],
  ['法权', '002', 8, '广告审查', '党报,广告,公平机会'],
  ['法权', '002', 24, '背信拒登', '党报,契约,商业道德'],
  ['政治', '002', 31, '封杀公道', '办报,封杀异己,公道'],
  ['法权', '003', 7, '业务秘密', '商业秘密,正当理由,法律责任'],
  ['法权', '003', 19, '事实非理由', '泄露秘密,正当理由,商业道德'],
  ['法权', '003', 26, '第一手证据', '公司复文,证据,法律依据'],
  ['法权', '003', 29, '有问不答', '法律行动,舆论声讨,财阀'],
  ['情爱', '004', 5, '被夹可敬', '婚姻,胁迫,尊敬'],
  ['情爱', '004', 17, '婚姻道德', '法律,道德,婚姻'],
  ['情爱', '004', 18, '公序婚德', '不义灭夫,公秩良序,群众'],
  ['人格', '004', 20, '爱人以德', '爱人以德,姑息,人格'],
  ['写作', '004', 21, '记者不中立', '新闻,中立,道德选择'],
  ['法权', '005', 5, '徒法难行', '司法改革,注意事项,法律'],
  ['方法', '005', 8, '实例教育', '司法改革,实例,可读性'],
  ['法权', '005', 18, '无证入罪', '证据,推测,论理法则'],
  ['法权', '005', 25, '估计非证', '估计,罪证,刑事法则'],
  ['法权', '005', 37, '单方栽证', '备忘录,证据,公正'],
  ['法权', '005', 60, '重要证据', '证据,判决,公正'],
  ['法权', '005', 148, '断章取账', '账册,罗织,判决'],
  ['法权', '005', 154, '程序脱法', '刑事诉讼法,程序,司法'],
  ['政治', '005', 155, '被迫反政府', '司法制度,反政府势力,批评'],
  ['法权', '005', 157, '司法官品德', '司法改革,能力学识,辞职'],
  ['方法', '006', 13, '分散印书', '印书,警觉,化整为零'],
  ['人格', '007', 4, '拒见权力', '法务部,拒见,权力'],
  ['法权', '008', 5, '酷刑举证', '看守所,酷刑,证据'],
  ['法权', '008', 6, '不是个案', '凌虐,看守所,人犯'],
  ['法权', '008', 7, '医疗漠视', '病舍,医疗,健康'],
  ['法权', '008', 8, '狱政特权', '狱政,特权,家属'],
  ['法权', '008', 17, '公开听证', '打人名单,值勤表,公开听证'],
  ['法权', '009', 4, '揭黑震动', '司法,法务,监所'],
  ['政治', '009', 8, '一面倒传播', '官方批判,封杀,舆论'],
  ['法权', '009', 9, '封锁无效', '司法问题,新闻封锁,失职'],
  ['情爱', '010', 5, '看看也好', '美,老人,趣味'],
  ['法权', '011', 6, '黑牢不白', '政治整肃,法律罪名,黑牢'],
  ['人格', '011', 11, '表演硬里', '学问造诣,大胆见解,人格风范'],
  ['知识', '012', 4, '知识士羊', '知识分子,官方,曲学阿世'],
  ['人格', '012', 5, '拒同席', '知识分子,失望,痛苦'],
  ['人格', '012', 6, '判定后不谈', '戴高乐,性格,废话'],
  ['人格', '013', 4, '长寿武器', '清白,长寿,敌人'],
  ['人格', '013', 5, '真话长寿', '马寅初,真话,平反'],
  ['政治', '013', 6, '党外软骨', '老政治犯,党外,是非感'],
  ['写作', '014', 7, '历史文件', '措辞,历史人物,真相'],
  ['人格', '014', 8, '气忍声不吞', '出境,发声,人格'],
  ['政治', '014', 9, '斗士不姑息', '党外,群众,爱人以德'],
  ['政治', '014', 10, '点破统战', '官方,康宁祥,统一战线'],
  ['法权', '015', 3, '恶法人权', '警察,人权,恶法'],
  ['法权', '015', 8, '知道恶法', '法律素养,恶法,同流合污'],
  ['法权', '015', 16, '保障不放纵', '刑诉法,人权,警察权'],
  ['政治', '015', 19, '万年代表', '宪法,代表性,民意'],
  ['政治', '015', 24, '合法强奸民意', '民意,迷途知返,选择'],
  ['政治', '016', 12, '言论代价', '千秋评论,查禁,言论自由'],
  ['政治', '016', 13, '不合作主义', '国民党,不合作,欺骗'],
  ['人格', '016', 14, '互相毁灭', '反击能力,政权,制衡'],
  ['人格', '016', 15, '生死代价', '生死,抗争,代价'],
  ['政治', '017', 10, '靠行募款', '台湾同乡会,政治犯,受难者'],
  ['政治', '017', 12, '抱大腿', '美国参议员,趋炎附势,国民党'],
  ['法权', '018', 4, '冤狱反击', '极权,冤狱,法官良知'],
  ['写作', '018', 5, '报纸选择', '报纸,平反,斗臭'],
  ['政治', '018', 6, '三十三年', '办报,改选,结怨'],
  ['政治', '018', 8, '失败者心态', '监察院,幻想,失败者'],
  ['政治', '019', 4, '洗澡心理', '国民党,中山楼,偷看'],
  ['文化', '019', 9, '文化禁苑', '中山楼,文化复兴,禁苑'],
  ['政治', '019', 10, '党警民众', '警察,民众,国民党'],
  ['情爱', '019', 12, '婚期划界', '婚礼,迷信,上一代'],
  ['政治', '019', 13, '清高政治', '党外基金,财务,清高'],
  ['政治', '020', 3, '言论难得', '言论自由,改版,军方'],
  ['方法', '020', 6, '事实基础', '求证,事实,公信力'],
  ['方法', '020', 14, '稻草谬误', '辩论,曲解,谬误'],
  ['方法', '020', 15, '正确描述', '描述,史实,方法学'],
  ['人格', '021', 3, '不饮盗泉', '高薪,独立,斗气'],
  ['方法', '021', 8, '事实判人', '两面人,事实,咬文嚼字'],
  ['人格', '021', 13, '乡愿乱朱', '乡愿,是非,伪善'],
  ['政治', '021', 18, '正直被孤立', '正直,偏激,公道'],
  ['政治', '021', 23, '拒绝乡愿', '乡愿,公道,人物评价'],
  ['写作', '022', 4, '写信敢当', '书信,发表,大丈夫'],
  ['写作', '022', 12, '敌助流传', '公开信,查禁,封杀'],
  ['政治', '022', 14, '红色变节', '变节者,告密,知识分子'],
  ['知识', '022', 21, '极权匿名', '知识分子,恫吓,匿名'],
];

function normalize(text) {
  return String(text ?? '').replace(/\r/g, '').trim();
}

function normalizeForCompare(text) {
  return String(text ?? '').replace(/\s+/g, '').trim();
}

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

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引（${payload.book.round}）`,
    '',
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 来源目录：${payload.book.sourceDir}`,
    '',
  ];

  for (const item of categoryCounts(payload.records)) {
    lines.push(`## ${item.category}（${item.count}）`, '');
    for (const record of payload.records.filter((entry) => entry.category === item.category)) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
      lines.push(
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
      );
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function previousDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const map = new Map();
  for (const record of master.records ?? []) {
    if (record.id?.startsWith('LAT061-')) continue;
    map.set(normalizeForCompare(record.description), record.id);
  }
  return map;
}

const sourceFiles = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
const filesByKey = new Map(
  sourceFiles.filter((name) => /^\d{3}\./.test(name)).map((name) => [name.slice(0, 3), name]),
);

const paragraphCache = new Map();
function sourceParagraphs(key) {
  const fileName = filesByKey.get(key);
  if (!fileName) {
    throw new Error(`Missing source file for key ${key}`);
  }
  if (!paragraphCache.has(fileName)) {
    const text = decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
    paragraphCache.set(
      fileName,
      text
        .replace(/\r/g, '')
        .split(/\n\s*\n+/)
        .map(normalize)
        .filter(Boolean),
    );
  }
  return { fileName, paragraphs: paragraphCache.get(fileName) };
}

const previous = previousDescriptions();
const skipped = [];
const seenCurrent = new Map();
const keptCandidates = [];

for (const [category, key, paragraphNumber, title, keywords] of candidateEntries) {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${key} P${paragraphNumber}`);
  }
  const { fileName, paragraphs } = sourceParagraphs(key);
  const description = paragraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${key} P${paragraphNumber}`);
  }
  const normalized = normalizeForCompare(description);
  if (previous.has(normalized)) {
    skipped.push({
      key,
      paragraphNumber,
      title,
      duplicateOf: previous.get(normalized),
    });
    continue;
  }
  if (seenCurrent.has(normalized)) {
    skipped.push({
      key,
      paragraphNumber,
      title,
      duplicateOf: seenCurrent.get(normalized),
    });
    continue;
  }
  keptCandidates.push({
    category,
    key,
    paragraphNumber,
    title,
    keywords,
    fileName,
    description,
  });
  seenCurrent.set(normalized, `${key} P${paragraphNumber}`);
}

const records = keptCandidates.map((candidate, index) => ({
  id: `LAT061-${String(index + 1).padStart(3, '0')}`,
  book: book.title,
  round: book.round,
  status: book.status,
  category: candidate.category,
  title: candidate.title,
  description: candidate.description,
  source_file: candidate.fileName,
  source_paragraph: candidate.paragraphNumber,
  source_path: path.relative(rootDir, path.join(sourceDir, candidate.fileName)).replaceAll(path.sep, '/'),
  keywords: candidate.keywords,
}));

for (const record of records) {
  const sourceKey = record.source_file.slice(0, 3);
  const { paragraphs } = sourceParagraphs(sourceKey);
  if (paragraphs[record.source_paragraph - 1] !== record.description) {
    throw new Error(`Description mismatch for ${record.id}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...book,
    record_count: records.length,
    candidate_count: candidateEntries.length,
    skipped_duplicate_count: skipped.length,
  },
  taxonomy,
  records,
  skipped_duplicates: skipped,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);

const noteLines = [
  '# 《李敖书简集》思想索引提取说明',
  '',
  `- 来源目录：${book.sourceDir}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 输出条目：${records.length}`,
  `- 跨书或本书重复跳过：${skipped.length}`,
  '',
  '## 提取口径',
  '',
  '- 保留公开信、狱中通信、司法申辩和政治书信中可独立检索的思想判断。',
  '- description 字段逐条取自源文件原段落，不做改写或摘要。',
  '- 法律长文只保留法权原则、证据方法、司法制度批判和财阀特权判断，技术性法条铺陈不单独立项。',
  '- 外部剪报、他人来信长引、纯事实流水、单纯寒暄和制作信息不进入索引。',
  '- 分类继续使用 8 个原子分类，避免新增过密分类。',
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
];

fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(`Built ${records.length} records for ${book.title}.`);
console.log(`Skipped duplicate descriptions: ${skipped.length}.`);
