import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const poetryGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('005.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, poetryGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('001.'));
const sourceDir = path.join(rootDir, sourceRoot, poetryGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '037.爱情的秘密');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '037',
  title: '爱情的秘密',
  slug: 'aiqing-de-mimi',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从诗序、译诗评论、情诗、政治诗和诗论短文中提取可独立检索的思想段落。长文保留完整原文段落；诗行只收能够独立承载观点的句子，避免把全书拆成诗句大全。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const entries = [
  ['写作', '伪诗人不承认真诗人', '前置词', 2, '诗人,真伪,李敖,写作'],
  ['写作', '诗内瘴来自无真情', '前置词', 3, '诗内瘴,真情,文采,诗境,写作'],
  ['写作', '诗可说情叙理救人', '前置词', 4, '诗,情,理,拯溺,写作'],
  ['情爱', '爱情摆在肚里更恳切', '001', 4, '爱情,含蓄,无言,情爱'],
  ['情爱', '爱情不可轻易告诉', '001', 5, '爱情,秘密,无言,情爱'],
  ['情爱', '爱情深处不可道名', '001', 8, '爱情,心灵感应,不可道,情爱'],
  ['方法', '灵悟一经道破会失味', '001', 9, '奥妙,灵悟,言语,方法'],
  ['写作', '诗以有韵为上', '001', 41, '译诗,韵,中文能力,写作'],
  ['写作', '生活节奏训练文字节奏', '002', 6, '节奏,文字,耳朵,写作'],
  ['方法', '闭眼体味句子才有感觉', '002', 7, '体味,节奏,阅读,方法'],
  ['方法', '看云不止看颜色', '002', 8, '观察,想象,看云,方法'],
  ['方法', '观察要进入对象', '002', 9, '观察,代入,对象,方法'],
  ['人格', '消逝者在偶然经验中返回', '002', 27, '记忆,消逝,经验,人格'],
  ['人格', '蒙难残作有特别意义', '002', 30, '蒙难,译诗,纪念,人格'],
  ['人格', '坐牢对强者不是坏事', '003', 35, '坐牢,强者,背书,人格'],
  ['写作', '中译本不应跳过关键诗', '004', 4, '翻译,海明威,遗漏,写作'],
  ['写作', '翻译坚持押韵', '004', 5, '译诗,押韵,狱中,写作'],
  ['写作', '狱中译作需要保存', '004', 6, '译诗,狱中成果,档案,写作'],
  ['写作', '文本归属要声明', '004', 7, '抄袭,声明,文本归属,写作'],
  ['写作', '意译可以调整语义', '004', 29, '意译,语义,翻译,写作'],
  ['写作', '纪念性使原译不再改', '004', 30, '纪念性,原译,修改,写作'],
  ['写作', '原题错误暴露照抄', '005', 6, '余光中,照抄,来源,写作'],
  ['写作', '翻译代替著作可疑', '005', 10, '翻译,著作,来源,写作'],
  ['写作', '反西化者也会写西化中文', '005', 41, '西化中文,译诗,余光中,写作'],
  ['写作', '译诗高下在韵脚和通顺', '005', 55, '韵脚,通顺,译诗,写作'],
  ['写作', '拙译会毁掉原诗', '005', 56, '原诗,译文,桑塔亚纳,写作'],
  ['政治', '岛是监狱狱是岛', '013', 6, '监狱,岛,政治'],
  ['政治', '湖海丈夫不做墙头草', '017', 6, '中立,墙头草,政治'],
  ['政治', '拒绝中间立场', '017', 20, '中间,中立,政治'],
  ['情爱', '爱情兼有灵肉和纯灵', '019', 13, '爱情,灵肉,柏拉图式爱情,情爱'],
  ['法权', '发禁是权力对身体的玩笑', '021', 22, '发禁,身体,教育部长,法权'],
  ['方法', '巧思不能全靠规矩', '024', 23, '规矩,巧思,读者,方法'],
  ['知识', '文人坏命令人同情', '028', 32, '徐文长,命运,文人,知识'],
  ['人格', '率真才华也会走向衰病', '028', 34, '居浩然,才华,衰病,人格'],
  ['人格', '大丈夫行事要从容', '035', 3, '从容,大丈夫,洒脱,人格'],
  ['文化', '化石保存所过之神', '036', 28, '化石,所过者化,所存者神,文化'],
  ['情爱', '真幻原一体', '015', 15, '真幻,爱情,情爱'],
  ['情爱', '裸相也有庄严', '015', 44, '裸相,庄严,情爱'],
  ['情爱', '情没有对错', '015', 83, '爱里,情,对错,情爱'],
  ['情爱', '美没有善恶', '015', 87, '爱里,美,善恶,情爱'],
  ['情爱', '情人说谎可以不说破', '015', 91, '情人,说谎,不说破,情爱'],
  ['情爱', '无情才是有情', '015', 97, '无情,有情,恋爱,情爱'],
  ['情爱', '浅情才是深情', '015', 101, '浅情,深情,恋爱,情爱'],
  ['情爱', '爱靠身体连接', '015', 108, '爱情,身体,连接,情爱'],
  ['情爱', '情书会失效', '015', 109, '情书,身体,情爱'],
  ['情爱', '高人相信拥抱', '015', 113, '拥抱,情书,情爱'],
  ['情爱', '欢乐比情更真实', '015', 134, '欢乐,情,真实,情爱'],
  ['情爱', '欢乐是创造', '015', 135, '欢乐,创造,情爱'],
  ['情爱', '爱情应在情老前断', '015', 164, '爱情,情老,断,情爱'],
  ['情爱', '短暂恋爱才能永恒', '015', 181, '恋爱,短暂,永恒,情爱'],
  ['情爱', '爱不是痛苦', '037', 2, '爱,痛苦,快乐,情爱'],
  ['情爱', '爱是纯快乐', '037', 3, '爱,纯快乐,情爱'],
  ['情爱', '会爱的人没有失落', '037', 9, '会爱,失落,情爱'],
  ['情爱', '会爱的人照样收获', '037', 13, '会爱,收获,情爱'],
  ['情爱', '爱来去有无都不苦', '037', 21, '爱,来去有无,甜蜜,情爱'],
  ['情爱', '爱的办法是暂停', '038', 3, '爱,方法,暂停,情爱'],
  ['情爱', '遥远制造空灵', '038', 5, '遥远,空灵,情爱'],
  ['情爱', '不浓制造朦胧', '038', 9, '不浓,朦胧,情爱'],
  ['情爱', '无为通向永恒', '038', 15, '无为,永恒,情爱'],
  ['情爱', '爱不是多愁善感', '039', 3, '爱,多愁善感,情爱'],
  ['情爱', '爱得浅也可以成立', '039', 5, '爱,很浅,情爱'],
  ['情爱', '爱得远也可以成立', '039', 9, '爱,很远,情爱'],
  ['情爱', '沉默也是呐喊', '039', 17, '沉默,呐喊,情爱'],
  ['人格', '夹缝里腰杆不弯', '040', 5, '夹缝,腰杆,人格'],
  ['人格', '苦中作乐看一线天', '040', 17, '苦中作乐,一线天,人格'],
  ['情爱', '月色曾需美女才有情怀', '041', 19, '月色,美女,滥情,情爱'],
  ['方法', '成熟后做快活欣赏者', '041', 20, '成熟,快活,欣赏,方法'],
  ['情爱', '占上风会毁掉关系', '042', 10, '拿破仑,女人,平等,情爱'],
  ['情爱', '为爱情放弃闪光是矮化', '043', 16, '爱情,闪光,矮化,情爱'],
  ['写作', '艺术把藏身者解放', '043', 27, '艺术,米开朗琪罗,解放,写作'],
  ['人格', '入世救苍生要实践', '045', 13, '入世,救苍生,实践,人格'],
  ['法权', '叛乱乱判照见法庭', '045', 20, '叛乱,乱判,法权'],
  ['人格', '主力战之后是殊死战', '045', 23, '主力战,殊死战,人格'],
  ['方法', '重要事业可以戒掉嗜好', '046', 10, '赌博,意志,全神贯注,方法'],
  ['人格', '珍惜仅有青翠', '047', 7, '秋天,青翠,人格'],
  ['人格', '不回首旧日光华', '047', 12, '中年,旧日光华,人格'],
  ['知识', '文法学家死而求知', '049', 2, '文法学家,求知,知识'],
  ['人格', '志士仁人不恋生而求知', '049', 26, '精神,志士仁人,求知,人格'],
  ['文化', '生死之外仍有至情至乐', '051', 78, '生死,至情至乐,华兹华斯,文化'],
  ['人格', '大人低估小孩生命力', '051', 87, '小孩,生命力,多愁善感,人格'],
  ['文化', '童稚境界可以浮现成诗', '051', 88, '童稚,诗,华兹华斯,文化'],
  ['政治', '正义幸有我辈在', '052', 18, '正义,我辈,政治'],
  ['政治', '国民党活人统治靠死人', '052', 46, '国民党,死人,统治,政治'],
  ['政治', '要打就打中国牌', '052', 62, '中国牌,政治'],
  ['人格', '我以我血荐蚩尤', '052', 66, '蚩尤,血,人格'],
  ['政治', '眼里不能只台湾', '053', 27, '台湾,视野,政治'],
  ['政治', '老K才是台独', '053', 20, '国民党,台独,政治'],
  ['写作', '以文名惊天下', '053', 12, '文名,诗人,写作'],
  ['人格', '下笔也要救人', '053', 24, '下笔,救人,人格'],
  ['政治', '国号亡时如地裂', '054', 7, '国号,亡国,政治'],
  ['政治', '后浪风光也短暂', '054', 20, '前浪,后浪,政治'],
  ['政治', '沟通可能只是皮条客', '055', 5, '国民党,沟通,政治'],
  ['法权', '审判时不语也是姿态', '057', 32, '军法审判,不语,法权'],
  ['法权', '出版法差异可被突破', '058', 3, '出版法,书籍类,新闻纸类,法权'],
  ['写作', '狱中稿件秘密外传', '058', 4, '千秋评论,狱中稿件,写作'],
  ['人格', '你抢你的我出我的', '058', 5, '封杀,不屈服,人格'],
  ['写作', '六百万字靠勤快恒久', '058', 6, '千秋评论,写作量,坚持,写作'],
  ['写作', '脱胎换骨可以改陈出新', '059', 4, '黄庭坚,脱胎换骨,写作'],
  ['写作', '以山谷之道写狱事', '059', 5, '黄庭坚,狱事,写作'],
  ['人格', '整治也能助成就', '059', 7, '警总,成就,人格'],
  ['写作', '译诗不能别扭不好好说', '060', 101, '译诗,中文,写作'],
  ['写作', '现代诗翻译难在语言关系', '060', 103, '现代诗,翻译,语言,写作'],
  ['写作', '从译文学不到节奏韵律', '060', 105, '译文,主题,意象,节奏,写作'],
  ['写作', '中文功力可降翻译困难', '060', 108, '中文功力,翻译,写作'],
  ['写作', '翻译处理要兼顾韵脚口语典故', '060', 124, '韵脚,口语,典故,翻译,写作'],
  ['文化', '神话把性爱写成文明祸根', '060', 127, '丽达与天鹅,希腊神话,文化'],
  ['文化', '神谕借禽鸟显形', '060', 128, '神谕,禽鸟,文化'],
  ['情爱', '灵仍需赖肉以存', '060', 129, '灵肉,创造,毁灭,情爱'],
  ['方法', '过多阐释是乱猜辞费', '060', 136, '阐释,诗,方法'],
  ['方法', '沧海凝神扩张心灵', '061', 7, '沧海凝神,心灵,方法'],
  ['人格', '沧海经验带来不屈', '061', 8, '沧海,寻仇,不屈,人格'],
  ['文化', '生活可成为诗句实验', '062', 11, '诗句,实验者,文化'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function sourceFileByKey(key) {
  const files = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
  const file = /^\d+$/.test(key)
    ? files.find((name) => name.startsWith(`${key}.`))
    : files.find((name) => name.includes(key));
  if (!file) {
    throw new Error(`Missing source file key: ${key}`);
  }
  return file;
}

function paragraphs(filePath) {
  const text = decoder.decode(fs.readFileSync(filePath));
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
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
  const { book: bookInfo, records } = payload;
  const lines = [
    `# 《${bookInfo.title}》思想索引：${bookInfo.round}`,
    '',
    `- 状态：${bookInfo.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：沿用 8 个原子分类；诗行只收可独立成义者，长文保留完整原文段落。',
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
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, payload) {
  const { book: bookInfo, records } = payload;
  const counts = categoryCounts(records);
  const lines = [
    `# 《${bookInfo.title}》${bookInfo.round}说明`,
    '',
    `本轮从 ${sourceBookDir} 中提取 ${records.length} 条思想索引。`,
    '',
    '## 取舍说明',
    '',
    '- 收入：爱情含蓄、灵肉关系、诗与翻译、韵律和中文功力、文学经验、狱中写作、出版突破、政治讽刺与人格判断等可独立检索的段落。',
    '- 暂不收入：纯目录、资料站署名、单纯叙事过渡、外文原诗行、只服务押韵但不能独立成义的诗句，以及重复表达。',
    '- 对《情诗十四首》等每行一段的文本，只选能单独表达思想的诗行，避免把整首诗切成碎片。',
    '- 所有 `description` 均为源文本原文段落，未改写。',
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 后续校对重点',
    '',
    '- 校对轮可重点压缩诗行型条目，确认它们是否应保留为思想索引。',
    '- “情爱”类保留为亲密关系、欲望、灵肉关系和爱情方法，不另增新分类。',
    '- 诗论与译论条目较多，校对时可合并重复的“韵律/中文功力”判断。',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const paragraphCache = new Map();
const records = entries.map(([category, title, sourceKey, sourceParagraph, keywords], index) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category: ${category}`);
  }

  const sourceFile = sourceFileByKey(sourceKey);
  const sourcePath = path.join(sourceDir, sourceFile);
  if (!paragraphCache.has(sourcePath)) {
    paragraphCache.set(sourcePath, paragraphs(sourcePath));
  }

  const sourceParagraphs = paragraphCache.get(sourcePath);
  const description = sourceParagraphs[sourceParagraph - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${sourceParagraph}: ${sourceFile}`);
  }

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
    source_path: path.relative(rootDir, sourcePath).replaceAll(path.sep, '/'),
    keywords,
  };
});

fs.mkdirSync(outputDir, { recursive: true });

const payload = {
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
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), payload);
writeSummary(path.join(outputDir, '提取说明.md'), payload);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
console.log(categoryCounts(records));
