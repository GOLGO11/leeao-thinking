import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 69;
const bookTitle = '李敖写的信';
const round = '提取轮';
const status = '待校对';
const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '008.书信函件类',
  '012.李敖写的信',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'leeao-xie-de-xin',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《李敖写的信》的公开信、私人函札、出版争议、学术批评、文化基金建议、反禁书与反全体主义书信中提取思想索引。description 保留源文本原段落；纯问候、借钱收款、诗句玩笑、附录他人来信、缺页说明和过窄私人情境不进入本轮。',
};

const candidates = [
  ['005.碧潭归隐答CS.txt', 6, '人格', '归隐使人独立生活'],
  ['005.碧潭归隐答CS.txt', 8, '方法', '单调生活也能获得幸福'],
  ['005.碧潭归隐答CS.txt', 11, '人格', '各人自有生活方法'],
  ['005.碧潭归隐答CS.txt', 15, '方法', '军中可磨炼自处之道'],
  ['006.给胡适的一封信.txt', 5, '知识', '目录工作不必假谦虚'],
  ['006.给胡适的一封信.txt', 8, '写作', '编年呈现思想演变'],
  ['006.给胡适的一封信.txt', 16, '写作', '全集编收应以年月为主'],
  ['006.给胡适的一封信.txt', 17, '知识', '版本校订要详列根据'],
  ['006.给胡适的一封信.txt', 25, '写作', '有问题文章不必忌讳'],
  ['006.给胡适的一封信.txt', 29, '方法', '编年之外还要索引'],
  ['006.给胡适的一封信.txt', 42, '人格', '不瞎捧也不乱骂'],
  ['006.给胡适的一封信.txt', 45, '文化', '追问真正的灯儿'],
  ['008.对国家长期发展科学委员会的一个批评.txt', 4, '法权', '专任薪水制度不能脱节'],
  ['008.对国家长期发展科学委员会的一个批评.txt', 6, '法权', '制度漏洞讽刺专任'],
  ['009.回YS.txt', 7, '文化', '新朴学背离胡适活路'],
  ['009.回YS.txt', 9, '方法', '用统计比例修正概括论断'],
  ['009.回YS.txt', 10, '文化', '社会已被西方文明实质改变'],
  ['009.回YS.txt', 12, '文化', '东方文明瓦解是趋势'],
  ['009.回YS.txt', 13, '文化', '院字号人物只是小蠹虫'],
  ['009.回YS.txt', 15, '人格', '知道自己回不去故纸堆'],
  ['009.回YS.txt', 20, '方法', '开门打鬼两路并行'],
  ['011.胡适之死答尚义.txt', 4, '方法', '以纪念工作代替哭悼'],
  ['017.讣贴改革致张绍文.txt', 5, '写作', '新时代要用活文字'],
  ['018.斥佞佛参禅.txt', 4, '文化', '佞佛是思想不成熟'],
  ['018.斥佞佛参禅.txt', 5, '人格', '青年朋友应该成熟'],
  ['020.论做保致彦年夫妇.txt', 5, '法权', '人保制度反映互不信任'],
  ['020.论做保致彦年夫妇.txt', 8, '法权', '保证人是时代小问题'],
  ['021.致李声庭论石达开诗是伪作.txt', 5, '知识', '引用史料须辨伪'],
  ['021.致李声庭论石达开诗是伪作.txt', 7, '知识', '考证要指出伪作真凶'],
  ['021.致李声庭论石达开诗是伪作.txt', 9, '知识', '疑案定案后不宜再误引'],
  ['022.给傅乐成的两封信.txt', 12, '政治', '舆论可推动研究所扶正'],
  ['022.给傅乐成的两封信.txt', 14, '人格', '感谢黑暗中持蜡烛者'],
  ['023.给孙陵信论《大风雪》解禁.txt', 4, '法权', '反对查禁任何书'],
  ['023.给孙陵信论《大风雪》解禁.txt', 5, '写作', '禁书奋斗史是好材料'],
  ['023.给孙陵信论《大风雪》解禁.txt', 13, '文化', '迷信与养女问题仍未进步'],
  ['024.给尚勤信中的几段.txt', 6, '法权', '佩服争取出版自由'],
  ['024.给尚勤信中的几段.txt', 7, '写作', '三十年代文人浮词藻语'],
  ['024.给尚勤信中的几段.txt', 9, '法权', '书可流通就该可出口'],
  ['024.给尚勤信中的几段.txt', 10, '法权', '大学禁演压制言论'],
  ['024.给尚勤信中的几段.txt', 11, '政治', '知识分子可倡不合作主义'],
  ['024.给尚勤信中的几段.txt', 12, '人格', '青年热心而胆怯'],
  ['024.给尚勤信中的几段.txt', 13, '政治', '不盲动是一种进步'],
  ['025.回孙陵信论《大风雪》解禁.txt', 4, '写作', '解禁要留下历史记录'],
  ['027.收“毒品”谢东方望.txt', 4, '文化', '以道德禁烟是伪善'],
  ['027.收“毒品”谢东方望.txt', 7, '方法', '香烟疏导玩火本能'],
  ['027.收“毒品”谢东方望.txt', 8, '文化', '文明社会需要疏导工具'],
  ['029.论好人做事致牛若望副主教.txt', 4, '人格', '有清望还肯做好事最难'],
  ['029.论好人做事致牛若望副主教.txt', 6, '人格', '恶势力常打击好人做事'],
  ['029.论好人做事致牛若望副主教.txt', 7, '方法', '退缩会坐实谣诼'],
  ['033.论写序答黛郎.txt', 3, '写作', '未研究不敢妄写序'],
  ['035.为邮局非法查扣“李敖通知”致这份通知副本收件人的信.txt', 4, '法权', '邮局查扣文件难以追证'],
  ['035.为邮局非法查扣“李敖通知”致这份通知副本收件人的信.txt', 5, '人格', '别人无信用自己不可无信用'],
  ['037.莫德惠劝进袁世凯做皇帝及其他.txt', 5, '法权', '停刊处分可因登记完成解除'],
  ['037.莫德惠劝进袁世凯做皇帝及其他.txt', 8, '法权', '公务员违法侵权应赔偿'],
  ['037.莫德惠劝进袁世凯做皇帝及其他.txt', 10, '法权', '以出版法压自由属违宪'],
  ['037.莫德惠劝进袁世凯做皇帝及其他.txt', 13, '写作', '抗争至少留下历史记录'],
  ['037.莫德惠劝进袁世凯做皇帝及其他.txt', 15, '政治', '改办杂志可延续抵抗'],
  ['037.莫德惠劝进袁世凯做皇帝及其他.txt', 16, '知识', '历史疑义要查原书'],
  ['038.复监察院黄宝实委员.txt', 5, '政治', '监察者应嫉恶如仇'],
  ['039.搜罗侦探小说等寄陈绍鹏.txt', 11, '写作', '教育界小说不易写'],
  ['039.搜罗侦探小说等寄陈绍鹏.txt', 14, '写作', '写作计划要成套'],
  ['040.论留学生立场复金戴熹.txt', 10, '政治', '留学生面对救国建国问题'],
  ['040.论留学生立场复金戴熹.txt', 11, '政治', '国外知识分子贡献不能只限学术'],
  ['040.论留学生立场复金戴熹.txt', 12, '文化', '海外学人容易隔膜自信'],
  ['040.论留学生立场复金戴熹.txt', 15, '文化', '海外杂志要有泥土气'],
  ['051.致黎东方.txt', 6, '政治', '文星改组是党化接棒'],
  ['053.致新竹清华园里的傻科学家.txt', 4, '文化', '科学推进也有中国本位'],
  ['047.知识人怎样影响群众？.txt', 5, '写作', '知识人遣词技巧太差'],
  ['047.知识人怎样影响群众？.txt', 6, '写作', '影响群众先要写好文章'],
  ['047.知识人怎样影响群众？.txt', 7, '方法', '表达方式要抓住群众'],
  ['048.致王崇五论反以暴易暴.txt', 4, '政治', '以暴易暴代价太大'],
  ['048.致王崇五论反以暴易暴.txt', 16, '政治', '解救也可能害死浑沌'],
  ['048.致王崇五论反以暴易暴.txt', 19, '政治', '斩尽杀绝没有太平'],
  ['049.给M（彭明敏）之一.txt', 5, '政治', '意识形态译名更妥'],
  ['049.给M（彭明敏）之一.txt', 8, '政治', '独裁会神圣化党魁'],
  ['049.给M（彭明敏）之一.txt', 12, '政治', '自由人必须阻止全体主义'],
  ['049.给M（彭明敏）之一.txt', 14, '政治', '文人宜多做理论建树'],
  ['050.给M（彭明敏）之二.txt', 15, '政治', '国家观念演变趋向进步'],
  ['050.给M（彭明敏）之二.txt', 16, '写作', '第一流文人不再做鹰犬'],
  ['054.论文化基金寄汤元吉.txt', 4, '方法', '文化基金先定方向'],
  ['054.论文化基金寄汤元吉.txt', 12, '文化', '奖金方式会流变为分赃'],
  ['054.论文化基金寄汤元吉.txt', 14, '文化', '良法美意会被学术代理商包办'],
  ['054.论文化基金寄汤元吉.txt', 15, '文化', '私人基金应拔尖不普渡'],
  ['054.论文化基金寄汤元吉.txt', 16, '文化', '学术奖金应精缩拔尖'],
  ['054.论文化基金寄汤元吉.txt', 17, '文化', '讲座要重金精选'],
  ['054.论文化基金寄汤元吉.txt', 18, '文化', '唯精才能避免学术垄断'],
  ['054.论文化基金寄汤元吉.txt', 19, '文化', '基金会应走出版办学长路'],
  ['055.给彦增老友.txt', 4, '人格', '现实会压垮轻诺'],
  ['056.治病问题答唯英.txt', 5, '法权', '医疗救助应进入制度'],
  ['056.治病问题答唯英.txt', 7, '写作', '写胡适评传受资料限制'],
  ['057.致沈剑虹.txt', 5, '政治', '公开信签名重复不负责任'],
  ['057.致沈剑虹.txt', 6, '政治', '对外传播前应修正错误'],
  ['059.致左舜生的信.txt', 4, '政治', '群老当道也要听青年之声'],
];

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
}

function paragraphsOf(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeText(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function sourceParagraphs(fileName) {
  return paragraphsOf(readSource(fileName));
}

function fileTitle(fileName) {
  return fileName.replace(/^《[^》]+》/u, bookTitle).replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"'.,，。！？、?:：；;\s]+/g, '')
    .slice(0, 18);
}

function makeKeywords(category, title, sourceFile) {
  return [...new Set([category, cleanKeyword(title), cleanKeyword(fileTitle(sourceFile))].filter(Boolean))].join(',');
}

function loadExistingDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();

  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const seen = new Map();
  for (const record of master.records ?? []) {
    const normalized = normalizeText(record.description);
    if (normalized) seen.set(normalized, record.id);
  }
  return seen;
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

const existingDescriptions = loadExistingDescriptions();
const seenInBook = new Map();
const skippedDuplicates = [];
let nextRecordNumber = 1;

const records = candidates.flatMap(([sourceFile, paragraphNumber, category, title]) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${sourceFile}:${paragraphNumber}`);
  }

  const paragraphs = sourceParagraphs(sourceFile);
  const description = paragraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
  }

  const normalized = normalizeText(description);
  const existingId = existingDescriptions.get(normalized);
  const inBookId = seenInBook.get(normalized);
  if (existingId || inBookId) {
    skippedDuplicates.push({
      sourceFile,
      paragraphNumber,
      title,
      duplicateOf: existingId ?? inBookId,
    });
    return [];
  }

  const id = `LAT${String(bookSeq).padStart(3, '0')}-${String(nextRecordNumber).padStart(3, '0')}`;
  nextRecordNumber += 1;
  seenInBook.set(normalized, id);

  return [
    {
      id,
      book: bookTitle,
      round,
      status,
      category,
      title,
      description,
      source_file: sourceFile,
      source_paragraph: paragraphNumber,
      source_path: path.join(sourceBookDir, sourceFile).replaceAll(path.sep, '/'),
      keywords: makeKeywords(category, title, sourceFile),
    },
  ];
});

const outputBook = {
  ...book,
  record_count: records.length,
  candidate_count: candidates.length,
  skipped_duplicate_count: skippedDuplicates.length,
  category_counts: categoryCounts(records),
};

const payload = {
  generated_at: new Date().toISOString(),
  book: outputBook,
  taxonomy,
  records,
  skipped_duplicates: skippedDuplicates,
};

fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);

const markdown = [
  `# ${bookTitle}思想索引（提取轮）`,
  '',
  `- 书名：${bookTitle}`,
  `- 轮次：${round}`,
  `- 状态：${status}`,
  `- 条目数：${records.length}`,
  `- 候选数：${candidates.length}`,
  `- 跳过重复：${skippedDuplicates.length}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 索引',
  '',
  ...records.map((record) =>
    [
      `### ${record.id} ${record.title}`,
      '',
      `- 分类：${record.category}`,
      `- 来源：${record.source_file}#${record.source_paragraph}`,
      '',
      record.description,
      '',
    ].join('\n'),
  ),
].join('\n');

fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.md'), markdown, 'utf8');
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
  `# ${bookTitle}提取说明`,
  '',
  `本轮从源目录 \`${sourceBookDir.replaceAll(path.sep, '/')}\` 提取。`,
  '',
  '取舍原则：',
  '',
  '- 保留书信中可独立检索的出版自由、言论法权、文化批判、知识方法、写作方法、政治判断、人格自持和文化基金设想等原文段落。',
  '- 删除纯问候、借钱收款、诗句玩笑、附录他人来信、缺页说明和需要大量上下文才能成立的私人琐事。',
  '- 标题可浓缩，description 保留源文本原段落，不改写。',
  '',
  '分类说明：',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  `候选 ${candidates.length} 条，生成 ${records.length} 条，跳过重复 ${skippedDuplicates.length} 条。`,
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, '提取说明.md'), note, 'utf8');

console.log(`Built ${bookTitle}: ${records.length} records.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
if (skippedDuplicates.length) {
  console.log(`Skipped duplicates: ${skippedDuplicates.length}`);
}
