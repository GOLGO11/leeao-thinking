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
  .find((name) => name.startsWith('007.'));
const sourceDir = path.join(rootDir, sourceRoot, letterGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '064.李敖书牍集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '064',
  title: '李敖书牍集',
  slug: 'leeao-shuduji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖书牍集》的公开信、答信、出版查禁交涉、司法行政质询、党外路线评判、知识分子批判、历史写作劝告和反共理论辨析中提取思想索引。description 保留源文本原段落；目录、制作信息、寒暄、他人来信、法条或报导长引、纯案情铺陈和重复论证不进入本轮。书信体材料只取能够独立呈现李敖法权意识、写作使命、人格伦理、政治判断、知识方法和文化批判的段落，避免把同一事实链拆得过密。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['知识', '001', 8, '学者不做应召之臣', '知识分子,尊严,不亢不卑'],
  ['写作', '002', 5, '幽灵不会散去', '文星,李敖,写作存在'],
  ['文化', '002', 7, '复刊不能失魂', '文星,自由,殉道'],
  ['人格', '003', 6, '终点也是起点', '人生路,终点,起点'],
  ['方法', '003', 8, '直线前进', '方向,直线,自立'],
  ['方法', '004', 5, '来回都不空手', '时间管理,资料分类,来回带物法'],
  ['法权', '005', 7, '查扣必须书面', '禁书,行政处分,书面理由'],
  ['法权', '005', 10, '赔偿不能赖账', '国家赔偿,查扣,政府信用'],
  ['法权', '005', 13, '宪法不能空挂', '宪法,国家赔偿,公务员责任'],
  ['写作', '006', 4, '冥诞发表也是抗议', '蒋介石研究,出版,抗议'],
  ['文化', '007', 6, '鲁迅也被选择性利用', '鲁迅,查禁,国民党'],
  ['法权', '007', 7, '不禁左书是好事', '左倾,查禁,标准'],
  ['法权', '007', 9, '开放才有标准', '鲁迅,李敖,查禁'],
  ['政治', '008', 7, '宪改秀来得太晚', '五大臣,宪政,国民党'],
  ['政治', '008', 12, '理想被政客分赃', '党外,组党,权力'],
  ['法权', '009', 15, '邮政查扣偷走订费', '邮政,查禁,订户'],
  ['政治', '009', 18, '理想主义者先被排挤', '党外,理想主义,权力'],
  ['人格', '010', 8, '天行不为小人停', '天行,小人,自守'],
  ['写作', '011', 16, '近侍应写实录', '回忆录,蒋介石,历史'],
  ['方法', '011', 21, '口头命令也要折扣', '证据,口令,史料'],
  ['写作', '011', 28, '只写善会连善失真', '传记,史实,可信'],
  ['人格', '011', 29, '爱人以德不遮恶', '君子,忠诚,隐恶'],
  ['写作', '011', 30, '自传要无所讳', '自传,禁忌,史料'],
  ['人格', '012', 8, '站起来才有环境', '封杀,写作,自立'],
  ['人格', '013', 8, '主持正义不是制造纷争', '正义,友情,是非'],
  ['人格', '013', 9, '不卖朋友', '朋友,人格,道德'],
  ['文化', '014', 12, '不提李敖成风尚', '知识分子,封锁,名字'],
  ['人格', '014', 17, '怕到高层也沉默', '知识分子,恐惧,沉默'],
  ['文化', '014', 18, '索引抹名也是封锁', '文化索引,李敖,封杀'],
  ['人格', '014', 25, '报恩不能怕提名', '孙立人,纪念,感恩'],
  ['法权', '015', 8, '登记不能私下转手', '出版登记,法律,转让'],
  ['政治', '015', 12, '禁批李敖却放反李敖', '查禁,党外,政府目的'],
  ['写作', '016', 7, '报纸要对广告负责', '报纸,广告,责任'],
  ['法权', '016', 8, '媒体应拒绝害人广告', '广告,法律,伤害'],
  ['政治', '016', 10, '独立报纸也可同路', '自立晚报,国民党,同路'],
  ['法权', '017', 5, '党外不是护身符', '诽谤,党外,人告人'],
  ['写作', '018', 4, '个案追索黑暗', '黑狱,个案,写作'],
  ['写作', '018', 6, '不写就是姑息', '冤狱,写作,清算'],
  ['法权', '019', 5, '律师也有正义标准', '律师,诽谤,正义'],
  ['法权', '019', 6, '不替坏案辩护', '林肯,律师,正义'],
  ['写作', '020', 10, '有头皮才写冤案', '冤案,勇气,写作'],
  ['法权', '021', 18, '停审没有法理', '法院,停审,审判'],
  ['法权', '021', 29, '延宕就是事实', '司法,延宕,监督'],
  ['法权', '021', 30, '简单案件拖四百天', '司法效率,拖延,审判'],
  ['法权', '021', 45, '不惩延宕就非谣言', '案件延宕,司法,事实'],
  ['法权', '022', 7, '民事赔偿是文明办法', '赔偿,文明,诉讼'],
  ['知识', '023', 5, '学用不能分裂', '知识分子,司法院,冤狱'],
  ['人格', '023', 10, '老友消尽仍争理', '友情,道义,争理'],
  ['法权', '024', 8, '新闻曝光影响尺度', '司法,报纸,问案'],
  ['法权', '024', 16, '老板案改变讲话权', '法院,媒体,尺度'],
  ['政治', '025', 7, '判罪后再杀杂志', '文星,政治判决,出版自由'],
  ['法权', '025', 18, '法院函文配合封杀', '文星,法院,市府'],
  ['法权', '025', 22, '标准不能随案变', '文星,查扣,法律'],
  ['法权', '026', 5, '警察不能自断', '警察,内政部,权限'],
  ['法权', '026', 14, '查报不能遮掩', '警察,法令,查报'],
  ['法权', '028', 8, '选择执行有厚薄', '法院,执行,标准'],
  ['人格', '029', 6, '树敌验朋友', '敌人,朋友,考验'],
  ['人格', '029', 8, '争是非不做乡愿', '朋友,是非,乡愿'],
  ['人格', '029', 9, '真朋友站真理', '朋友,真理,距离'],
  ['法权', '030', 15, '答非所问不能过关', '市府,法院,文星'],
  ['法权', '030', 28, '行政处罚要看同案', '行政处罚,标准,文星'],
  ['人格', '031', 9, '一书二卖是人格问题', '出版,契约,人格'],
  ['法权', '031', 24, '将来不能任意解释', '契约,出版,法律'],
  ['方法', '031', 36, '让步不能倒成无异议', '记忆,合同,事实'],
  ['方法', '031', 37, '记忆要看利害方向', '记忆,证据,责任'],
  ['法权', '031', 38, '责任不能推给公司', '著作权,诈欺,责任'],
  ['政治', '032', 89, '同受迫害也有差别', '国民党,政治犯,异端'],
  ['政治', '032', 92, '干部政策全是谎话', '蒋经国,干部,迫害'],
  ['写作', '032', 93, '刑余之作可清算王朝', '司马迁,史记,牢狱'],
  ['写作', '032', 95, '蒋家王朝也该入本纪', '史记,蒋家王朝,历史写作'],
  ['方法', '033', 5, '表里一致才可肯定', '政治行动,表里一致,演戏'],
  ['政治', '033', 9, '政治人物台上台下皆秀', '政治人物,表演,不信任'],
  ['政治', '033', 16, '进体制要交代初衷', '民意机关,党外,国民议会'],
  ['政治', '034', 4, '解严秀仍禁申冤', '解严,政治犯,申冤'],
  ['法权', '034', 6, '用旧规矩反问旧政权', '戒严法,国民党,法权'],
  ['政治', '034', 7, '制造晴空乱流', '政治行动,蒋介石,乱流'],
  ['知识', '035', 5, '看知识分子先看大节', '知识分子,陈独秀,不妥协'],
  ['知识', '035', 6, '私交不能抵过大节', '知识分子,判断,原则'],
  ['知识', '035', 8, '夹缝求生也有界线', '知识分子,政工,底线'],
  ['知识', '036', 84, '正统马克思不能反共', '马克思主义,反共,考茨基'],
  ['政治', '036', 105, '钦定专家免于怀疑', '匪情专家,国民党,双重标准'],
  ['知识', '036', 118, '神秘化马克思主义会张目', '马克思主义,神秘化,青年'],
  ['知识', '036', 119, '专家用玄虚吓唬青年', '马克思主义,知识分子,理论'],
  ['方法', '036', 125, '老王麻子不能反王麻子', '方法学,以矛攻盾,反共'],
  ['方法', '036', 139, '用马克思主义反共不通', '马克思主义,反共,方法'],
  ['方法', '036', 140, '关怀也要用脑反对', '方法学,关怀,批判'],
  ['政治', '037', 4, '非法搜查就是盗贼政府', '搜查,国民党,政府'],
  ['法权', '038', 6, '岛上特权逃不过标准', '纽约时报,诽谤,责任'],
  ['写作', '038', 7, '刊登反击是言出必行', '广告,反击,法院'],
];

function sourceParagraphs(key) {
  const fileName = fs.readdirSync(sourceDir).find((name) => name.startsWith(`${key}.`));
  if (!fileName) {
    throw new Error(`Missing source file for key ${key}`);
  }

  const text = decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
  const paragraphs = text
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return { fileName, paragraphs };
}

function normalizeText(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
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
    `- 来源目录：${payload.book.sourceDir}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 生成时间：${payload.generated_at}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 索引条目',
    '',
  ];

  for (const record of payload.records) {
    lines.push(
      `### ${record.id} ${record.title}`,
      '',
      `- 分类：${record.category}`,
      `- 来源：${record.source_file} 第 ${record.source_paragraph} 段`,
      `- 关键词：${record.keywords}`,
      '',
      record.description,
      '',
    );
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function existingDescriptionMap() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) {
    return new Map();
  }
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  return new Map(
    (master.records ?? []).map((record) => [
      normalizeText(record.description),
      `${record.id} ${record.book}`,
    ]),
  );
}

const seenExisting = existingDescriptionMap();
const seenCurrent = new Map();
const keptCandidates = [];
const skipped = [];

for (const [category, key, paragraphNumber, title, keywords] of candidateEntries) {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category: ${category}`);
  }

  const { fileName, paragraphs } = sourceParagraphs(key);
  const description = paragraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${key} P${paragraphNumber}`);
  }

  const normalized = normalizeText(description);
  if (seenExisting.has(normalized)) {
    skipped.push({
      category,
      key,
      paragraphNumber,
      title,
      duplicateOf: seenExisting.get(normalized),
    });
    continue;
  }
  if (seenCurrent.has(normalized)) {
    skipped.push({
      category,
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
  id: `LAT064-${String(index + 1).padStart(3, '0')}`,
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
  '# 《李敖书牍集》思想索引提取说明',
  '',
  `- 来源目录：${book.sourceDir}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 输出条目：${records.length}`,
  `- 跨书或本书重复跳过：${skipped.length}`,
  '',
  '## 提取口径',
  '',
  '- 保留公开信、答信、出版查禁交涉、司法行政质询、党外路线评判、知识分子批判、历史写作劝告和反共理论辨析中可独立检索的思想判断。',
  '- description 字段逐条取自源文件原段落，不做改写或摘要。',
  '- 目录、制作信息、寒暄、他人来信、法条或报导长引、纯案情铺陈和重复论证不进入索引。',
  '- 长篇法律、出版、党外路线和马克思主义辨析材料只取原则、方法、判断与可复用思想入口，不把同一事实链拆成过密条目。',
  '- 分类继续使用 8 个原子分类，避免新增过密分类。',
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
];

if (skipped.length) {
  noteLines.push('## 跳过的重复段落', '');
  for (const item of skipped) {
    noteLines.push(`- ${item.key} 第 ${item.paragraphNumber} 段「${item.title}」：重复于 ${item.duplicateOf}`);
  }
  noteLines.push('');
}

fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Built ${book.title}: ${records.length} records from ${candidateEntries.length} candidates; skipped ${skipped.length} duplicates.`,
);
