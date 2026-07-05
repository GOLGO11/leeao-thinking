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
  .find((name) => name.startsWith('002.'));
const sourceDir = path.join(rootDir, sourceRoot, letterGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '059.李敖书信集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '059',
  title: '李敖书信集',
  slug: 'leeao-shuxinji',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《李敖书信集》的自序、公开信、家书和存札中提取思想索引。description 保留源文本原段落；目录、制作信息、单纯问候、纯私人纠纷细节、外部大段引文和缺少独立判断的材料不进入本轮。书信中的法律攻防、言论审查、写作谋生、知识分子品格、党外政治、反封建和文化传播等段落，按主旨归入原子分类。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const candidateEntries = [
  ['人格', '000', 3, '异端气概', '自序,独立,异端'],
  ['人格', '000', 4, '公开存诚', '书信,坦然,真诚'],
  ['人格', '001', 7, '真相不避', '真相,批评,得罪'],
  ['人格', '001', 12, '批评一贯', '坦白,朋友,批评'],
  ['写作', '002', 13, '失业写书', '失业,写书,查禁'],
  ['法权', '003', 4, '恶法才吏', '训导,恶法,制度'],
  ['人格', '003', 8, '才吏自扰', '清官,道德,悲剧'],
  ['人格', '003', 9, '正直灰心', '才吏,正直,灰心'],
  ['人格', '004', 10, '拒绝委曲', '英雄,激烈,委曲'],
  ['法权', '004', 12, '狱中回忆', '坐牢,人权史,狱政史'],
  ['知识', '004', 13, '知彼公开', '党史,知己知彼,公开度'],
  ['人格', '004', 22, '思想警察', '思想警察,围剿,卖国'],
  ['政治', '005', 4, '不准出境', '出境,自由,铁幕'],
  ['人格', '005', 7, '拒绝统制', '作家,文协,傲骨'],
  ['方法', '005', 17, '想清写简', '思想方法,写作,简单'],
  ['法权', '006', 7, '衙门失职', '护照,公务员,失职'],
  ['法权', '006', 9, '国家赔偿', '自由,权利,宪法'],
  ['法权', '006', 14, '公文依据', '护照,公文书,依法'],
  ['法权', '006', 16, '管闲扰民', '外交部,户政,扰民'],
  ['法权', '006', 22, '婚姻形式', '民法,婚姻,形式要件'],
  ['法权', '006', 29, '承认理论', '国际法,承认,事实'],
  ['法权', '006', 30, '法律承认', '法律承认,事实承认,外交'],
  ['法权', '006', 32, '倒果为因', '外交,法律承认,荒唐'],
  ['法权', '011', 6, '自由气度', '言论自由,批评,封杀'],
  ['政治', '011', 7, '公器责任', '杂志,公器,立场'],
  ['政治', '011', 8, '庙堂不屑', '选举,无政府主义,党外'],
  ['写作', '012', 8, '摆脱俗务', '写作,时间,俗务'],
  ['人格', '013', 3, '清议在手', '坐牢,公论,历史'],
  ['政治', '013', 4, '老人政权', '斗争,敌人,政权'],
  ['法权', '014', 13, '酷吏断刑', '司法,酷吏,用刑'],
  ['法权', '014', 17, '判刑条件', '司法公正,狱政,假释'],
  ['法权', '014', 18, '不可乱刑', '狱政,法官,刑罚'],
  ['方法', '015', 6, '闭关读思', '隐居,阅读,讨论'],
  ['方法', '015', 10, '时间自由', '应酬,研究,外交'],
  ['方法', '015', 11, '有效支出', '应酬,效率,使命'],
  ['写作', '015', 13, '隐而不退', '写作,独力研究,闭关'],
  ['人格', '017', 3, '受难活法', '受难,目标,苦中作乐'],
  ['人格', '017', 5, '真理献身', '真理,男子汉,献身'],
  ['人格', '018', 4, '一身傲骨', '自大,傲骨,千秋'],
  ['写作', '018', 6, '苦难见证', '回忆录,写作,战斗'],
  ['知识', '019', 8, '岛上大儒', '知识分子,台湾,大儒'],
  ['文化', '019', 12, '大陆知识', '大陆型,知识分子,台湾'],
  ['人格', '020', 8, '自卫求真', '自卫,求真,理想主义'],
  ['方法', '020', 9, '成品检验', '朋友,成品,千秋大业'],
  ['方法', '021', 25, '骂得有力', '批评,事实,威力'],
  ['法权', '021', 29, '封锁成本', '查禁,抢书,制作'],
  ['人格', '021', 35, '大度沉默', '朋友,沉默,曲学阿世'],
  ['知识', '021', 37, '带路责任', '知识分子,群众,信仰'],
  ['知识', '022', 6, '没人讲话', '知识分子,受难,事实'],
  ['知识', '022', 7, '明哲保身', '知识分子,品格,国民党'],
  ['人格', '022', 8, '伟大要件', '事实,道义,说谎'],
  ['人格', '022', 9, '冷暖了然', '受难,援手,感念'],
  ['知识', '023', 8, '信仰献身', '知识分子,群众,迷信'],
  ['人格', '023', 9, '敌友情绪', '敌人,朋友,嫉妒'],
  ['人格', '023', 10, '是非分明', '伪君子,敌人,品质'],
  ['人格', '023', 11, '拒绝中立', '中立主义,软弱,选择'],
  ['人格', '023', 12, '训练敌友', '朋友,敌人,光明磊落'],
  ['人格', '025', 8, '不信国民党', '正派士绅,国民党,原则'],
  ['人格', '025', 10, '古典朋友', '友情,传统人格,忠心'],
  ['政治', '026', 4, '各造山头', '党外,山头,联合'],
  ['写作', '026', 5, '努力敬业', '写作,后进,敬业'],
  ['人格', '027', 5, '青年正义', '新生代,正义感,圆滑'],
  ['政治', '027', 17, '堂堂大道', '新生代,党外,拥康'],
  ['方法', '027', 22, '明智一择', '选择,新生代,试验'],
  ['人格', '028', 5, '不凭势力', '青年,势力,气魄'],
  ['方法', '028', 6, '不说混话', '杂志,水平,言论'],
  ['政治', '029', 11, '小偷政治', '国民党,选举,革命史'],
  ['政治', '029', 12, '偷风坦荡', '禁书,党外,大盗'],
  ['写作', '029', 17, '隐居影响', '隐居,写作,目标'],
  ['写作', '030', 10, '遥控群众', '时间,群众,隐居'],
  ['法权', '030', 20, '文网恢恢', '查禁,出版,文网'],
  ['政治', '031', 14, '检定人物', '人物评价,是非,党外'],
  ['政治', '031', 15, '大方向', '政治反对者,原则,枝节'],
  ['政治', '031', 16, '分清轻重', '战士,双重标准,枝节'],
  ['政治', '031', 24, '领袖先战', '党外,战士,领袖'],
  ['人格', '033', 4, '强者不丧志', '失败,强者,落选'],
  ['人格', '033', 19, '失败磨刀', '失败,大丈夫,气概'],
  ['政治', '034', 4, '伟人被妒', '丘吉尔,失败,伟人'],
  ['人格', '034', 13, '老虎玫瑰', '阳刚,阴柔,战斗'],
  ['人格', '035', 9, '失败韧性', '失败,战斗,好人'],
  ['政治', '035', 11, '干净选举', '贿选,选举,国民党'],
  ['政治', '035', 17, '买票伪装', '贿选,国民党,候选人'],
  ['政治', '035', 30, '诚实无耻', '黑吃黑,选票,民主'],
  ['政治', '035', 31, '拿钱改投', '黑吃黑,贿选,选民'],
  ['法权', '036', 3, '人权算份', '人权,国民党,营救'],
  ['方法', '036', 4, '个案详追', '司法黑暗,个案,调查'],
  ['方法', '037', 8, '事实成立', '求证,评论,事实'],
  ['政治', '037', 11, '党外原则', '党外,原则,万年国会'],
  ['法权', '037', 13, '终身委员', '宪法,万年国会,非法'],
  ['政治', '037', 16, '地方当然', '党外,地方选举,协调'],
  ['人格', '037', 17, '公开争义', '朋友,大义,公开'],
  ['写作', '038', 4, '为文有效', '写作,监所,历史纪录'],
  ['法权', '039', 11, '冤狱反击', '冤狱,法官,公道'],
  ['政治', '039', 12, '报纸斗臭', '报纸,垄断,良心'],
  ['政治', '039', 14, '被迫势力', '反政府,司法,批评'],
  ['法权', '039', 15, '新闻司法倒车', '新闻界,司法界,倒车'],
  ['政治', '039', 17, '留下罪证', '历史纪录,政敌,国民党'],
  ['法权', '040', 3, '帽子免疫', '查禁,罪名,言论'],
  ['政治', '040', 4, '民心士气', '国民党,民心,士气'],
  ['人格', '040', 5, '直接谈判', '敌人,沟通,谈判'],
  ['人格', '040', 7, '够朋友', '党外,朋友,敌人'],
  ['方法', '041', 4, '事实再论', '事实,论断,求证'],
  ['政治', '041', 6, '统一战线', '统一战线,盟友,敌人'],
  ['政治', '041', 8, '不可靠友人', '左右逢源,敌人,党外'],
  ['法权', '042', 18, '合法恩怨', '人权,敌人,法律'],
  ['法权', '043', 35, '法人监督', '财团法人,监督,民法'],
  ['法权', '043', 36, '撤销基金', '基金会,政府,自由'],
  ['法权', '044', 12, '病监特权', '监狱,病监,特权'],
  ['法权', '045', 8, '暴行调查', '监狱,人权,公正调查'],
  ['法权', '045', 17, '包庇因果', '狱政,人权,包庇'],
  ['法权', '045', 18, '面对问题', '正义,历史,法务'],
  ['法权', '047', 24, '所学所用', '法学,良知,狱政'],
  ['法权', '047', 25, '承认积弊', '狱政,勇气,同流合污'],
  ['人格', '048', 12, '善恶不报', '为善,恶报,志士'],
  ['人格', '049', 9, '耿介纯度', '文艺工作者,独立,公关'],
  ['方法', '049', 11, '公义曝光', '真相,公义,反省'],
  ['人格', '049', 14, '不做乡愿', '同志,真相,人缘'],
  ['人格', '049', 15, '同志护短', '同志,护短,真相'],
  ['法权', '050', 3, '司法积弊', '司法,法官,改革'],
  ['法权', '050', 11, '责任中止', '发行人,出版法,法官'],
  ['法权', '050', 12, '发行责任', '出版法,发行人,免责'],
  ['法权', '050', 14, '变更登记', '出版法,发行人,登记'],
  ['法权', '050', 16, '代理出版', '出版法,责任,代理'],
  ['法权', '050', 25, '法律信任', '发行人,法院,法官'],
  ['法权', '050', 26, '司法形象', '司法院,司法,形象'],
  ['政治', '051', 9, '恐共蚱蜢', '匪谍,恐共,国民党'],
  ['政治', '051', 10, '回光返照', '国民党,查禁,建党'],
  ['文化', '052', 10, '自由旗帜', '自由主义,反封建,大陆'],
  ['文化', '052', 12, '鞭挞封建', '封建主义,紫禁城,台湾'],
  ['文化', '052', 13, '共同敌人', '封建主义,大陆,台湾'],
  ['写作', '052', 18, '纵深切入', '封建主义,机会教育,写作'],
  ['方法', '052', 22, '学问平等', '学问,思想,疑问'],
  ['方法', '052', 23, '科学方法', '事实,证据,大胆假设'],
  ['方法', '052', 25, '借题发挥', '考证,方法,封建主义'],
  ['写作', '052', 26, '经世致用', '写作,借题发挥,封建主义'],
  ['人格', '053', 4, '协议在先', '调停,协议,抗议'],
  ['人格', '053', 30, '作者负责', '证据,责任,君子'],
  ['政治', '053', 33, '同志相忍', '党外,同志爱,台湾'],
  ['方法', '055', 3, '背景详查', '校订,史实,背景'],
  ['知识', '055', 4, '科际训练', '文化论,理论,训练'],
  ['方法', '055', 5, '批评自由', '批评,自由,错误'],
  ['写作', '056', 12, '知文不知人', '读书,客观,闭关'],
  ['人格', '056', 14, '现代侠盗', '罗宾汉,正义,形式'],
  ['文化', '057', 8, '乡愁失义', '乡愁,现代化,台湾'],
  ['文化', '057', 11, '怀古不怀乡', '怀古,怀乡,情操'],
  ['人格', '057', 12, '功德苍生', '功德,苍生,好恶'],
  ['法权', '058', 4, '查禁反证', '查禁,言论自由,党外'],
  ['人格', '058', 7, '作者挺身', '证据,责任,作者'],
  ['人格', '058', 8, '承担后果', '办杂志,责任,原则'],
  ['人格', '058', 9, '保护懦夫', '责任,懦夫,原则'],
  ['人格', '058', 12, '义气边界', '作者,证据,政治迫害'],
  ['人格', '059', 4, '厌恶伪善', '伪善,中产阶级,清教徒'],
  ['人格', '059', 5, '混淆颜色', '伪君子,党外,国民党'],
  ['知识', '060', 13, '节操时穷', '知识分子,政权,节操'],
  ['知识', '060', 14, '邪气成片', '知识分子,政权,台湾'],
  ['人格', '060', 15, '浩然榜样', '知识分子,敌人,浩然'],
  ['政治', '060', 16, '史家清算', '国民党,历史,清算'],
  ['知识', '060', 18, '亡天下', '知识分子,道德,国民党'],
  ['方法', '061', 11, '原文互校', '校勘,独立评论,原文'],
  ['知识', '061', 12, '地图史位', '丁文江,地理学,地图'],
  ['人格', '062', 15, '小文归根', '孤岛,教育,归根'],
  ['法权', '062', 17, '处境封锁', '警备,查禁,纽约时报'],
  ['人格', '064', 5, '责任分界', '文星,言论,责任'],
  ['人格', '064', 6, '接受失败', '失败,朋友,历史记录'],
  ['知识', '066', 6, '绝笔珍品', '范仲淹,墨宝,文物'],
  ['知识', '067', 8, '故宫自证', '八大山人,赝品,故宫'],
  ['知识', '067', 10, '捐赠赝品', '故宫,赝品,王世杰'],
  ['文化', '068', 4, '文化外悠', '文化,软实力,官方'],
  ['文化', '068', 5, '大国气度', '消音,敏感词,文化'],
  ['法权', '068', 6, '刀笔吏议', '出版,书名,三联'],
  ['政治', '070', 5, '海外揭真', '海外报章,国民党,真相'],
  ['政治', '070', 6, '海外宣示', '海外知识界,自由民主,声援'],
  ['法权', '070', 14, '信用殉葬', '没收,出版,信用'],
  ['方法', '070', 21, '资料排比', '林语堂,资料,章目'],
  ['写作', '070', 47, '历史分题', '中国历史,写作,夹叙夹议'],
  ['写作', '070', 48, '单元弹性', '稿件,出版,版权'],
  ['法权', '070', 67, '台湾文网', '文网,柏杨,警备'],
  ['方法', '070', 70, '海外舆论', '纽约时报,香港,文星'],
  ['写作', '071', 3, '品管挂帅', '杂志,品管,出版'],
  ['知识', '071', 9, '时代性', '医院,时代性,医学'],
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
    `# 《${payload.book.title}》思想索引：${payload.book.round}`,
    '',
    `- 书目序号：${payload.book.sequence}`,
    `- 来源目录：${payload.book.sourceDir}`,
    `- 条目数：${payload.records.length}`,
    `- 状态：${payload.book.status}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`);
    lines.push('');
    for (const record of records) {
      lines.push(`### ${record.id}｜${record.title}`);
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
    if (record.id?.startsWith('LAT059-')) continue;
    map.set(normalizeForCompare(record.description), record.id);
  }
  return map;
}

const sourceFiles = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
const introFile = sourceFiles.find((name) => name.includes('自序'));
const filesByKey = new Map(
  sourceFiles.filter((name) => /^\d{3}\./.test(name)).map((name) => [name.slice(0, 3), name]),
);
filesByKey.set('000', introFile);

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
  id: `LAT059-${String(index + 1).padStart(3, '0')}`,
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
  const sourceKey = record.source_file.includes('自序') ? '000' : record.source_file.slice(0, 3);
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
  '# 《李敖书信集》思想索引提取说明',
  '',
  `- 来源目录：${book.sourceDir}`,
  `- 候选条目：${candidateEntries.length}`,
  `- 输出条目：${records.length}`,
  `- 跨书或本书重复跳过：${skipped.length}`,
  '',
  '## 提取口径',
  '',
  '- 只提取能够独立呈现李敖判断、方法、价值或知识工作的原文段落。',
  '- 单纯问候、私事流水、人物纠纷的过程性细节、制作信息、目录、外部大段引文和没有独立判断的材料不进入索引。',
  '- 书信里的法律攻防按“法权”归类；党外路线、国民党统治和选举材料按“政治”归类；学术考证、文物鉴定和知识分子判断按“知识”归类。',
  '- 本书未强行补“情爱”条目；涉及婚姻或家庭的段落，若主旨是权利、人格或处境，归入对应主类。',
  '- description 字段保持源文本原段落，不做摘要和改写。',
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
];

if (skipped.length) {
  noteLines.push('## 跳过重复', '');
  for (const item of skipped) {
    noteLines.push(`- ${item.key} P${item.paragraphNumber} ${item.title}：重复于 ${item.duplicateOf}`);
  }
  noteLines.push('');
}

fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Built 059.李敖书信集: ${records.length} records. ` +
    `Candidates: ${candidateEntries.length}. Skipped duplicates: ${skipped.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
