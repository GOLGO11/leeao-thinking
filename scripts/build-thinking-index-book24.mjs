import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const essayGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('003.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, essayGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('009.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '024.为自由招魂');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '024',
  title: '为自由招魂',
  slug: 'wei-ziyou-zhaohun',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《为自由招魂》22篇正文中提取可独立检索的思想段落，重点收自由民主、文警与文字检查、开玩笑/演说/流血/漫画/沉默/罢工/唱反调/敢怒敢言的自由、户警合一与警察国家、文化审检、报禁、政治迫害音乐、出版查禁和新闻控制等主题；附件资料、长篇会议纪录转录、重复例证和推广文字未机械收录。',
};

const taxonomy = [
  '写作',
  '方法',
  '知识',
  '人格',
  '文化',
  '政治',
  '法权',
];

const entries = [
  ['政治', '现代民主由社会力量推成', '001', 3, '民主,议会改革,中产阶级,工业革命'],
  ['政治', '被压迫者都会反抗倒退', '001', 15, '革命,压迫,倒退,反抗'],
  ['政治', '自由民主已成现代潮流', '001', 34, '自由民主,时代潮流,反动势力,现代'],
  ['政治', '暴力是反动统治特征', '001', 35, '暴力,迫害,反动,统治'],
  ['政治', '一党专政妨碍自由民主', '001', 36, '一党专政,自由民主,民主,反动'],
  ['法权', '秘密警察暴露法治缺席', '001', 37, '秘密警察,法治,权利,反动'],
  ['法权', '人民权利需要实际保障', '001', 38, '人民权利,法律保障,自由,民主'],
  ['法权', '集会请愿自由是民主指标', '001', 44, '集会,请愿,自由,民主'],
  ['政治', '专制害怕开放', '001', 48, '开放,专制,信心,权力'],
  ['人格', '自由民主者不陪葬专制', '001', 49, '自由民主,责任,悲剧,现代潮流'],
  ['知识', '文警是文字警察', '002', 8, '文警,文字警察,御用文人,战斗文艺'],
  ['政治', '文警会刺伤自己人', '002', 13, '文警,作家,自己人,迫害'],
  ['方法', '反共文警复制共产党手法', '002', 14, '反共,文警,共产党,方法'],
  ['人格', '奴中奴最可悲', '002', 16, '文警,奴中奴,奴才,人格'],
  ['方法', '先认清朋友再对付敌人', '002', 17, '朋友,敌人,文警,方法'],
  ['政治', '文警比武警更坏', '002', 18, '文警,武警,迫害,文化'],
  ['写作', '文稿整体相连不可任改', '002', 23, '文章,修改,结构,发表'],
  ['人格', '无处躲藏就只能斗争', '002', 26, '斗争,沉默,责任,处境'],
  ['法权', '查禁还封锁消息', '003', 8, '查禁,新闻封锁,杂志,自由'],
  ['政治', '杀人不流血靠遮掩', '003', 17, '杀人不流血,新闻封锁,张宗昌,权力'],
  ['方法', '反军阀者也会更坏', '003', 24, '军阀,反军阀,历史比较,讽刺'],
  ['人格', '开玩笑自由缓和真实', '004', 3, '开玩笑,自由,真实,紧张'],
  ['方法', '玩笑应从上位开始', '004', 10, '玩笑,上位者,紧张,安全阀'],
  ['文化', '俳优用玩笑规劝权力', '004', 18, '俳优,规劝,权力,玩笑'],
  ['政治', '民主要经得起玩笑', '004', 24, '民主,开玩笑,气质,自由'],
  ['政治', '没有玩笑就没有民主气质', '004', 25, '开玩笑,民主气质,标语,自由'],
  ['法权', '演说自由也会被阻绝', '005', 3, '演说自由,学生,阻挠,言论自由'],
  ['法权', '不流血是杀人加封锁', '006', 4, '流血的自由,新闻封锁,杀人,自由'],
  ['人格', '烈士临死也要说话', '006', 10, '烈士,临死,说话,尊严'],
  ['人格', '公开流血使死有意义', '006', 15, '流血的自由,真我,抗议,死亡'],
  ['政治', '现代统治倾向秘密消灭', '006', 16, '秘密杀人,统治者,暗杀,现代'],
  ['政治', '人质压力制造认罪秀', '006', 19, '斯大林,审判,人质,认罪'],
  ['人格', '现代殉难失去悲壮', '006', 24, '殉难,现代,悲壮,自由'],
  ['政治', '先毁信用再毁生命', '006', 25, '信用,发言权,迫害,殉难'],
  ['人格', '读书人不能只等待', '007', 3, '于志谟,读书人,行动,等待'],
  ['人格', '权力会剥夺烈士之血', '007', 7, '流血的自由,于志谟,绞刑,烈士'],
  ['文化', '等级太多不利民主', '008', 4, '漫画,民主,等级,伟人'],
  ['文化', '民主还要改变习惯', '008', 6, '民主,习惯,统治者,被统治者'],
  ['政治', '以小击大训练民主', '008', 7, '以小击大,漫画,民主,领袖'],
  ['文化', '漫画奠定民主精神', '008', 9, '漫画,讽刺,民主,平等'],
  ['人格', '不拍马屁也是自由', '009', 2, '拍马屁,沉默,自由,腹非'],
  ['法权', '沉默也会被定罪', '009', 4, '沉默,腹非,犯罪,权力'],
  ['法权', '腹非成罪更荒谬', '009', 7, '腹非,法律,荒谬,专制'],
  ['法权', '罢工自由属文明常态', '010', 3, '罢工自由,工人,文明国家,波兰'],
  ['法权', '禁罢工偏向资方', '010', 14, '罢工,劳资,资方正义,法律'],
  ['人格', '没有罢工自由不如骆马', '010', 17, '罢工自由,骆马,工人,自由'],
  ['方法', '民主需要形式性异议', '011', 5, '异议,民主,唱反调,形式'],
  ['人格', '知识分子是天然反对党', '011', 7, '知识分子,反对党,真理,人民'],
  ['方法', '制度需要反面意见', '011', 11, '制度,反面意见,制衡,方法'],
  ['人格', '一流知识分子必须唱反调', '011', 16, '知识分子,唱反调,批评,真理'],
  ['政治', '知识分子不该做回声', '011', 20, '知识分子,回声,政府,台湾'],
  ['政治', '高压下怒也不敢', '012', 10, '高压,敢怒,敢言,政府'],
  ['法权', '谏诤不是言论自由', '012', 17, '谏诤,言论自由,平等,权利'],
  ['法权', '言论自由只问对错', '012', 20, '言论自由,态度,真理,民主'],
  ['方法', '民主人民分清态度对错', '012', 21, '民主人民,态度,对错,自由'],
  ['政治', '敢怒敢言才是现代自由', '012', 22, '敢怒敢言,现代国民,自由,奴才'],
  ['法权', '发行人不当然拥有著作权', '013', 4, '著作权,发行人,文星,法律'],
  ['文化', '文星精神只争思想自由', '013', 6, '文星,思想自由,言论自由,出版自由'],
  ['写作', '传播思想是主编责任', '013', 11, '文星,思想流传,主编,责任'],
  ['知识', '野蛮自由可化为文明自由', '014', 3, '野蛮之自由,孙中山,文明自由,知识'],
  ['法权', '户口制度把自由变成控制', '014', 25, '户口法,野蛮之自由,控制,政府'],
  ['政治', '户警合一扩大党国权力', '014', 26, '户警合一,警察,国民党,权力'],
  ['政治', '户警合一通向警察国家', '014', 56, '户警合一,警察国家,民主,国民党'],
  ['人格', '仍要梦想野蛮自由', '014', 58, '野蛮之自由,梦想,警察,自由'],
  ['政治', '文化审检被当作作战', '015', 4, '文化审检,作战,思想污染,警总'],
  ['政治', '查扣升级为全面整肃', '015', 19, '严查严扣,辩驳导正,文化审检,整肃'],
  ['法权', '法律追诉变成压制工具', '015', 31, '法律追诉,毁谤,偏激刊物,压制'],
  ['政治', '文化审检显露武士刀天下', '015', 57, '文化审检,警总,武士刀,言论自由'],
  ['法权', '宪法规定不会自动成真', '016', 14, '宪法,自由,具文,权利'],
  ['政治', '人权是党外关键目标', '016', 19, '人权,党外,关键目标,政治'],
  ['人格', '没有人权一切都是假的', '016', 21, '人权,奴隶,桎梏,党外'],
  ['法权', '表现自由是第一自由', '016', 24, '表现自由,第一自由,言论自由,出版自由'],
  ['知识', '表现自由保障其他自由', '016', 25, '表现自由,意见自由,第一自由,知识'],
  ['方法', '声音出来才消灭恐怖', '016', 28, '声音,恐怖,意见自由,方法'],
  ['写作', '记录冤屈是最低标准', '016', 29, '记录,报纸,冤屈,言论自由'],
  ['法权', '先有言论才知侵害', '016', 31, '言论自由,人身自由,侵害,秘雕案'],
  ['法权', '能低吁也是言论自由', '016', 34, '民吁日报,低吁,言论自由,自由'],
  ['法权', '至少要有埋怨自由', '016', 39, '埋怨自由,言论自由,国民党,自由'],
  ['知识', '租界催生言论自由', '017', 14, '租界,言论自由,办报,革命'],
  ['知识', '帝国主义也带来言论自由', '017', 17, '帝国主义,言论自由,常识,中国'],
  ['政治', '国民党不如帝国主义自由', '017', 19, '国民党,帝国主义,办报自由,比较'],
  ['法权', '不许办报是台湾国民党发明', '017', 25, '报禁,办报,国民党,台湾'],
  ['法权', '釜底抽薪比查封更坏', '017', 26, '报禁,釜底抽薪,查封,办报'],
  ['法权', '办了再封不同于不许办', '017', 27, '报禁,自由,办报,查封'],
  ['法权', '施行细则不能压倒母法', '017', 38, '出版法,施行细则,母法,报禁'],
  ['政治', '节约用纸只是笨借口', '017', 54, '节约用纸,报禁,借口,国民党'],
  ['法权', '自由社会要公平竞争', '017', 66, '公平竞争,报业,自由社会,报禁'],
  ['政治', '谎言本身也是侮辱人民', '017', 69, '报禁,谎言,欺骗,人民'],
  ['写作', '抢书现场显出压制成本', '018', 5, '抢书,警察,印刷厂,抗议'],
  ['人格', '遭抢仍要继续走', '018', 6, '抢书,苦撑,使命,反应'],
  ['法权', '出版处分救济多是空话', '019', 3, '出版处分,救济,行政诉讼,空话'],
  ['法权', '解禁途径只是后门例外', '019', 4, '解禁,查禁,救济途径,出版自由'],
  ['人格', '一流知识分子不随国民党走', '019', 9, '知识分子,国民党,良知,血性'],
  ['人格', '作家本该有良知血性', '019', 10, '作家,良知,血性,现实'],
  ['法权', '反对查禁任何书', '019', 54, '查禁,禁书,出版自由,原则'],
  ['写作', '禁书史料要留存', '019', 55, '禁书史,史料,写作,大风雪'],
  ['人格', '背景才敢对抗警总', '019', 87, '警总,背景,反抗,作家'],
  ['法权', '查禁标准不能藏在肚皮', '019', 315, '查禁标准,警备总部,大风雪,解禁'],
  ['法权', '禁书易解禁难', '019', 316, '禁书,解禁,救济,出版自由'],
  ['政治', '左右都迫害艺术家', '020', 56, '江文也,国民党,共产党,艺术家'],
  ['政治', '政治使音乐无处可逃', '020', 58, '江文也,音乐,政治,迫害'],
  ['人格', '艺术工作者仍要冲决网罗', '020', 59, '艺术工作者,冲决网罗,政治,抉择'],
  ['文化', '作品会被政治安排成骗局', '020', 60, '侯德健,作品,政治,骗局'],
  ['写作', '查禁成本应由读者分担', '021', 2, '查禁,成本,党外周刊,读者'],
  ['法权', '预抢制最毒辣', '021', 4, '预抢制,查禁,追惩制,言论自由'],
  ['政治', '预抢比预审更阴暗', '021', 5, '预抢制,预审制,禁书,暗箭'],
  ['政治', '四不运动切断出版链', '021', 7, '四不运动,印刷,书店,出版链'],
  ['政治', '舆论消毒动员笔战', '021', 8, '舆论消毒,中央日报,同路人,笔战'],
  ['法权', '查禁命令可以先于书', '021', 9, '查禁命令,警总,查扣,出版自由'],
  ['法权', '邮检没收制造无声损失', '021', 10, '邮检,没收,邮局,损失'],
  ['知识', '民营报业缺少资源保护', '022', 19, '自立晚报,民营报业,言论自由,资源'],
  ['法权', '依法处分也会毁法', '022', 26, '自立晚报,停刊,新闻自由,民主法治'],
  ['政治', '党国借入股掌握编辑政策', '022', 29, '自立晚报,国民党,入股,编辑政策'],
  ['政治', '监军意在掌握编辑政策', '022', 32, '叶明勋,自立晚报,监军,编辑政策'],
  ['政治', '假党外也会吞掉自由平台', '022', 37, '自立晚报,假党外,国民党,自由平台'],
  ['政治', '自立之名可以失去自立', '022', 39, '自立晚报,国民党,言论自由,控制'],
];

const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((file) => file.endsWith('.txt'))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', { numeric: true }));
const sourceCache = new Map();

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function resolveSourceFile(sourceKey) {
  const file = sourceFiles.find((name) => name.startsWith(`${sourceKey}.`));
  if (!file) {
    throw new Error(`Missing source file for key: ${sourceKey}`);
  }
  return file;
}

function readSource(sourceFile) {
  if (!sourceCache.has(sourceFile)) {
    sourceCache.set(sourceFile, decoder.decode(fs.readFileSync(path.join(sourceDir, sourceFile))));
  }
  return sourceCache.get(sourceFile);
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
    '- 说明：标题为索引用浓缩标题；description 保留源文本原文段落。',
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
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeNote(filePath, records) {
  const categoryLines = taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0)
    .map((item) => `- ${item.category}：${item.count}`);

  const lines = [
    `# 《${book.title}》提取说明`,
    '',
    `- 轮次：${book.round}`,
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    `- 源目录：${book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...categoryLines,
    '',
    '## 提取原则',
    '',
    '- 标题为检索用浓缩标题。',
    '- `description` 保留源文本原文段落，由脚本按源文件段号抽取。',
    '- 本轮只收可独立检索的思想判断、方法判断、制度判断和历史解释段，不按篇目平均分配。',
    '- 附件资料、长篇会议纪录转录、重复例证、纯新闻铺垫和推广文字不单独收录。',
    '',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function buildRecords() {
  return entries.map(([category, title, sourceKey, sourceParagraph, keywords], index) => {
    if (!taxonomy.includes(category)) {
      throw new Error(`Unknown category: ${category}`);
    }

    const sourceFile = resolveSourceFile(sourceKey);
    const sourceParagraphs = paragraphs(readSource(sourceFile));
    const description = sourceParagraphs[sourceParagraph - 1];

    if (!description) {
      throw new Error(`Missing source paragraph: ${sourceFile} P${sourceParagraph}`);
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
      source_path: path.relative(rootDir, fullSourcePath).replaceAll(path.sep, '/'),
      keywords,
    };
  });
}

fs.mkdirSync(outputDir, { recursive: true });

const records = buildRecords();
if (records.length !== 116) {
  throw new Error(`Expected 116 records, got ${records.length}`);
}

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
  records,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), records);
writeNote(path.join(outputDir, '提取说明.md'), records);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
