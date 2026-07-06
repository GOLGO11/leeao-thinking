import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 66;
const bookTitle = '李敖书启集';
const round = '提取轮';
const status = '待校对';
const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '008.书信函件类',
  '009.李敖书启集',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'leeao-shuqiji',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《李敖书启集》的勘误、公开信、司法行政质询、邻里自治函、史学讨论、媒体更正、学术鉴定与友朋书札中提取思想索引。description 保留源文本原段落；目录、制作信息、他人来信、讣文名单、纯账目铺陈和同案重复证据不进入本轮。',
};

const candidates = [
  ['001.《北京法源寺》勘误.txt', 15, '写作', '校勘来自出书后的自觉'],
  ['001.《北京法源寺》勘误.txt', 28, '写作', '历史小说的必要矛盾'],
  ['002.关于张学良心态动态的讨论.txt', 7, '知识', '口述历史贵在直说'],
  ['002.关于张学良心态动态的讨论.txt', 14, '写作', '挖掘真相是不甘缄默的责任'],
  ['002.关于张学良心态动态的讨论.txt', 16, '知识', '拘禁反应解释回护迫害者'],
  ['002.关于张学良心态动态的讨论.txt', 21, '知识', '以征候检验政治犯'],
  ['002.关于张学良心态动态的讨论.txt', 28, '政治', '臣子不可做私昵奴才'],
  ['002.关于张学良心态动态的讨论.txt', 30, '知识', '史德标准是真实与公正'],
  ['002.关于张学良心态动态的讨论.txt', 31, '知识', '国家青史人民有权知道'],
  ['002.关于张学良心态动态的讨论.txt', 33, '文化', '灵修不能逃避不义'],
  ['003.怨结金兰.txt', 26, '法权', '专款专用不能瓜分'],
  ['003.怨结金兰.txt', 27, '方法', '受托者有权斟酌轻重'],
  ['003.怨结金兰.txt', 30, '人格', '疑心防邻居不厚道'],
  ['003.怨结金兰.txt', 31, '人格', '在职一日就维护正义'],
  ['004.《北京法源寺》再勘误.txt', 26, '写作', '读者护持是著作之幸'],
  ['005.再致金兰邻居.txt', 4, '方法', '用证据逐条驳斥诬蔑'],
  ['005.再致金兰邻居.txt', 12, '人格', '小算盘不能施之于人'],
  ['005.再致金兰邻居.txt', 13, '写作', '认真答复为留下文献'],
  ['007.三致金兰邻居.txt', 18, '方法', '用证据说话'],
  ['007.三致金兰邻居.txt', 29, '法权', '私产不能越俎代庖'],
  ['008.给孙震先生一封信.txt', 3, '知识', '知识分子风骨不走乖牌'],
  ['008.给孙震先生一封信.txt', 4, '写作', '扒粪也能揭开大学黑暗'],
  ['009.卖掉汽车，改骑脚踏车了.txt', 5, '方法', '算清账面才知谁贴补'],
  ['010.致裴存藩夫人.txt', 4, '写作', '历史人物要整理史料'],
  ['011.李敖警告金兰大厦CD座邻居.txt', 3, '法权', '胁迫断水断电应负责任'],
  ['011.李敖警告金兰大厦CD座邻居.txt', 5, '法权', '私产收益须经所有人同意'],
  ['011.李敖警告金兰大厦CD座邻居.txt', 8, '法权', '有益团体不应损人犯法'],
  ['012.代胡学古复洪贵参律师函.txt', 9, '法权', '长期收费即承认权利'],
  ['012.代胡学古复洪贵参律师函.txt', 11, '法权', '合法权益不容滥函侵犯'],
  ['013.对程灏诬告案的综合陈述.txt', 10, '方法', '存款提款须分权制衡'],
  ['013.对程灏诬告案的综合陈述.txt', 11, '方法', '主任委员不碰钱'],
  ['013.对程灏诬告案的综合陈述.txt', 18, '方法', '四合一权力难以秉公'],
  ['013.对程灏诬告案的综合陈述.txt', 24, '法权', '处分财产须经住户大会'],
  ['015.所谓“移交”问题.txt', 2, '方法', '信任治理不必官僚移交'],
  ['015.所谓“移交”问题.txt', 6, '方法', '分层负责不该主任亲掌'],
  ['015.所谓“移交”问题.txt', 7, '法权', '移交必须有合法接替'],
  ['015.所谓“移交”问题.txt', 9, '方法', '权力膨胀制造移交问题'],
  ['016.金兰大厦今后问题解决方案.txt', 2, '方法', '三会书面解决问题'],
  ['016.金兰大厦今后问题解决方案.txt', 3, '方法', '科学计算堵住口实'],
  ['016.金兰大厦今后问题解决方案.txt', 7, '法权', '书面不能解决就诉诸法律'],
  ['017.黄大洲听着！.txt', 12, '法权', '地方执行不得抵触中央法规'],
  ['017.黄大洲听着！.txt', 13, '法权', '公务员不得推诿图利'],
  ['017.黄大洲听着！.txt', 14, '法权', '长官包庇也应受惩处'],
  ['018.以“地下阁楼”为例.txt', 5, '方法', '提问题不如提方案'],
  ['018.以“地下阁楼”为例.txt', 7, '方法', '不随胡搅蛮缠起舞'],
  ['019.致黄大洲.txt', 14, '人格', '解决不彻底就没完没了'],
  ['020.致释昭慧.txt', 4, '知识', '著作权也会阻滞思想流传'],
  ['020.致释昭慧.txt', 5, '写作', '从思想模式从根救起'],
  ['023.致陈又亮.txt', 4, '写作', '重要原文不宜被改'],
  ['024.致赵天仪.txt', 4, '人格', '作证说真话就赢'],
  ['024.致赵天仪.txt', 5, '写作', '作证也是历史记录'],
  ['025.致汤麟武.txt', 3, '写作', '自己的书活着时印出'],
  ['025.致汤麟武.txt', 5, '写作', '写思想大书胜过小岛文章'],
  ['026.政骚扰.txt', 11, '人格', '挺身代无辜承担文字狱'],
  ['026.政骚扰.txt', 12, '政治', '政府嫁祸法院钳制言论'],
  ['026.政骚扰.txt', 16, '法权', '法官不能违反证据法则'],
  ['027.给翟宗泉的一封信.txt', 3, '法权', '监察不能只护国库'],
  ['027.给翟宗泉的一封信.txt', 5, '法权', '司法黑资料要务实面对'],
  ['028.致《民众日报》李瑞标.txt', 12, '法权', '非法搜书终须国家赔偿'],
  ['028.致《民众日报》李瑞标.txt', 16, '政治', '叛徒路线对抗党国打压'],
  ['028.致《民众日报》李瑞标.txt', 19, '法权', '败诉官员不得捏造事实'],
  ['029.复刘峰松.txt', 4, '政治', '搞政治对至性大才得不偿失'],
  ['030.给台大校长的公开信.txt', 5, '知识', '哲学系事件要追党化教育'],
  ['030.给台大校长的公开信.txt', 6, '知识', '挡在门口更伤学术自由'],
  ['030.给台大校长的公开信.txt', 7, '知识', '大学应有请第一流人才气魄'],
  ['031.大义责王晓波.txt', 4, '人格', '旧交情挡不住对变节失望'],
  ['031.大义责王晓波.txt', 5, '法权', '解严法官仍为恶政府背书'],
  ['031.大义责王晓波.txt', 6, '写作', '出庭面对历史记录'],
  ['032.兔子腿买不买.txt', 5, '写作', '大陆出版收益不为己取'],
  ['032.兔子腿买不买.txt', 15, '法权', '出版授权要合法不冲突'],
  ['033.对何炳棣先生“认真的讨论”的讨论.txt', 9, '知识', '成文原语比转述可靠'],
  ['033.对何炳棣先生“认真的讨论”的讨论.txt', 18, '知识', '越早的回忆越可信'],
  ['033.对何炳棣先生“认真的讨论”的讨论.txt', 22, '知识', '引文须照原语'],
  ['034.从“冷淡”到“偷笑”.txt', 3, '人格', '笑也是适度垂怜'],
  ['034.从“冷淡”到“偷笑”.txt', 6, '人格', '冷淡也是法门'],
  ['035.嘱苦苓老弟.txt', 5, '写作', '苦难不写值得研究'],
  ['035.嘱苦苓老弟.txt', 6, '写作', '写大书争千秋'],
  ['036.吴丰山与鸡蛋.txt', 5, '写作', '报格可以高于血本'],
  ['036.吴丰山与鸡蛋.txt', 6, '人格', '护短卖报格就失人格'],
  ['037.致AB座邻居.txt', 5, '人格', '任劳任怨不能无限耗损'],
  ['037.致AB座邻居.txt', 6, '方法', '指点者也该分担管理'],
  ['037.致AB座邻居.txt', 15, '方法', '服务整洁先于门面工程'],
  ['037.致AB座邻居.txt', 16, '方法', '工程应先给蓝图审慎研讨'],
  ['039.为法官黄小莹执法偏颇质国民党司法院长施启扬函.txt', 10, '法权', '法官明知事实仍曲从'],
  ['039.为法官黄小莹执法偏颇质国民党司法院长施启扬函.txt', 12, '法权', '司法清明要从个案树范例'],
  ['040.致吴俊才论石永贵的嘴脸.txt', 4, '写作', '封杀经验已司空见惯'],
  ['040.致吴俊才论石永贵的嘴脸.txt', 7, '法权', '媒体诽谤后仍须更正'],
  ['041.我与邓丽君.txt', 4, '人格', '不参加婚丧喜庆是自我原则'],
  ['041.我与邓丽君.txt', 5, '法权', '不在场证明破除误报'],
  ['042.致石守谦的一封信.txt', 6, '知识', '学者不能因顾忌遮眼'],
  ['043.我与邓丽君后一章.txt', 5, '文化', '以做好事为名造假很恐怖'],
  ['043.我与邓丽君后一章.txt', 8, '政治', '台湾是埋骨之地'],
  ['044.给周荃.txt', 5, '写作', '争一时与争千秋的路线斗争'],
  ['045.质问谢长廷老弟.txt', 5, '法权', '无受害人不能否定事实'],
  ['045.质问谢长廷老弟.txt', 6, '法权', '受害人喊冤不可被视为空言'],
  ['045.质问谢长廷老弟.txt', 8, '政治', '党政不分是蒋氏旧路'],
  ['045.质问谢长廷老弟.txt', 9, '法权', '公开更正才配得上聪明'],
  ['046.致法务部调查局.txt', 10, '知识', '鉴定不能未看原件就断言'],
  ['046.致法务部调查局.txt', 11, '知识', '文献对照可破双钩说'],
  ['046.致法务部调查局.txt', 24, '法权', '指控须提出原件依据'],
  ['046.致法务部调查局.txt', 25, '知识', '胶片比对不是鉴定方法'],
  ['046.致法务部调查局.txt', 31, '知识', '事实例证可推翻怪论'],
  ['047.给林瑞图加油信.txt', 7, '人格', '勿以小毛病抹杀贡献'],
  ['048.建国党与梁肃戎.txt', 3, '政治', '战友人权受害也要批评'],
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
  return fileName.replace(/^\d+\./, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”"'.,，。！？!?:：；;、\s]+/g, '')
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

const existing = loadExistingDescriptions();
const seenCurrent = new Map();
const skipped = [];
const kept = [];

for (const [sourceFile, paragraphNumber, category, title] of candidates) {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category}`);
  }

  const paragraphs = sourceParagraphs(sourceFile);
  const description = paragraphs[paragraphNumber - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${sourceFile} P${paragraphNumber}`);
  }

  const normalized = normalizeText(description);
  if (existing.has(normalized)) {
    skipped.push({
      sourceFile,
      paragraphNumber,
      title,
      reason: 'duplicate_in_master',
      duplicateOf: existing.get(normalized),
    });
    continue;
  }
  if (seenCurrent.has(normalized)) {
    skipped.push({
      sourceFile,
      paragraphNumber,
      title,
      reason: 'duplicate_in_book',
      duplicateOf: seenCurrent.get(normalized),
    });
    continue;
  }

  kept.push({ sourceFile, paragraphNumber, category, title, description });
  seenCurrent.set(normalized, `${sourceFile} P${paragraphNumber}`);
}

const records = kept.map((item, index) => ({
  id: `LAT${String(bookSeq).padStart(3, '0')}-${String(index + 1).padStart(3, '0')}`,
  book: bookTitle,
  round,
  status,
  category: item.category,
  title: item.title,
  description: item.description,
  source_file: item.sourceFile,
  source_paragraph: item.paragraphNumber,
  source_path: path.relative(rootDir, path.join(sourceDir, item.sourceFile)).replaceAll(path.sep, '/'),
  keywords: makeKeywords(item.category, item.title, item.sourceFile),
}));

for (const record of records) {
  const paragraphs = sourceParagraphs(record.source_file);
  if (paragraphs[record.source_paragraph - 1] !== record.description) {
    throw new Error(`Description mismatch for ${record.id}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...book,
    record_count: records.length,
    candidate_count: candidates.length,
    skipped_duplicate_count: skipped.length,
  },
  taxonomy,
  records,
  skipped_duplicates: skipped,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeCsv(path.join(outputDir, '思想索引.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);

const text = records
  .map((record) => [
    `${record.id}｜${record.category}｜${record.title}`,
    `出处：《${record.book}》/${record.source_file}/第${record.source_paragraph}段`,
    record.description,
  ].join('\n'))
  .join('\n\n');
fs.writeFileSync(path.join(outputDir, '思想索引.txt'), text, 'utf8');

const noteLines = [
  '# 《李敖书启集》思想索引提取说明',
  '',
  `- 来源目录：${book.sourceDir}`,
  `- 候选条目：${candidates.length}`,
  `- 输出条目：${records.length}`,
  `- 跨书或本书重复跳过：${skipped.length}`,
  '',
  '## 提取口径',
  '',
  '- 保留勘误、公开信、司法行政质询、邻里自治、史学讨论、媒体更正、学术鉴定与友朋书札中可独立检索的思想判断。',
  '- description 字段逐条取自源文件原段落，不做改写或摘要。',
  '- 目录、制作信息、他人来信、讣文名单、纯账目铺陈和同案重复证据不进入索引。',
  '- 分类继续使用 8 个原子分类，邻里自治归入“方法/法权/人格”，媒体与司法归入“法权”，大学与史学归入“知识”。',
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
];

if (skipped.length) {
  noteLines.push('## 跳过的重复段落', '');
  for (const item of skipped) {
    noteLines.push(`- ${item.sourceFile} 第 ${item.paragraphNumber} 段《${item.title}》：${item.reason} ${item.duplicateOf ?? ''}`.trim());
  }
  noteLines.push('');
}

fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Built ${book.title}: ${records.length} records from ${candidates.length} candidates; skipped ${skipped.length} duplicates.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
