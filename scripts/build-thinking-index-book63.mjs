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
  .find((name) => name.startsWith('006.'));
const sourceDir = path.join(rootDir, sourceRoot, letterGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '063.李敖书笺集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '063',
  title: '李敖书笺集',
  slug: 'leeao-shujianji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖书笺集》的公开信、答信、法政抗议、党外路线讨论、查禁出版交涉、人物评判和隐居书札中提取思想索引。description 保留源文本原段落；目录、制作信息、寒暄、他人来信、法条长引、新闻长引和仅作案情铺陈的段落不进入本轮。长篇法律与政治材料只取能独立呈现李敖政治判断、法权意识、证据方法、人格伦理、写作使命和文化批判的段落，避免同一事实链拆得过密。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['政治', '001', 4, '支持反对政治', '反对党,多党政治,政治平衡'],
  ['方法', '001', 5, '只取大方向', '大方向,不贤者,政治判断'],
  ['法权', '002', 7, '私生卡违法', '银行法,信用卡,公众利益'],
  ['法权', '002', 8, '依法扒粪', '财阀,法律,公开信'],
  ['人格', '003', 4, '死者信用', '雷震,遗愿,公道'],
  ['法权', '004', 3, '拖延登记无据', '文星,出版登记,第三者权益'],
  ['政治', '004', 4, '主流变乱流', '文星,自由中国,反对规格'],
  ['写作', '004', 11, '清白一字不登', '媒体封杀,名誉,反击'],
  ['政治', '005', 8, '特立独行洗党外', '党外,特立独行,群众'],
  ['人格', '005', 14, '牺牲才有进步', '牺牲,苦难,抗暴'],
  ['政治', '005', 15, '洗出大是非', '党外,大是非,新气象'],
  ['政治', '006', 6, '胜利不能私吞', '党外舆论,胜利,失败'],
  ['法权', '006', 8, '借阅就是抢书', '查禁,借阅,言论钳制'],
  ['政治', '007', 5, '救济应追责', '灾变,国家赔偿,党外'],
  ['法权', '007', 12, '责任还给政府', '国家赔偿,自救,政府责任'],
  ['文化', '008', 5, '左派也要真懂', '左派,同志爱,宣传'],
  ['政治', '009', 40, '内斗内行', '兵荒马乱,内斗,国民党'],
  ['政治', '009', 47, '饿饭释兵权', '缴械,军队,国民党'],
  ['人格', '009', 50, '固执不是投机', '忠义,固执,投机'],
  ['写作', '009', 54, '笔杆补枪杆', '历史,写作,揭发'],
  ['法权', '010', 4, '作者可直接出书', '出版法,扣押,著作人'],
  ['法权', '010', 6, '国家赔偿可追责', '公权力,国家赔偿,自由'],
  ['政治', '011', 18, '政治规格混乱', '台湾,政治规格,反对派'],
  ['人格', '011', 22, '千山独行唤醒', '过客,唤醒,孤寂'],
  ['法权', '012', 5, '判决证明冤狱', '最高法院,冤狱,追索'],
  ['方法', '012', 10, '证词必须比对', '矛盾,证据,事实'],
  ['人格', '013', 13, '送炭要兑现', '承诺,帮助,受难'],
  ['法权', '014', 12, '遗漏必须追究', '并办,法院,程序'],
  ['法权', '015', 7, '发行人不能暂停', '出版法,发行人,诽谤'],
  ['人格', '016', 10, '顽劣不可扑杀', '顽劣,迫害,问题'],
  ['政治', '016', 11, '先判真凶', '江南案,国民党,先知'],
  ['政治', '016', 13, '阻塞别人为善', '国民党,阻塞,悲剧'],
  ['文化', '017', 12, '裸照反对假道学', '裸体,审查,双重标准'],
  ['人格', '018', 6, '赠书还义债', '读者,信用,义债'],
  ['法权', '018', 10, '邮检秘密毁书', '邮检,查禁,宣传'],
  ['方法', '019', 57, '无事证不能硬说', '事证,诽谤,司法'],
  ['方法', '020', 5, '回忆互证真相', '江南案,证据,互证'],
  ['法权', '020', 7, '人权不护遁词', '律师原则,人权,正义'],
  ['政治', '020', 8, '牺牲品在国民党', '江南案,牺牲品,国民党'],
  ['人格', '021', 6, '正义要挺身', '正义,忠厚,面对'],
  ['政治', '021', 11, '不谴责就是默认', '公德,政客,道德标准'],
  ['法权', '022', 3, '搜索伏笔', '查禁,搜索,书报摊'],
  ['人格', '022', 4, '卖房抗战', '独行侠,长期抗战,出版'],
  ['方法', '022', 6, '斗争要务实', '查扣,损害赔偿,出版'],
  ['写作', '022', 8, '海外也能反击', '专栏,海外,文宣'],
  ['人格', '022', 10, '不合作高于才华', '人格,合作,国民党'],
  ['法权', '023', 5, '公开争探亲权', '探亲,人权,公开声明'],
  ['政治', '023', 10, '身份证成废纸', '身份证,国籍,吃软怕硬'],
  ['政治', '024', 6, '劣币驱逐良币', '党外,劣币,政治斗争'],
  ['政治', '024', 8, '拒绝假团结', '徐锡麟,假团结,革命'],
  ['政治', '024', 18, '抛弃假团结', '光复会,真革命,团结'],
  ['人格', '024', 20, '自己去做良币', '良币,志士仁人,负责'],
  ['法权', '025', 5, '诬谤就去告', '自立晚报,更正,诉讼'],
  ['人格', '025', 6, '大义先站稳', '大义灭亲,伪君子,人格'],
  ['政治', '025', 9, '批评须问资格', '党外前辈,忠厚,资格'],
  ['政治', '026', 17, '好事做得太迟', '国民党,做好事,历史'],
  ['法权', '027', 10, '扣押要明白条款', '出版法,行政处分,扣押'],
  ['法权', '027', 11, '滥权应赔偿', '国家赔偿,公务员,发行权利'],
  ['法权', '028', 10, '小事也要问责', '平民生活,铁路,问责'],
  ['法权', '029', 21, '选择执法难服众', '违建,选择执法,公平'],
  ['法权', '029', 25, '执法须公开公正', '违建,特权,标准'],
  ['法权', '030', 11, '租界留下自由', '出版自由,租界,查禁'],
  ['方法', '030', 12, '人权从实例做起', '人权,实例,演说'],
  ['写作', '031', 7, '一灯燃百灯', '无尽灯,千秋评论,使命'],
  ['写作', '031', 9, '继续出就是反击', '查禁,地下文学,反击'],
  ['文化', '031', 10, '拆穿假历史', '孙蒋秘史,假历史,文化批判'],
  ['写作', '032', 15, '冤狱沉默', '新闻,冤狱,正义'],
  ['人格', '033', 17, '解纷不取钱', '鲁仲连,解纷,谢礼'],
  ['人格', '033', 21, '功劳归奔走者', '林永智,债务,感谢'],
  ['政治', '034', 23, '功过一起看', '雷震,自由中国,公私'],
  ['人格', '034', 24, '政治人物不可交', '政治人物,无情,权势'],
  ['文化', '034', 28, '真三毛有精髓', '三毛,悲悯,讽世'],
  ['文化', '034', 34, '假三毛无良心', '三毛,难民,良心'],
  ['人格', '035', 5, '好恶都要知道', '知人论事,是非,作风'],
  ['法权', '035', 6, '公产不能市恩', '公产,私恩,雷震'],
  ['方法', '035', 7, '想不等于做', '关切,事实,行动'],
  ['法权', '036', 21, '便民不能官僚', '抵押权,涂销,便民'],
  ['法权', '036', 34, '二十年也要依法', '土地登记,公务员,法律'],
  ['方法', '036', 41, '来硬才会办', '公务员,交涉,执行'],
  ['政治', '037', 4, '党外像牙签国民党', '党外,国民党,批评'],
  ['人格', '037', 5, '毁誉都不足介怀', '特立独行,毁誉,自我'],
  ['人格', '038', 4, '耻与虚张为伍', '独来独往,洁身,名义'],
  ['政治', '038', 15, '招牌下盗名利', '党外,公政会,尊严'],
  ['人格', '039', 6, '隐居也要做成', '战斗性隐居,戒烟,决心'],
  ['人格', '039', 12, '势孤才能中立', '孤立,独立,世俗'],
  ['人格', '039', 13, '绝对不怕孤立', '独立思想,党派,自负责任'],
  ['人格', '042', 9, '朋友失败是成功', '隐居,朋友,成功'],
  ['人格', '042', 13, '藏头不是鸵鸟', '神龙,隐居,自我'],
  ['人格', '043', 13, '无言也是抗议', '迫害,沉默,抗议'],
  ['文化', '043', 21, '谋生仍受政治压', '知识分子,卖面,政治气候'],
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
    if (record.id?.startsWith('LAT063-')) continue;
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
  id: `LAT063-${String(index + 1).padStart(3, '0')}`,
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
  '# 《李敖书笺集》思想索引提取说明',
  '',
  `- 来源目录：${book.sourceDir}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 输出条目：${records.length}`,
  `- 跨书或本书重复跳过：${skipped.length}`,
  '',
  '## 提取口径',
  '',
  '- 保留公开信、答信、法政抗议、党外路线讨论、出版查禁交涉、人物评判、隐居书札中可独立检索的思想判断。',
  '- description 字段逐条取自源文件原段落，不做改写或摘要。',
  '- 他人来信、目录、制作信息、寒暄、法条长引、新闻长引和纯案情铺陈不进入索引。',
  '- 长篇法律、出版和政治材料只取原则、方法、判断与可复用思想入口，不把同一事实链拆成过密条目。',
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
