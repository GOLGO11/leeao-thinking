import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 84;
const bookTitle = '李敖颠倒众生';
const round = '提取轮';
const status = '待校对';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

function findRequired(parent, predicate, label) {
  const found = fs.readdirSync(parent).find(predicate);
  if (!found) throw new Error(`Cannot find ${label} under ${parent}`);
  return found;
}

const sourceRootName = findRequired(rootDir, (name) => name.includes('6.0'), 'source root');
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('010.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('004.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((name) => /^\d+\..*\.txt$/u.test(name))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-u-kn-true'));

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'leeao-upending-all-beings',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《李敖颠倒众生》六十二篇节目文字中提取思想索引。取舍以可独立检索的李敖判断段为主，优先保留逆向思考、新闻解读方法、历史解释权、法权与司法批判、媒体管制、两岸与政党政治、资料证据方法、人格风骨和少量情爱/生死观；节目招呼、片尾资源、纯人身攻防、短问答和重复爆料暂不收。标题用于浓缩检索，description 保留源文本原段落。',
};

const candidates = [
  ['001.', 6, '方法', '颠倒众生是取得正确思想'],
  ['001.', 17, '人格', '软硬都吃不动才难被定位'],
  ['001.', 18, '政治', '真正度量要开放用人'],
  ['001.', 21, '人格', '独立人格难被政党定位'],
  ['002.', 3, '法权', '法院遇强弱不该欺善怕恶'],
  ['002.', 5, '法权', '尊重法律要亲自到庭'],
  ['002.', 9, '方法', '新闻评论要快速解读资料'],
  ['003.', 5, '知识', '白皮书不是竞选文书'],
  ['003.', 6, '政治', '能源政策不能只喊废核'],
  ['003.', 7, '法权', '掌握媒体会控制言论'],
  ['004.', 7, '人格', '坦白提出条件才是坦荡'],
  ['004.', 8, '政治', '公共能源不能靠唱高调'],
  ['005.', 8, '政治', '体制外顾问团会绕开制度'],
  ['006.', 3, '知识', '历史记录还需要解释权'],
  ['006.', 4, '方法', '解释历史另有一个层次'],
  ['006.', 6, '政治', '党国会垄断历史解释'],
  ['006.', 8, '知识', '兴中会历史被重新拼接'],
  ['007.', 3, '知识', '文物史料会意外出土'],
  ['007.', 4, '方法', '新材料会推翻旧考证'],
  ['007.', 5, '方法', '资料会在想不到处出现'],
  ['008.', 6, '政治', '统派口号声大威力弱'],
  ['008.', 8, '政治', '统一论述需要真正说服力'],
  ['009.', 8, '法权', '违宪放弃领土构成内乱逻辑'],
  ['009.', 16, '法权', '法律面前应能法办前元首'],
  ['010.', 3, '方法', '新闻事件需要解读示范'],
  ['010.', 7, '知识', '国民党历史不能随意连缀'],
  ['010.', 16, '政治', '政党轮替不是牺牲败选'],
  ['011.', 3, '写作', '即席论政靠长期准备'],
  ['012.', 7, '法权', '节目分级不等于违法'],
  ['012.', 9, '法权', '审查不能由个人好恶决定'],
  ['012.', 12, '法权', '合法审查必须站得住脚'],
  ['013.', 4, '法权', '文明国家不设新闻局管电视'],
  ['013.', 6, '法权', '导读不能替代法律审查'],
  ['013.', 8, '法权', '广电法也该废除'],
  ['014.', 5, '政治', '民主教育失败反噬改革者'],
  ['014.', 9, '政治', '暴力示范来自政治暴力传统'],
  ['015.', 4, '法权', '红墨水事件应先作为法律个案'],
  ['015.', 7, '政治', '族群归因是错误逻辑'],
  ['015.', 10, '人格', '要求别人反省前也要自省'],
  ['015.', 17, '法权', '弱者也有抗议权利'],
  ['016.', 7, '知识', '张学良回乡原因不能轻易解读'],
  ['016.', 8, '政治', '张学良有资格独立却不独立'],
  ['016.', 10, '政治', '西安事变是抗日兵谏'],
  ['016.', 12, '人格', '用人气派体现政治度量'],
  ['017.', 10, '知识', '档案断裂会遮蔽历史真相'],
  ['018.', 3, '人格', '君子难免面对小人'],
  ['018.', 5, '人格', '君子未必能感化小人'],
  ['019.', 7, '法权', '法务部长管不了调查局应自责'],
  ['019.', 10, '法权', '诉讼权不应被闹场阻断'],
  ['019.', 16, '政治', '下台后的权力仍会延续路线'],
  ['020.', 8, '政治', '国际政治小偷会闯空门'],
  ['020.', 12, '政治', '外交烂摊子会传给继任者'],
  ['020.', 15, '政治', '外交软骨来自长期处境'],
  ['021.', 13, '政治', '身份不能任意分身'],
  ['021.', 15, '政治', '国家认同不能闪躲'],
  ['021.', 18, '知识', '正名主义要求名实相符'],
  ['022.', 7, '政治', '特务掌握黑资料可长期控制局面'],
  ['022.', 14, '政治', '案件被养着才能交换条件'],
  ['022.', 15, '政治', '情治集团会直接效忠老板'],
  ['022.', 17, '法权', '调查局民主法制化不易做到'],
  ['023.', 10, '文化', '暴力示范不能选择性遗忘'],
  ['023.', 14, '方法', '族群事件要反向比较'],
  ['024.', 5, '政治', '夺权成败取决于老臣军权'],
  ['024.', 9, '政治', '国家难题可用技巧化解'],
  ['025.', 4, '人格', '死后资源会被无关者掠夺'],
  ['026.', 7, '政治', '不承认中国人就无法谈判'],
  ['026.', 9, '政治', '政治礼遇体现权谋细腻'],
  ['026.', 14, '政治', '抱美国大腿仍会被踢开'],
  ['026.', 15, '政治', '台湾会成为中美战场'],
  ['027.', 5, '政治', '列强对统一常口是心非'],
  ['027.', 7, '政治', '建国需要别人承认'],
  ['027.', 10, '方法', '媒体反应速度影响新闻解释'],
  ['028.', 14, '政治', '党纲不敢实行就成负担'],
  ['028.', 16, '政治', '党纲主张不能滑成不负责'],
  ['029.', 6, '政治', '最高领导要为公共环境负责'],
  ['029.', 11, '政治', '两岸不是国共关系'],
  ['029.', 12, '政治', '现状会被实力变化破坏'],
  ['030.', 8, '政治', '党政军退出媒体不能跳票'],
  ['030.', 12, '法权', '对付异议必须合法'],
  ['030.', 13, '法权', '广播电视法要求新闻公平'],
  ['031.', 4, '政治', '记者会套招不是新闻自由'],
  ['031.', 8, '政治', '善意要有实际行动'],
  ['031.', 12, '知识', '一个中国无需重新定义'],
  ['031.', 15, '政治', '嘴皮善意不等于真正作为'],
  ['032.', 4, '政治', '当选后不能继续竞选状态'],
  ['032.', 7, '政治', '两岸问题不能只说好听话'],
  ['032.', 10, '政治', '一中不是台湾能守的防线'],
  ['032.', 14, '人格', '失败者风度不是接受赏赐'],
  ['032.', 18, '政治', '继承路线可比前任更彻底'],
  ['033.', 15, '政治', '把个人等同国家是混乱逻辑'],
  ['033.', 17, '人格', '做官与做人会发生冲突'],
  ['034.', 5, '政治', '退出政党仍不能暗控政党'],
  ['034.', 10, '政治', '抢党机器就是抢汉献帝'],
  ['034.', 15, '政治', '最高领袖不能沉溺亲民秀'],
  ['034.', 16, '政治', '反对党上台后才显出本相'],
  ['035.', 5, '法权', '判决理由可掩护权贵媒体关系'],
  ['035.', 12, '文化', '新闻自由教师也可能钳制新闻'],
  ['035.', 16, '法权', '党务密令钳制杂志复刊'],
  ['036.', 10, '政治', '战争要避开敌人希望的战场'],
  ['036.', 14, '政治', '境外作战会泄露防卫底牌'],
  ['036.', 19, '政治', '西安事变体现民族道德要求'],
  ['036.', 20, '情爱', '赵四小姐陪关是伟大爱情'],
  ['037.', 7, '情爱', '死别也要保留美感'],
  ['038.', 5, '方法', '掌权者不能包揽所有好事'],
  ['038.', 8, '政治', '新政府会承袭旧媒体控制'],
  ['038.', 12, '政治', '政治力任命不能自称去政治化'],
  ['038.', 19, '文化', '汉学比本土学更有世界性'],
  ['039.', 4, '法权', '卸任官员要遵守回避原则'],
  ['039.', 7, '法权', '故宫院长卸任后应避利益关系'],
  ['039.', 15, '人格', '假的人权斗士会掩盖真斗士'],
  ['040.', 13, '法权', '集体诉讼才能替股东争权'],
  ['040.', 17, '法权', '国民党民进党应一视同仁'],
  ['040.', 18, '政治', '党政退出媒体不能变党政掌控'],
  ['041.', 9, '法权', '监察人技术上不能掏空公司'],
  ['041.', 13, '政治', '本土媒体也会排斥异己'],
  ['041.', 14, '法权', '新闻报道应公平均衡'],
  ['041.', 16, '政治', '模范不下台何以服众'],
  ['042.', 12, '法权', '民视股权应还给投资人'],
  ['042.', 15, '法权', '集体诉讼让股东有尊严'],
  ['043.', 5, '法权', '反告能揭开更大案件'],
  ['043.', 9, '法权', '伪造文书比背信更难逃'],
  ['043.', 13, '法权', '言论自由应给对方申辩空间'],
  ['044.', 8, '法权', '两万个投资人需集体诉讼'],
  ['044.', 13, '法权', '党政法院力量会破坏公平竞争'],
  ['045.', 4, '政治', '政党常挂羊头卖狗肉'],
  ['045.', 11, '政治', '革命失落者比反对者更失落'],
  ['046.', 4, '政治', '民进党比国民党还国民党'],
  ['046.', 8, '政治', '不敢查弊案就无资格执政'],
  ['048.', 5, '方法', '事件解释要靠资料证据'],
  ['048.', 8, '政治', '说谎会塑造政治形象'],
  ['049.', 7, '方法', '职业判断来自长期观察'],
  ['049.', 11, '政治', '政客不懂财政只会开支票'],
  ['050.', 10, '人格', '真正关心台湾要掏钱坐牢'],
  ['051.', 4, '政治', '喊统一却不喊口号是不诚恳'],
  ['051.', 7, '政治', '多数党可不倒阁只捣蛋'],
  ['051.', 9, '政治', '竞选政见要先算钱够不够'],
  ['052.', 6, '政治', '爱中国和爱台湾利益一致'],
  ['052.', 12, '方法', '情欲信而词欲巧才让人听得进'],
  ['052.', 13, '方法', '表达要因人而异'],
  ['052.', 16, '方法', '公开表达不必靠密使'],
  ['053.', 3, '方法', '密使要取得信任并守密'],
  ['053.', 8, '法权', '秘密接触也要追究档案责任'],
  ['053.', 10, '知识', '蒋介石抗战也有秘密谈判'],
  ['054.', 4, '政治', '民意不能分新旧'],
  ['054.', 5, '法权', '救人不能分高低上下'],
  ['054.', 9, '政治', '政治有连续责任'],
  ['054.', 10, '政治', '不能只接收成果不承担责任'],
  ['055.', 8, '政治', '蒋介石官邸也该完整收回'],
  ['055.', 12, '方法', '竞争要创造优势规则'],
  ['056.', 4, '文化', '旧桥可保存不必拆毁'],
  ['057.', 9, '法权', '性出版审查应区分渲染与表达'],
  ['057.', 10, '文化', '性开放会带动其他自由'],
  ['058.', 10, '法权', '军方录音带做手脚显示黑暗'],
  ['058.', 16, '政治', '总统摊牌才能推动旧案'],
  ['058.', 20, '政治', '破黑金会牵动前后政权'],
  ['059.', 4, '法权', '诽谤死者也要负法律责任'],
  ['059.', 8, '法权', '证物保管链不追究最怪'],
  ['059.', 14, '政治', '大回扣不可能只由低层分掉'],
  ['059.', 22, '法权', '军方荣誉不能压过冤案真相'],
  ['059.', 30, '方法', '用诉讼取得证据'],
  ['060.', 3, '法权', '监察委员长期不查也是失职'],
  ['060.', 12, '方法', '关键在谁先宣布逃亡'],
  ['060.', 32, '法权', '办案被误导就无法水落石出'],
  ['060.', 43, '法权', '保密失控会使证物消失'],
  ['061.', 28, '法权', '不该用私德方向困扰被害者'],
  ['061.', 42, '法权', '该执行职务不执行就是共犯'],
  ['061.', 53, '法权', '军方若清白就应开诚布公'],
  ['062.', 14, '法权', '立委要给办案方向压力'],
  ['062.', 22, '法权', '刑求不能成为办案方法'],
  ['062.', 30, '法权', '肯打老虎案子就能破'],
];

function resolveSourceFile(prefix) {
  const sourceFile = sourceFiles.find((name) => name.startsWith(prefix));
  if (!sourceFile) throw new Error(`Cannot find source file with prefix ${prefix}`);
  return sourceFile;
}

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName))).replace(/^\uFEFF/, '');
}

function normalizeText(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function paragraphsOf(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalizeText)
    .filter(Boolean);
}

function sourceParagraphs(fileName) {
  return paragraphsOf(readSource(fileName));
}

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’！？。，、：；（）()\s]/g, '')
    .slice(0, 18);
}

function makeKeywords(category, title, sourceFile) {
  return [...new Set([category, cleanKeyword(title), cleanKeyword(fileTitle(sourceFile))].filter(Boolean))].join(',');
}

function loadExistingDescriptions() {
  const masterPath = path.join(rootDir, 'outputs', '思想索引总表.json');
  if (!fs.existsSync(masterPath)) return new Map();

  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
  const descriptions = new Map();
  for (const record of master.records ?? []) {
    descriptions.set(normalizeText(record.description), record.id);
  }
  return descriptions;
}

function buildRecords() {
  const existingDescriptions = loadExistingDescriptions();
  const paragraphCache = new Map();
  const localDescriptions = new Map();
  const skippedDuplicates = [];
  const records = [];

  candidates.forEach(([prefix, paragraphNumber, category, title]) => {
    if (!taxonomy.includes(category)) {
      throw new Error(`Unknown category ${category} for ${prefix} P${paragraphNumber}`);
    }

    const sourceFile = resolveSourceFile(prefix);
    if (!paragraphCache.has(sourceFile)) {
      paragraphCache.set(sourceFile, sourceParagraphs(sourceFile));
    }

    const paragraphs = paragraphCache.get(sourceFile);
    const description = paragraphs[paragraphNumber - 1];
    if (!description) {
      throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
    }

    const normalizedDescription = normalizeText(description);
    const duplicateId = localDescriptions.get(normalizedDescription) ?? existingDescriptions.get(normalizedDescription);
    if (duplicateId) {
      skippedDuplicates.push({ prefix, paragraphNumber, title, duplicateId });
      return;
    }

    localDescriptions.set(normalizedDescription, `LAT${book.sequence}-${String(records.length + 1).padStart(3, '0')}`);
    records.push({
      id: `LAT${book.sequence}-${String(records.length + 1).padStart(3, '0')}`,
      book: book.title,
      round,
      status,
      category,
      title,
      description,
      source_file: sourceFile,
      source_paragraph: paragraphNumber,
      source_path: path.join(sourceBookDir, sourceFile).replaceAll(path.sep, '/'),
      keywords: makeKeywords(category, title, sourceFile),
    });
  });

  return { records, skippedDuplicates };
}

function categoryCounts(records) {
  const counts = new Map(taxonomy.map((category) => [category, 0]));
  for (const record of records) {
    counts.set(record.category, (counts.get(record.category) ?? 0) + 1);
  }
  return taxonomy.map((category) => ({ category, count: counts.get(category) ?? 0 }));
}

function escapeCsv(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/u.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function writeCsv(records, filePath) {
  const columns = [
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
  const rows = [columns.join(',')];
  for (const record of records) {
    rows.push(columns.map((column) => escapeCsv(record[column])).join(','));
  }
  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(payload, filePath) {
  const lines = [
    `# ${payload.book.title}思想索引（${payload.book.round}）`,
    '',
    `- 书名：${payload.book.title}`,
    `- 轮次：${payload.book.round}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 候选数：${payload.book.candidate_count}`,
    `- 跳过重复：${payload.book.skipped_duplicate_count}`,
    '',
    '## 分类统计',
    '',
    ...payload.book.category_counts.map(({ category, count }) => `- ${category}：${count}`),
    '',
    '## 索引',
    '',
  ];

  for (const record of payload.records) {
    lines.push(`### ${record.id} ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }

  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeText(records, filePath) {
  const lines = [];
  for (const record of records) {
    lines.push(`${record.id}｜${record.category}｜${record.title}`);
    lines.push(`来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(record.description);
    lines.push('');
  }
  fs.writeFileSync(filePath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
}

function writeNote(payload, filePath) {
  const lines = [
    `# ${payload.book.title}提取说明`,
    '',
    `本轮从源目录 \`${payload.book.sourceDir}\` 提取。`,
    '',
    '取舍原则：',
    '',
    '- 优先保留李敖自己的明确判断、方法、价值标准或可复用概念。',
    '- 对节目招呼、片尾资源、纯人身攻防、短问答和重复爆料从严剔除。',
    '- 标题用于检索和浓缩主题；所有 `description` 均保留源文本原段落，不改写。',
    '',
    '分类统计：',
    '',
    ...payload.book.category_counts.map(({ category, count }) => `- ${category}：${count}`),
    '',
    `候选 ${payload.book.candidate_count} 条，生成 ${payload.records.length} 条，跳过重复 ${payload.book.skipped_duplicate_count} 条。`,
    '',
  ];
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

const { records, skippedDuplicates } = buildRecords();
const payload = {
  book: {
    ...book,
    record_count: records.length,
    candidate_count: candidates.length,
    skipped_duplicate_count: skippedDuplicates.length,
    category_counts: categoryCounts(records),
  },
  records,
};

fs.mkdirSync(outputDir, { recursive: true });

const roundBase = `思想索引-${round}`;
const roundJsonPath = path.join(outputDir, `${roundBase}.json`);
const roundCsvPath = path.join(outputDir, `${roundBase}.csv`);
const roundMdPath = path.join(outputDir, `${roundBase}.md`);
const indexJsonPath = path.join(outputDir, '思想索引.json');
const indexCsvPath = path.join(outputDir, '思想索引.csv');
const indexTxtPath = path.join(outputDir, '思想索引.txt');

fs.writeFileSync(roundJsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.copyFileSync(roundJsonPath, indexJsonPath);
writeCsv(records, roundCsvPath);
fs.copyFileSync(roundCsvPath, indexCsvPath);
writeMarkdown(payload, roundMdPath);
writeText(records, indexTxtPath);
writeNote(payload, path.join(outputDir, '提取说明.md'));

console.log(
  `Built ${payload.book.title}: ${records.length} records, ${skippedDuplicates.length} skipped duplicates. Categories: ${payload.book.category_counts
    .map(({ category, count }) => `${category}=${count}`)
    .join(', ')}`,
);
