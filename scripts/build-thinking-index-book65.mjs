import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const bookSeq = 65;
const bookTitle = '李敖书函集';
const bookSlug = 'leeao_shuhanji';
const round = '提取轮';
const status = '待校对';
const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '008.书信函件类',
  '008.李敖书函集',
);
const outputDir = path.join('outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const sourceEncoding = 'gb18030';

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'leeao-shuhanji',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《李敖书函集》的公开信、抗议函、诉讼讨论、新闻更正要求、出版查禁交涉、邻里自治与知识文化批判中提取思想索引。description 保留源文本原段落；目录、寒暄、纯案情铺陈、法条长引、他人文字和同案重复论证不进入本轮。书函体材料只取能够独立呈现李敖法权意识、写作使命、人格伦理、政治判断、知识方法、文化批判与少量性别观念的段落。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const taxonomyDescriptions = {
  法权: '围绕程序、证据、权利、司法、行政边界与媒体责任展开的思想。',
  政治: '围绕党国、威权、民主、族群、国族与现实政治结构展开的思想。',
  写作: '围绕出版、著述、文字战斗、文学标准与史料保存展开的思想。',
  人格: '围绕独立、诚信、责任、勇气、义气、羞耻与个人尊严展开的思想。',
  知识: '围绕学术、史料、考据、思想判断与知识公共性展开的思想。',
  文化: '围绕传统、风俗、宗教、语言、性别观念与社会习气展开的思想。',
  方法: '围绕行动策略、问题处理、现实判断、组织规则与办事原则展开的思想。',
  情爱: '围绕性爱、身体、女性、爱情与性别平等展开的思想。',
};

const categoryKeywords = {
  法权: ['法治', '司法', '程序', '证据', '出版法', '更正', '辩驳', '行政', '责任'],
  政治: ['党国', '威权', '解严', '国民党', '文字狱', '统独', '乡土', '政治'],
  写作: ['写作', '出版', '禁书', '史料', '文学', '笔仗', '著述', '报刊'],
  人格: ['人格', '独立', '责任', '诚信', '勇气', '尊严', '羞耻', '义气'],
  知识: ['学术', '知识', '史料', '考据', '档案', '研究', '公共性'],
  文化: ['文化', '传统', '宗教', '风俗', '语言', '身体', '观念'],
  方法: ['方法', '策略', '现实', '规则', '组织', '管理', '办事'],
  情爱: ['性爱', '裸体', '女性', '性别', '身体', '平等'],
};

const candidates = [
  ['001.跟警察头子打笔仗.txt', 55, '法权', '证据拆穿警察捏造'],
  ['001.跟警察头子打笔仗.txt', 60, '法权', '行政命令不能被架空'],
  ['001.跟警察头子打笔仗.txt', 62, '法权', '警察只应据实上报'],
  ['001.跟警察头子打笔仗.txt', 68, '法权', '旧事证不能装没事'],
  ['001.跟警察头子打笔仗.txt', 77, '法权', '双重标准更惹非议'],
  ['002.查禁《孙中山研究》的荒谬理由.txt', 6, '法权', '出版法不能任意解释'],
  ['002.查禁《孙中山研究》的荒谬理由.txt', 7, '法权', '中文不能魔术化'],
  ['003.给新闻局局长邵玉铭的公开信.txt', 3, '写作', '禁书纪录照出作者与政府'],
  ['003.给新闻局局长邵玉铭的公开信.txt', 4, '政治', '解严后重温旧梦'],
  ['003.给新闻局局长邵玉铭的公开信.txt', 14, '法权', '国父遗像罪是训政遗痕'],
  ['003.给新闻局局长邵玉铭的公开信.txt', 23, '法权', '懂法律不该故入人罪'],
  ['003.给新闻局局长邵玉铭的公开信.txt', 33, '知识', '学术自由不能被剪接'],
  ['003.给新闻局局长邵玉铭的公开信.txt', 40, '法权', '书籍处分不能断子绝孙'],
  ['003.给新闻局局长邵玉铭的公开信.txt', 42, '政治', '台北查禁制造一国两制'],
  ['003.给新闻局局长邵玉铭的公开信.txt', 43, '政治', '解严后的文人文字狱'],
  ['003.给新闻局局长邵玉铭的公开信.txt', 44, '写作', '诉愿逼出文字狱真相'],
  ['004.许水德请注意.txt', 12, '写作', '出版就是反击'],
  ['005.致《中报》傅朝枢先生.txt', 4, '法权', '检察官不正义应辞职'],
  ['005.致《中报》傅朝枢先生.txt', 12, '写作', '百本书让迫害失效'],
  ['007.再致施性忠老哥.txt', 5, '法权', '私下道歉不够'],
  ['008.三致施性忠老哥.txt', 3, '文化', '反对神道设教'],
  ['008.三致施性忠老哥.txt', 4, '写作', '书房里的战士'],
  ['009.关于“直笔”的讨论.txt', 10, '人格', '不媚世而张正义'],
  ['009.关于“直笔”的讨论.txt', 11, '知识', '爱真理甚于爱老师'],
  ['009.关于“直笔”的讨论.txt', 13, '写作', '老去也要直笔'],
  ['010.请检察官辞职.txt', 5, '人格', '不累及无辜'],
  ['010.请检察官辞职.txt', 6, '写作', '文字狱只会催生反击'],
  ['010.请检察官辞职.txt', 8, '法权', '以身试封建法律'],
  ['010.请检察官辞职.txt', 9, '法权', '司法不应给政治用'],
  ['011.从小事看认真.txt', 2, '人格', '执事敬从小事见人格'],
  ['011.从小事看认真.txt', 5, '人格', '原则面前不能签字'],
  ['011.从小事看认真.txt', 24, '法权', '章程不能绕过住户'],
  ['011.从小事看认真.txt', 27, '方法', '面对现实才有办法'],
  ['011.从小事看认真.txt', 28, '方法', '没办法中找可行办法'],
  ['011.从小事看认真.txt', 42, '人格', '管事就要负责到底'],
  ['011.从小事看认真.txt', 44, '方法', '因粮于敌的开源法'],
  ['011.从小事看认真.txt', 46, '人格', '反复无常要有交代'],
  ['012.复李声庭.txt', 4, '文化', '劣币书籍驱逐价值作品'],
  ['012.复李声庭.txt', 5, '写作', '先知先觉不能坐视浅盘'],
  ['013.复李杰四弟.txt', 5, '写作', '家族自传也可作历史样本'],
  ['014.复六叔.txt', 4, '写作', '自传先作历史著作'],
  ['014.复六叔.txt', 5, '人格', '苦难不能让它过去'],
  ['014.复六叔.txt', 6, '写作', '个人浮沉见时代变化'],
  ['014.复六叔.txt', 7, '写作', '苦难记录应存真张义'],
  ['015.致余纪忠.txt', 3, '法权', '新闻封锁不能用旧例'],
  ['015.致余纪忠.txt', 5, '法权', '平衡报道应补名誉损害'],
  ['016.迟来的澄清.txt', 6, '人格', '八年追索终得清白'],
  ['016.迟来的澄清.txt', 9, '法权', '篡改笔录罗织人罪'],
  ['016.迟来的澄清.txt', 13, '法权', '对司法仍保留部分信心'],
  ['017.《乌鸦评论》及其他.txt', 49, '写作', '清音难显仍力持原则'],
  ['018.给邻居的一封信.txt', 5, '人格', '在其位就尽责除弊'],
  ['018.给邻居的一封信.txt', 31, '人格', '小事也要认真'],
  ['020.斥台中一中校长陈继统.txt', 8, '法权', '实际居住不能警察国家化'],
  ['020.斥台中一中校长陈继统.txt', 10, '文化', '赶老教师会寒人心'],
  ['021.质问《自由时报》.txt', 4, '人格', '真理不为亲长同乡放水'],
  ['021.质问《自由时报》.txt', 7, '法权', '不实报道必须同版辩驳'],
  ['022.致台北市政府新闻处.txt', 11, '人格', '奴才荣辱与人格荣辱'],
  ['022.致台北市政府新闻处.txt', 13, '法权', '滥用新闻自由须处分'],
  ['023.致新闻评议会.txt', 5, '人格', '真理所在谁都批评'],
  ['023.致新闻评议会.txt', 6, '法权', '评议会也要受公正测验'],
  ['024.再致新闻评议会.txt', 7, '法权', '口头道歉不能代替辩驳'],
  ['024.再致新闻评议会.txt', 8, '法权', '改版蒙混不是更正'],
  ['024.再致新闻评议会.txt', 10, '法权', '同案中伤应同样处理'],
  ['025.吴树民请注意.txt', 2, '法权', '报道应平衡查证'],
  ['025.吴树民请注意.txt', 3, '写作', '出版导向思想天行有常'],
  ['025.吴树民请注意.txt', 5, '政治', '炮口朝内为免小格局'],
  ['027.寄傅在峰.txt', 3, '文化', '台湾庙宇文化糟糕'],
  ['029.又找新闻评议会的麻烦了！.txt', 8, '法权', '评议处理不能马屁势利'],
  ['030.蒋纬国不妨一看.txt', 3, '写作', '言论自由不能委屈'],
  ['030.蒋纬国不妨一看.txt', 4, '写作', '出书反击权贵党羽'],
  ['031.中央研究院史语所岂可掩护李济、许倬云！.txt', 18, '知识', '学术机关也要有礼法'],
  ['031.中央研究院史语所岂可掩护李济、许倬云！.txt', 19, '知识', '公费学术书不该只送不卖'],
  ['031.中央研究院史语所岂可掩护李济、许倬云！.txt', 32, '知识', '不知不能免责'],
  ['031.中央研究院史语所岂可掩护李济、许倬云！.txt', 34, '知识', '公共计划不能私人成书'],
  ['032.书而不展，还叫什么书展？.txt', 10, '法权', '参展单位自查自负'],
  ['032.书而不展，还叫什么书展？.txt', 11, '法权', '书展不能偷天换日'],
  ['033.休做台北落荒人，应做云南望乡鬼.txt', 8, '政治', '国民党的身份规定不值得'],
  ['035.吴敦义请勿“有屁一同”.txt', 5, '法权', '解严后更不该动书手脚'],
  ['036.天天是秋后.txt', 4, '政治', '政治冤案不平反显小局面'],
  ['036.天天是秋后.txt', 5, '写作', '个案详追留下信史'],
  ['036.天天是秋后.txt', 6, '写作', '天天是秋后'],
  ['037.答辅大女学生.txt', 17, '情爱', '裸体也要男女平等'],
  ['037.答辅大女学生.txt', 18, '文化', '平等要求被查禁制度压住'],
  ['038.答胡虚一老兄书.txt', 7, '写作', '史料稿宁繁毋略'],
  ['038.答胡虚一老兄书.txt', 9, '人格', '正人君子也会负义'],
  ['039.给叶菊兰的公开信.txt', 5, '政治', '政客背信毁诺'],
  ['039.给叶菊兰的公开信.txt', 9, '政治', '坚持郑南榕精神'],
  ['040.打官司的讨论.txt', 7, '法权', '报社应有作者规格'],
  ['040.打官司的讨论.txt', 34, '方法', '资料要亲自掌握'],
  ['040.打官司的讨论.txt', 52, '法权', '匿名投书依赖诚信原则'],
  ['040.打官司的讨论.txt', 53, '法权', '责任分担保护新闻自由'],
  ['040.打官司的讨论.txt', 61, '法权', '发行人与作者责任不同'],
  ['040.打官司的讨论.txt', 63, '方法', '办报不见当事人防请托'],
  ['040.打官司的讨论.txt', 70, '方法', '打笔仗好过打官司'],
  ['041.胡秋原诽谤李敖，被判处拘役四十天.txt', 4, '法权', '三十年报纸应公平报道'],
  ['041.胡秋原诽谤李敖，被判处拘役四十天.txt', 17, '人格', '坚忍善战三十年'],
  ['042.致郝柏村先生一封信.txt', 6, '法权', '记者会应一视同仁'],
  ['042.致郝柏村先生一封信.txt', 8, '法权', '杂志记者标准不能自打脸'],
  ['042.致郝柏村先生一封信.txt', 9, '人格', '不稀罕参与但有权质问'],
  ['043.打官司的再讨论.txt', 18, '法权', '台湾打官司多两个敌人'],
  ['043.打官司的再讨论.txt', 19, '法权', '法官不公正须记账'],
  ['043.打官司的再讨论.txt', 20, '法权', '诉讼权不应被闹场威胁'],
  ['044.讨论《北京法源寺》.txt', 18, '方法', '史实错误应立刻改正'],
  ['044.讨论《北京法源寺》.txt', 20, '写作', '李敖更是文学家'],
  ['044.讨论《北京法源寺》.txt', 21, '写作', '为中国小说立里程碑'],
  ['045.比较“鸡巴学”答美国佬.txt', 13, '知识', '俗字也要查文献'],
  ['045.比较“鸡巴学”答美国佬.txt', 14, '文化', '光复被清教徒污染的词'],
  ['046.你转载我，我转载你.txt', 12, '写作', '转载不必见外'],
  ['047.三点不露轮到李登辉了.txt', 19, '文化', '裸体文化对抗伪文化复兴'],
  ['047.三点不露轮到李登辉了.txt', 20, '知识', '环境好应惜福好学'],
  ['048.宋英、黄信介等岂可违反傅正遗愿！.txt', 14, '文化', '归骨观念无施教就无意义'],
  ['048.宋英、黄信介等岂可违反傅正遗愿！.txt', 15, '政治', '台湾也是乡土'],
  ['048.宋英、黄信介等岂可违反傅正遗愿！.txt', 18, '文化', '做客情绪软弱小气'],
  ['048.宋英、黄信介等岂可违反傅正遗愿！.txt', 19, '政治', '中国土地上无主客'],
  ['048.宋英、黄信介等岂可违反傅正遗愿！.txt', 27, '人格', '遗愿不可强奸'],
];

function readGb18030(filePath) {
  const bytes = fs.readFileSync(filePath);
  return new TextDecoder(sourceEncoding).decode(bytes);
}

function paragraphsOf(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeDescription(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function getSourceTitle(filename) {
  return filename.replace(/^\d+\./, '').replace(/\.txt$/i, '');
}

function makeId(index) {
  return `T${String(bookSeq).padStart(3, '0')}-${String(index).padStart(3, '0')}`;
}

function loadSourceParagraphs() {
  const fileMap = new Map();
  for (const filename of fs.readdirSync(sourceBookDir)) {
    if (!filename.endsWith('.txt') || filename === '000.目录.txt') continue;
    const fullPath = path.join(sourceBookDir, filename);
    fileMap.set(filename, paragraphsOf(readGb18030(fullPath)));
  }
  return fileMap;
}

function loadExistingDescriptions() {
  const masterPath = path.join('outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();

  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const existing = new Map();
  for (const item of master.items ?? []) {
    const key = normalizeDescription(item.description ?? '');
    if (key) existing.set(key, item.id);
  }
  return existing;
}

function buildItems() {
  const sourceMap = loadSourceParagraphs();
  const existingDescriptions = loadExistingDescriptions();
  const seen = new Set();
  const skipped = [];
  const items = [];

  for (const [filename, paragraphNo, category, title] of candidates) {
    const paragraphs = sourceMap.get(filename);
    if (!paragraphs) {
      skipped.push({ filename, paragraphNo, title, reason: 'source_file_missing' });
      continue;
    }

    const description = paragraphs[paragraphNo - 1];
    if (!description) {
      skipped.push({ filename, paragraphNo, title, reason: 'paragraph_missing' });
      continue;
    }

    const normalized = normalizeDescription(description);
    if (seen.has(normalized)) {
      skipped.push({ filename, paragraphNo, title, reason: 'duplicate_in_book' });
      continue;
    }
    seen.add(normalized);

    if (existingDescriptions.has(normalized)) {
      skipped.push({
        filename,
        paragraphNo,
        title,
        reason: 'duplicate_in_master',
        duplicateId: existingDescriptions.get(normalized),
      });
      continue;
    }

    items.push({
      id: makeId(items.length + 1),
      bookSeq,
      bookTitle,
      bookSlug,
      round,
      status,
      title,
      category,
      categoryDescription: taxonomyDescriptions[category],
      keywords: categoryKeywords[category],
      description,
      source: {
        collection: '大李敖全集6.0',
        bookCategory: '008.书信函件类',
        bookTitle,
        file: filename,
        fileTitle: getSourceTitle(filename),
        paragraphNo,
      },
    });
  }

  return { items, skipped };
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
    '## 条目',
    '',
  ];

  for (const record of payload.records) {
    lines.push(
      `### ${record.id}｜${record.category}｜${record.title}`,
      '',
      `- 出处：${record.source_file} / 第 ${record.source_paragraph} 段`,
      `- 关键词：${record.keywords}`,
      '',
      record.description,
      '',
    );
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function toRecord(item, index) {
  return {
    id: `LAT${String(bookSeq).padStart(3, '0')}-${String(index + 1).padStart(3, '0')}`,
    book: bookTitle,
    round,
    status,
    category: item.category,
    title: item.title,
    description: item.description,
    source_file: item.source.file,
    source_paragraph: item.source.paragraphNo,
    source_path: path.join(sourceBookDir, item.source.file).replaceAll(path.sep, '/'),
    keywords: item.keywords.join(','),
  };
}

function writeOutputs(items, skipped) {
  fs.mkdirSync(outputDir, { recursive: true });
  const records = items.map(toRecord);

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

  fs.writeFileSync(
    path.join(outputDir, '思想索引-提取轮.json'),
    `${JSON.stringify(payload, null, 2)}\n`,
    'utf8',
  );
  fs.writeFileSync(
    path.join(outputDir, '思想索引.json'),
    `${JSON.stringify(payload, null, 2)}\n`,
    'utf8',
  );
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
    '# 《李敖书函集》思想索引提取说明',
    '',
    `- 来源目录：${book.sourceDir}`,
    `- 候选条目：${candidates.length}`,
    `- 输出条目：${records.length}`,
    `- 跨书或本书重复跳过：${skipped.length}`,
    '',
    '## 提取口径',
    '',
    '- 保留公开信、抗议函、诉讼讨论、新闻更正、出版查禁、邻里自治、知识文化批判中可独立检索的思想判断。',
    '- description 字段逐条取自源文件原段落，不做改写或摘要。',
    '- 目录、寒暄、纯案情铺陈、法条长引、他人文字和同案重复论证不进入本轮。',
    '- 分类继续使用 8 个原子分类，少量性别与身体观念归入“情爱”或“文化”，不新增过密分类。',
    '',
    '## 分类统计',
    '',
    ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  if (skipped.length) {
    noteLines.push('## 跳过的重复段落', '');
    for (const item of skipped) {
      noteLines.push(`- ${item.filename} 第 ${item.paragraphNo} 段《${item.title}》：${item.reason}`);
    }
    noteLines.push('');
  }

  fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

  return { payload, records };
}

const { items, skipped } = buildItems();
const { records } = writeOutputs(items, skipped);

console.log(JSON.stringify({
  bookSeq,
  bookTitle,
  candidateCount: candidates.length,
  recordCount: records.length,
  skippedCount: skipped.length,
  outputDir,
}, null, 2));
