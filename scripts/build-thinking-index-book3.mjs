import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceDir = path.join(
  rootDir,
  '《大李敖全集6.0》分章节',
  '001.自传回忆类',
  '003.我最难忘的事和人',
);
const outputDir = path.join(rootDir, 'outputs', '003.我最难忘的事和人');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '003',
  title: '我最难忘的事和人',
  slug: 'wo-zui-nanwang-de-shi-he-ren',
  round: '提取轮',
  status: '待校对',
};

const taxonomy = [
  '写作与传播',
  '思想源流与方法',
  '教育与知识分子',
  '人格与自我',
  '传统与社会',
  '历史观与地域意识',
  '政治权力批判',
  '法律与言论自由',
  '牢狱与迫害经验',
  '人生与社会观察',
];

const entries = [
  ['写作与传播', '政治松绑不等于人心解禁', '《我最难忘的事和人》自序.txt', 3, '旧作重定,政治松绑,读者'],

  ['写作与传播', '读书的目的在下笔', '001.我最难忘的一件木雕.txt', 4, '读书,写作,工作伦理'],
  ['历史观与地域意识', '弱小民族衰亡的读书人反应', '001.我最难忘的一件木雕.txt', 7, '高山族,弱小民族,历史感'],
  ['历史观与地域意识', '木雕虽小可以喻大', '001.我最难忘的一件木雕.txt', 9, '木雕,高山族,象征'],

  ['思想源流与方法', '历史生命来自强烈对比', '002.我最难忘的一场演讲.txt', 10, '历史感,吉朋,时间对比'],
  ['历史观与地域意识', '两代陈璧君与国家牢狱', '002.我最难忘的一场演讲.txt', 14, '陈璧君,中华民国,牢狱'],

  ['历史观与地域意识', '从地质时间看分合', '003.我最难忘的一片小湖.txt', 4, '中兴湖,中国地图,地质时间'],
  ['思想源流与方法', '由湖滨提升到宇宙观', '003.我最难忘的一片小湖.txt', 6, '中兴湖,庄子,宇宙观'],
  ['人格与自我', '白鹅境界与人类自惭', '003.我最难忘的一片小湖.txt', 8, '白鹅,天人合一,境界'],

  ['法律与言论自由', '恶法铡刀下的十年', '004.我最难忘的一套条例.txt', 4, '惩治叛乱条例,恶法,政治犯'],
  ['政治权力批判', '废止恶法不等于权力失败', '004.我最难忘的一套条例.txt', 8, '惩治叛乱条例,国民党,刑法'],
  ['法律与言论自由', '四十二年后才废恶法', '004.我最难忘的一套条例.txt', 9, '立法委员,恶法,废止'],
  ['人格与自我', '恶法枷锁中的他死我活', '004.我最难忘的一套条例.txt', 16, '恶法,枷锁,水来火去'],

  ['法律与言论自由', '良心犯与国际特赦', '005.我最难忘的一个组织.txt', 4, '国际特赦,良心犯,人权'],
  ['法律与言论自由', '施暴者不能自信牢墙隔绝世界', '005.我最难忘的一个组织.txt', 11, '国际特赦,良心犯,人权'],
  ['政治权力批判', '把跟监照片和名单交给国际特赦', '005.我最难忘的一个组织.txt', 14, '泰源监狱,跟监,国际特赦'],

  ['写作与传播', '作者名字被本店替代', '006.我最难忘的一家书店.txt', 5, '开明书店,查禁,作者'],
  ['写作与传播', '流亡书店的精神中断', '006.我最难忘的一家书店.txt', 7, '开明书店,流亡,精神'],
  ['历史观与地域意识', '全中国只剩台北开明', '006.我最难忘的一家书店.txt', 9, '开明书店,上海,台北'],

  ['教育与知识分子', '学校不能满足知识境界', '007.我最难忘的一个官僚同学.txt', 6, '学校教育,知识傲慢,自由精神'],
  ['教育与知识分子', '考试匠与真实学问', '007.我最难忘的一个官僚同学.txt', 46, '考试,学问,施启扬'],
  ['政治权力批判', '这样的政府留了什么余地', '007.我最难忘的一个官僚同学.txt', 89, '政府,言论自由,法令'],
  ['教育与知识分子', '所学所用不能变成两截', '007.我最难忘的一个官僚同学.txt', 114, '知识分子,法学,良知'],
  ['政治权力批判', '高级知识分子为做官自我作践', '007.我最难忘的一个官僚同学.txt', 117, '施启扬,做官,知识分子'],
  ['法律与言论自由', '压抑言论会酿成爆发', '007.我最难忘的一个官僚同学.txt', 149, '言论自由,压抑,大学生'],

  ['思想源流与方法', '楼上历史家与楼下当事人', '008.我最难忘的一个邻居.txt', 5, '历史资料,国民党,裴存藩'],
  ['政治权力批判', '四十年如一日的一纸空白', '008.我最难忘的一个邻居.txt', 7, '立法委员,万年国会,裴存藩'],

  ['人格与自我', '生死线外的义气', '009.我最难忘的一位烈士.txt', 4, '郑南榕,义气,知识分子'],
  ['法律与言论自由', '郑南榕功绩在百分百言论自由', '009.我最难忘的一位烈士.txt', 6, '郑南榕,言论自由,台独'],
  ['思想源流与方法', '为真实理念而死', '009.我最难忘的一位烈士.txt', 7, '郑南榕,真实理念,信仰'],

  ['写作与传播', '以个案留证词述往昭来', '010.我最难忘的一个将军.txt', 3, '真相,证词,打抱不平'],
  ['写作与传播', '高压下出版真相的代价', '010.我最难忘的一个将军.txt', 10, '出版,台湾,政治风险'],
  ['写作与传播', '完整保存出版细节', '010.我最难忘的一个将军.txt', 16, '宋希濂,出版,细节'],
  ['历史观与地域意识', '鹰犬也有不同境界', '010.我最难忘的一个将军.txt', 18, '宋希濂,国家民族,鹰犬将军'],

  ['政治权力批判', '强迫老兵为口号牺牲青春', '011.我最难忘的一个老兵.txt', 6, '老兵,反攻大陆,强迫服役'],
  ['政治权力批判', '浪费子弹中的士兵反抗', '011.我最难忘的一个老兵.txt', 8, '军队,子弹,老兵'],
  ['人格与自我', '老兵的赤身归回彻悟', '011.我最难忘的一个老兵.txt', 12, '张永亭,人生彻悟,老兵'],

  ['思想源流与方法', '感念不等于成为弟子', '012.我最难忘的一位学者.txt', 5, '钱穆,师承,思想定型'],
  ['历史观与地域意识', '历史家不可感情用事', '012.我最难忘的一位学者.txt', 7, '钱穆,史学,温情敬意'],
  ['教育与知识分子', '御用关系使大儒立场尽失', '012.我最难忘的一位学者.txt', 10, '钱穆,蒋介石,曲学阿世'],
  ['人格与自我', '义利之辨到自己头上不清', '012.我最难忘的一位学者.txt', 11, '钱穆,素书楼,义利之辨'],

  ['教育与知识分子', '从迫害中逃世而领奖', '013.我最难忘的一位教授.txt', 7, '台静农,鲁迅,国家文艺奖'],
  ['教育与知识分子', '人格与学格不能靠吹捧补足', '013.我最难忘的一位教授.txt', 14, '台静农,学术,人格'],

  ['法律与言论自由', '投奔自由后因两句话入狱', '014.我最难忘的一个“反共义士”.txt', 9, '反共义士,言论,交付感化'],
  ['人格与自我', '小人物争私权也可贵', '014.我最难忘的一个“反共义士”.txt', 18, '曲军成,公道,小人物'],

  ['人格与自我', '黑暗岁月里的心理健康', '015.我最难忘的一位残障人士.txt', 4, '邱铭笙,残障,心理健康'],
  ['人格与自我', '爱情条件中的两只脚', '015.我最难忘的一位残障人士.txt', 24, '爱情,残障,条件'],
  ['思想源流与方法', '反迷信也要证据齐全', '015.我最难忘的一位残障人士.txt', 26, '反迷信,证据,脚注'],
  ['人格与自我', '强人是在精神领域胜过自己', '015.我最难忘的一位残障人士.txt', 35, '自胜者强,邱铭笙,精神'],

  ['法律与言论自由', '没有审判的九年黑牢', '016.我最难忘的一个国特.txt', 47, '乔家才,黑牢,军法'],
  ['思想源流与方法', '史料错误不能推出全盘无效', '016.我最难忘的一个国特.txt', 58, '史学方法,沈醉,史料'],
  ['思想源流与方法', '书其美不隐其恶', '016.我最难忘的一个国特.txt', 68, '章太炎,信史,史学方法'],
  ['政治权力批判', '天皇圣明臣罪当诛的愚忠', '016.我最难忘的一个国特.txt', 71, '乔家才,愚忠,蒋介石'],
  ['写作与传播', '按下不表的黑狱文献必须发表', '016.我最难忘的一个国特.txt', 98, '乔家才入狱记,文献,发表'],
  ['政治权力批判', '九字御批定现代风波亭', '016.我最难忘的一个国特.txt', 99, '蒋介石,乔家才,草菅人命'],
  ['写作与传播', '发黑暗而曝光明的文献意义', '016.我最难忘的一个国特.txt', 100, '文献证据,正义,黑暗'],
  ['人格与自我', '不向邪恶低头的人格', '016.我最难忘的一个国特.txt', 395, '乔家才,人格,邪恶'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
}

function paragraphs(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
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

function writeMarkdown(filePath, records) {
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：本书只启用少数宽口径分类，避免按人物和事件过细拆分。',
    '- 说明：标题与分类用于检索导航，description 为源文本原文段落，未做思想改写。',
    '',
  ];

  for (const category of taxonomy) {
    const items = records.filter((record) => record.category === category);
    if (!items.length) continue;
    lines.push(`## ${category}`);
    lines.push('');

    for (const record of items) {
      lines.push(`### ${record.id} ${record.title}`);
      lines.push('');
      lines.push(`- 来源：${record.source_file} P${record.source_paragraph}`);
      lines.push(`- 关键词：${record.keywords}`);
      lines.push('');
      lines.push('原文：');
      lines.push('');
      lines.push(`> ${record.description}`);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, records) {
  const categoryCounts = taxonomy
    .map((category) => [category, records.filter((record) => record.category === category).length])
    .filter(([, count]) => count > 0);

  const lines = [
    `# 《${book.title}》${book.round}说明`,
    '',
    `本轮输出 ${records.length} 条思想索引。每条索引标题用于检索，description 字段来自源文本段落，未改写为摘要。`,
    '',
    '本书以人物和事件为经纬，提取时刻意避免分类过密：只保留能独立承载思想判断、方法意识或公共议题的段落。',
    '',
    '## 分类统计',
    '',
    ...categoryCounts.map(([category, count]) => `- ${category}：${count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-提取轮.csv',
    '- 思想索引-提取轮.json',
    '- 思想索引-提取轮.md',
    '',
    '## 下一步',
    '',
    '校对轮建议优先处理：长文《官僚同学》《国特》的条目密度、引用人物原文与李敖判断之间的边界、以及重复的史学方法主题。',
  ];

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function buildRecords() {
  const cache = new Map();

  return entries.map(([category, title, sourceFile, sourceParagraph, keywords], index) => {
    if (!cache.has(sourceFile)) {
      cache.set(sourceFile, paragraphs(readSource(sourceFile)));
    }

    const sourceParagraphs = cache.get(sourceFile);
    const description = sourceParagraphs[sourceParagraph - 1];
    if (!description) {
      throw new Error(`Missing paragraph P${sourceParagraph} in ${sourceFile}`);
    }

    const fullSourcePath = path.join(sourceDir, sourceFile);
    return {
      id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
      book: book.title,
      round: book.round,
      status: book.status,
      category,
      title,
      description,
      source_file: sourceFile,
      source_paragraph: sourceParagraph,
      source_path: path.relative(rootDir, fullSourcePath).replace(/\\/g, '/'),
      keywords,
    };
  });
}

fs.mkdirSync(outputDir, { recursive: true });

const records = buildRecords();
const payload = { book, taxonomy, records };

fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), records);
writeSummary(path.join(outputDir, '提取说明.md'), records);

console.log(`Built ${records.length} records for ${book.title}.`);
