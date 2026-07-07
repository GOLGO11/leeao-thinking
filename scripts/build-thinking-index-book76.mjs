import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 76;
const bookTitle = '中国近代史新论';
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
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('009.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('007.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs.readdirSync(sourceDir).filter((name) => /^\d+\..*\.txt$/u.test(name));

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'zhongguo-jindai-shi-xinlun',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《中国近代史新论》的西学东传、反西学迫害、历法与祖法、早期中俄外交、天朝自欺、晚清革命史料、全盘西化前记和近代史编选说明中提取思想索引。description 保留源文本原段落；目录、日期、电子书页脚、纯引文、注释清单、材料罗列，以及陈序经附录中没有李敖评论的段落不进入本轮。',
};

const candidates = [
  ['001.', 8, '方法', '利玛窦以适应策略进入中国'],
  ['001.', 20, '文化', '自鸣钟架起皇帝桥梁'],
  ['001.', 22, '政治', '技术贡品换来居留空间'],
  ['001.', 28, '文化', '利玛窦影响自天子至庶人'],
  ['001.', 33, '方法', '现身说法收揽人心'],
  ['001.', 34, '方法', '传教须接上中国道统'],
  ['001.', 40, '知识', '几何原本开启中西合译'],
  ['001.', 43, '文化', '几何原本划开纯理科学新页'],
  ['001.', 47, '文化', '中西学人第一次大合作'],
  ['001.', 49, '知识', '李之藻接受西方宇宙观'],
  ['001.', 52, '知识', '世界地图打破中国天下观'],
  ['001.', 60, '方法', '世界地图也迎合中国中心观'],
  ['001.', 62, '知识', '中国人可造就西方科学'],
  ['001.', 76, '文化', '世界地图流行一时之盛'],
  ['001.', 81, '人格', '传教士守道不阿得尊重'],
  ['001.', 83, '政治', '利玛窦死葬带政治象征'],
  ['001.', 87, '知识', '地心引力惊动中国人'],
  ['001.', 90, '方法', '历象器算可取道术另辨'],

  ['002.', 3, '文化', '利玛窦沟通中西文化'],
  ['002.', 4, '方法', '文化交流互惠才是真历史'],
  ['002.', 6, '知识', '日食错误打开西法机会'],
  ['002.', 9, '政治', '西法输入遭守旧派反击'],
  ['002.', 13, '政治', '帽子手法栽诬传教士'],
  ['002.', 19, '政治', '政治事件成迫害借口'],
  ['002.', 20, '政治', '经济叛乱也可转嫁宗教'],
  ['002.', 44, '人格', '迫害中仍完成事业'],
  ['002.', 49, '方法', '外来西学不怕公开辩论'],
  ['002.', 50, '政治', '驱逐传教士牵累西学事业'],
  ['002.', 52, '知识', '日食推动采行西法'],
  ['002.', 53, '文化', '崇祯历书规范中西合作远景'],
  ['002.', 54, '政治', '新法仍遭守旧阻力'],
  ['002.', 57, '政治', '钦保天学是划时代大事'],
  ['002.', 59, '政治', '皇帝亲近传教士却终生未见'],
  ['002.', 65, '知识', '历法再次征服新皇帝'],
  ['002.', 73, '文化', '大胆附会给反对者口实'],
  ['002.', 75, '政治', '杨光先以阴谋论兴大狱'],
  ['002.', 76, '法权', '历法之争竟判凌迟'],
  ['002.', 78, '方法', '旧历失败使西法复用'],
  ['002.', 80, '方法', '不知推算不能掌钦天监'],
  ['002.', 85, '文化', '排外理由挡不住西潮'],

  ['003.', 16, '文化', '奇巧惊叹伴随文明自惭'],
  ['003.', 19, '文化', '五线谱进入御定音乐典范'],
  ['003.', 24, '文化', '乾隆兴趣不长限制西乐影响'],
  ['003.', 30, '方法', '中西画法差异可由明暗辨'],
  ['003.', 47, '文化', '委曲求全导致不中不西'],
  ['003.', 49, '文化', '审美差异连着意识风俗'],
  ['003.', 66, '文化', '圆明园西洋楼象征西方文化'],
  ['003.', 71, '方法', '传教士入境须通语言'],
  ['003.', 75, '文化', '西字奇迹兼及中西语文'],
  ['003.', 79, '知识', '西儒耳目资开中西音韵学'],
  ['003.', 82, '政治', '拉丁文影响条约政治'],
  ['003.', 87, '政治', '康熙有计划栽培拉丁文'],

  ['004.', 2, '文化', '优势文明冲击必有抵制'],
  ['004.', 3, '文化', '自大狂阻止虚心学习'],
  ['004.', 5, '政治', '守旧派公式是道一风同'],
  ['004.', 7, '政治', '抑邪崇正理由冠冕堂皇'],
  ['004.', 8, '方法', '研究误会更能理解史实'],
  ['004.', 14, '方法', '祖宗战不是历法之争'],

  ['005.', 9, '政治', '中国式谈判爱排场与武器'],
  ['005.', 10, '政治', '尼布楚谈判中国只求划界'],
  ['005.', 12, '方法', '康熙借对方上帝约束俄国'],
  ['005.', 13, '政治', '和平换来帝国腐化时间'],

  ['006.', 17, '政治', '雅克萨胜利是伟大战绩'],
  ['006.', 19, '方法', '胜仗仍未认清敌人性质'],
  ['006.', 37, '政治', '尼布楚是中国第一个外国条约'],
  ['006.', 47, '政治', '尼布楚谈判是外交史巨观'],
  ['006.', 51, '方法', '康熙巧用耶稣之名'],
  ['006.', 52, '政治', '划界与通商各取所需'],
  ['006.', 54, '方法', '中国划界法还是勒石记功'],
  ['006.', 56, '方法', '界碑错误自动放弃土地'],
  ['006.', 59, '政治', '尼布楚真正失地更大'],
  ['006.', 60, '知识', '失地源于地理知识缺乏'],
  ['006.', 63, '方法', '约文含混来自想象地理'],
  ['006.', 67, '政治', '优势下失地而不自知'],
  ['006.', 70, '政治', '通商夹带情报工作'],
  ['006.', 72, '政治', '雍正因政治斗争倾向俄国'],
  ['006.', 85, '政治', '恰克图失地源于不明地理'],
  ['006.', 89, '政治', '俄国侵略三宝完成'],
  ['006.', 96, '政治', '清廷替俄国训练特务'],
  ['006.', 104, '政治', '萨瓦是俄国东进策划者'],
  ['006.', 117, '法权', '不懂外交承认领事裁判权'],

  ['007.', 2, '知识', '乾隆时代西方发生大变化'],
  ['007.', 4, '文化', '优势文化暴露中国败绩'],
  ['007.', 6, '人格', '落后不可怕不认落后才可怕'],
  ['007.', 8, '政治', '故步自封岸然自大'],
  ['007.', 12, '方法', '礼节问题透视心理模式'],
  ['007.', 23, '政治', '整肃军容是不打自招的作伪'],
  ['007.', 26, '方法', '明眼观察最可怕'],
  ['007.', 29, '政治', '旁观者看穿天朝'],
  ['007.', 30, '政治', '天朝在夷狄眼里成纸龙'],
  ['007.', 31, '政治', '马嘎尔尼报告是鸦片战争远源'],

  ['008.', 2, '知识', '林则徐看出船坚炮利危机'],
  ['008.', 3, '人格', '胡林翼面对洋船忧到吐血'],
  ['008.', 4, '政治', '洋务自造轮船失败'],
  ['008.', 5, '文化', '中体西用是自慰怪论'],
  ['008.', 6, '政治', '中学为体最后只剩尸体'],

  ['009.', 3, '政治', '皇帝虚名等于终身圈禁'],
  ['009.', 4, '方法', '溥仪是浮沉对比最强取样'],
  ['009.', 5, '文化', '溥仪人生是奇中之奇'],
  ['009.', 6, '写作', '末代皇帝史也是未来新页'],

  ['010.', 4, '人格', '科学新境界推动革命志'],
  ['010.', 5, '政治', '革命须联络会党扩大势力'],
  ['010.', 8, '人格', '史坚如受刑仍不连累同志'],
  ['010.', 11, '方法', '供词真相须据亲闻订正'],

  ['011.', 3, '方法', '历史消息有新意义'],
  ['011.', 4, '政治', '拔根本枝叶自萎'],
  ['011.', 6, '政治', '刺杀良弼促成退位'],
  ['011.', 7, '人格', '反对要光明磊落勇往直前'],

  ['012.', 13, '方法', '史料可贵但不必名真史'],
  ['012.', 14, '写作', '党人私见不该禁野史'],

  ['013.', 2, '政治', '反对派也会受国民党调教'],
  ['013.', 3, '政治', '国民党忘恩负义'],
  ['013.', 5, '法权', '无出版法便用大逆罪办报'],
  ['013.', 9, '人格', '陈范革命到妻离妾嫁'],
  ['013.', 11, '政治', '政府负贤者非建国之祥'],
  ['013.', 13, '人格', '陈撷芬倾其仅存义助革命'],
  ['013.', 14, '政治', '革命成功后贤者仍被遗忘'],

  ['014.', 26, '方法', '资料需要串连'],
  ['014.', 27, '政治', '国民党放大自己缩小异己'],

  ['015.', 9, '方法', '铜像伟大里要探索真相'],
  ['015.', 12, '人格', '吴稚晖自承革命瞠乎人后'],
  ['015.', 14, '方法', '查苏报可见嘴巴革命也假'],
  ['015.', 20, '政治', '吴稚晖为钱不讲原则'],
  ['015.', 30, '写作', '革命机关报功劳另有人'],
  ['015.', 42, '文化', '章太炎是古文学光荣结局'],
  ['015.', 44, '人格', '知识力量起而抗暴'],
  ['015.', 49, '写作', '革命军将革命思想系统普及'],
  ['015.', 55, '写作', '革命军功劳可比常识'],
  ['015.', 64, '法权', '礼仪之邦法律野蛮'],
  ['015.', 71, '方法', '重要内幕需要重新追踪'],
  ['015.', 88, '政治', '私见敌人后同志被捕'],
  ['015.', 92, '政治', '逍遥自在显示暗示生效'],
  ['015.', 105, '人格', '暗盘不告就是出卖同志'],
  ['015.', 110, '方法', '事实俱在狡辩无用'],
  ['015.', 114, '政治', '激将邹容投案'],
  ['015.', 117, '人格', '鼓动他人入狱可见人品'],
  ['015.', 120, '人格', '邹容虐待中死于狱'],
  ['015.', 121, '政治', '逃兵等待接收革命果实'],
  ['015.', 124, '政治', '苏报案使革命思想成主流'],
  ['015.', 126, '方法', '邹容之死让章太炎活下作证'],
  ['015.', 128, '人格', '章太炎厌恶国民党独占革命'],
  ['015.', 129, '政治', '革命逃兵变成党国元老'],
  ['015.', 130, '政治', '国民党进一步捏造历史'],
  ['015.', 132, '政治', '铜像应验成为讽刺'],
  ['015.', 133, '法权', '合法砸铜像为先烈平反'],

  ['016.', 13, '方法', '卖国贼自白向历史撒种子'],
  ['016.', 26, '方法', '重要回忆录订正有限'],
  ['016.', 29, '方法', '杨深秀死因不能说窄'],
  ['016.', 32, '方法', '不知所终反证历史陌生'],
  ['016.', 37, '方法', '许世英回忆全非事实'],
  ['016.', 43, '方法', '日本法学家名字须查证'],
  ['016.', 50, '方法', '曹汝霖结论完全弄错'],
  ['016.', 53, '方法', '五大臣出洋错漏甚多'],
  ['016.', 72, '方法', '第一手史料也要细心推敲'],

  ['017.', 2, '文化', '中国人明明全盘西化'],
  ['017.', 4, '方法', '陈序经厘清三派文化出路'],
  ['017.', 5, '文化', '折中复古都误解文化'],
  ['017.', 7, '写作', '重介全盘西化有讽世意味'],

  ['018.', 15, '方法', '外交史料要避免单方口供'],
  ['018.', 16, '方法', '中国近代史大纲见解精辟'],
  ['018.', 17, '写作', '近代史论集编印有意义'],
  ['018.', 37, '写作', '专辑编排要补选集不足'],
];

function resolveSourceFile(prefix) {
  const sourceFile = sourceFiles.find((name) => name.startsWith(prefix));
  if (!sourceFile) throw new Error(`Cannot find source file with prefix ${prefix}`);
  return sourceFile;
}

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
}

function paragraphsOf(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalizeText)
    .filter(Boolean);
}

function normalizeText(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function sourceParagraphs(fileName) {
  return paragraphsOf(readSource(fileName));
}

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"!?.,，。！？、：；（）()\s]+/g, '')
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
    if (record.book === bookTitle) continue;
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

const records = candidates.flatMap(([sourceRef, paragraphNumber, category, title]) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${sourceRef}:${paragraphNumber}`);
  }

  const sourceFile = resolveSourceFile(sourceRef);
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
  '- 保留可独立检索的西学东传、反西学迫害、历法与祖法、早期中俄外交、天朝自欺、晚清革命史料、全盘西化前记和近代史编选说明。',
  '- 删除目录、日期、电子书页脚、纯引文、注释清单、材料罗列，以及陈序经附录中没有李敖评论的段落。',
  '- 长篇史料考据优先取能显示李敖方法、判断或结论的段落，不把引文和例证清单整体搬入索引。',
  '- 标题可浓缩，description 保留源文本原段落，不改写。',
  '',
  '分类统计：',
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
