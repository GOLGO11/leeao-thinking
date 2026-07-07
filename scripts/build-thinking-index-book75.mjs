import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 75;
const bookTitle = '中国命研究';
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
  (name) => name.startsWith('006.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((name) => /^\d+\..*\.txt$/u.test(name) || name === '《中国命研究》自序.txt');

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'zhongguo-ming-yanjiu',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《中国命研究》的命定论、天与神、泰山生死信仰、亡国与殉国、慈禧与制度、死亡观、万岁与奴才、刑求自白、白鸭顶罪、人格节义、敌友方法和经典排名中提取思想索引。description 保留源文本原段落；目录、日期、电子书页脚、纯引文、神名地名清单、封禅铺陈清单，以及仅作引证而无李敖判断的长引文不进入本轮。',
};

const candidates = [
  ['自序', 2, '写作', '命研究围绕命定生死'],
  ['自序', 13, '人格', '识性命要通幽明之变'],

  ['001.', 4, '文化', '王充能在儒家一统中异议'],
  ['001.', 5, '人格', '王充勇于疑古论今'],
  ['001.', 7, '文化', '宿命思想深入卓越思想家'],
  ['001.', 9, '文化', '宿命可反抗天人感应'],
  ['001.', 15, '方法', '王充推翻天地故生人'],
  ['001.', 19, '文化', '偶字否定有意志的天'],
  ['001.', 28, '文化', '王充用命解释幸偶'],
  ['001.', 30, '文化', '宿命让人幽居俟时'],
  ['001.', 37, '文化', '无意志天否定福善祸淫'],
  ['001.', 39, '方法', '小迷信可打大迷信'],

  ['002.', 4, '政治', '反符瑞就是反钦定思想'],
  ['002.', 5, '政治', '现代符瑞迷信仍在台湾'],

  ['003.', 15, '文化', '中国信命又相信造命'],
  ['003.', 16, '人格', '信而不迷也是知识分子抽样'],

  ['004.', 4, '文化', '古人发誓要向鬼神缴费'],
  ['004.', 6, '方法', '有如句法是发誓套话'],
  ['004.', 9, '文化', '有如白水是河神见证'],
  ['004.', 10, '方法', '望文生义会错读古书'],
  ['004.', 11, '方法', '归纳考证是读古书方法'],

  ['005.', 3, '方法', '中国词汇缺少明确定义'],
  ['005.', 4, '方法', '排比归纳才能确定天义'],
  ['005.', 6, '方法', '方法能走出思想迷雾'],
  ['005.', 9, '文化', '中国上帝不是耶和华'],
  ['005.', 15, '文化', '绝地天通是重划人神界限'],
  ['005.', 20, '文化', '中国群神有人格与人性'],
  ['005.', 37, '文化', '天帝观念近于祖先神'],
  ['005.', 38, '文化', '祭天祭祖本是一回事'],
  ['005.', 47, '政治', '统治者打死人旗号治活人'],
  ['005.', 48, '政治', '天从天子专利扩散到诸侯'],
  ['005.', 67, '政治', '神权会随政权扩张'],
  ['005.', 72, '文化', '愚夫愚妇真正亲近群神'],
  ['005.', 83, '文化', '天是曾祖父的比附鬼话'],
  ['005.', 84, '政治', '天人合一可服务君权'],
  ['005.', 86, '政治', '神性天一路愚民一路压民'],
  ['005.', 89, '文化', '自然天没有意志情绪'],
  ['005.', 101, '文化', '怨天疑天混同两种天'],
  ['005.', 109, '方法', '孔子是有神论不可知论者'],
  ['005.', 116, '文化', '老子兴趣在自然性的天'],
  ['005.', 122, '文化', '庄子让天失去神性'],
  ['005.', 126, '方法', '荀子主张不求知天'],
  ['005.', 128, '方法', '制天命而用之才是正路'],
  ['005.', 129, '文化', '荀子天论被孔孟独尊压低'],

  ['006.', 10, '文化', '封禅笼罩在迷信大雾'],
  ['006.', 108, '方法', '泰山名过其实源于眼界限制'],
  ['006.', 109, '文化', '泰山思想连着生死地狱'],
  ['006.', 112, '文化', '泰山主生承载长生愿望'],
  ['006.', 115, '文化', '泰山是生命安全屏障'],
  ['006.', 117, '文化', '泰山主死承接归魂想象'],
  ['006.', 120, '文化', '泰山神经历道佛夺权'],
  ['006.', 132, '文化', '泰山被佛经地狱化'],
  ['006.', 133, '文化', '生死簿取代金箧玉策'],
  ['006.', 139, '文化', '孙悟空强销死籍显示泰山地狱'],
  ['006.', 140, '方法', '追踪思想组合才会读活书'],

  ['007.', 7, '人格', '学术要利济天下后世'],
  ['007.', 15, '政治', '地下学问会使学者避祸疏远'],
  ['007.', 16, '人格', '知识分子生死要有关天下'],
  ['007.', 19, '方法', '为学先开拓心胸'],
  ['007.', 20, '人格', '眼光放极大身体安极小'],

  ['008.', 9, '文化', '孔融父母无恩论最有气派'],
  ['008.', 12, '文化', '父母子女关系可从情欲解释'],
  ['008.', 23, '文化', '父母不能对子女市恩'],
  ['008.', 31, '文化', '孝顺信条不能无条件适用'],
  ['008.', 34, '方法', '父母无恩论汇成智者断片'],

  ['009.', 8, '人格', '老人自尽也可有悲壮胸怀'],
  ['009.', 9, '文化', '现代观念减少无谓反应'],
  ['009.', 17, '法权', '老人之死不明会牵连身边人'],
  ['009.', 18, '文化', '复兴中国文化要问复兴什么'],

  ['010.', 4, '政治', '百姓可恨暴君到同归于尽'],
  ['010.', 6, '政治', '敌我关系可走到你死我不活'],

  ['011.', 2, '政治', '统治者居于人神之间'],
  ['011.', 4, '政治', '统治者怕天怒胜过人怨'],
  ['011.', 7, '政治', '天怒比人怨厉害'],
  ['011.', 11, '文化', '灾异说给天惩罚分梯次'],
  ['011.', 15, '政治', '董仲舒只让天夺暴君'],
  ['011.', 17, '方法', '不要给董仲舒戴制衡高帽'],
  ['011.', 18, '政治', '董仲舒推动一统君权'],
  ['011.', 20, '政治', '董仲舒是专制政治帮凶'],
  ['011.', 22, '政治', '用灾异制衡统治者太空洞'],
  ['011.', 23, '政治', '高级迷信可结合高段统治'],
  ['011.', 30, '政治', '五行可代换成无条件效忠'],
  ['011.', 32, '政治', '知识分子容易沦为统治鹰犬'],

  ['012.', 7, '人格', '不怕孤立才有独立'],

  ['013.', 4, '政治', '整肃特务也可能重建特务'],
  ['013.', 5, '政治', '特务政治造成政局鸡飞狗跳'],
  ['013.', 9, '人格', '亡国之君仍可有羞耻'],
  ['013.', 10, '人格', '殉国比只会亡国高一等'],

  ['014.', 4, '政治', '昏君也可有司法清明愿望'],
  ['014.', 8, '法权', '昏君也会提言论自由'],
  ['014.', 12, '法权', '放人回乡比扣留人质有气派'],
  ['014.', 16, '人格', '陈后主跳井可作殉国理解'],
  ['014.', 19, '人格', '旧主旧臣情义也动人'],

  ['015.', 14, '写作', '从山河片段看人世兴亡'],
  ['015.', 15, '政治', '北方英雄陷在小朝廷'],
  ['015.', 16, '文化', '小小兴亡所在会转移'],

  ['016.', 3, '人格', '无名信是无胆作恶'],
  ['016.', 4, '政治', '迫害会把人才逼向对岸'],
  ['016.', 10, '写作', '历史剧应有现实意义'],
  ['016.', 13, '写作', '历史剧美化慈禧会失去现实意义'],
  ['016.', 17, '政治', '慈禧的问题在破坏制度'],
  ['016.', 19, '政治', '制度不能替慈禧脱罪'],
  ['016.', 23, '政治', '慈禧破坏制度无微不至'],
  ['016.', 25, '写作', '重大历史剧不能完全相反'],
  ['016.', 27, '政治', '慈禧是传统执政者样板'],
  ['016.', 28, '写作', '电影应表达历史现实意义'],

  ['017.', 8, '政治', '小人仍可能有忌惮'],
  ['017.', 9, '政治', '国民党比西太后更无所畏'],

  ['018.', 6, '政治', '清流也会变成准阉党'],
  ['018.', 7, '政治', '亡天下是道德失落'],

  ['019.', 2, '政治', '南京首都制造亡国效果'],
  ['019.', 11, '政治', '国民党辞庙比唐朝更丢人'],

  ['020.', 4, '文化', '命定论是中国鬼话'],
  ['020.', 7, '人格', '生死线外也有两个自己'],
  ['020.', 8, '人格', '人要追问自己是否已死'],

  ['021.', 6, '情爱', '死法也可有情欲想象'],
  ['021.', 9, '情爱', '形而下死法胜过七窍流血'],

  ['022.', 5, '写作', '封面也可反击查禁'],
  ['022.', 6, '写作', '戏谑关系可转成玩世报复'],
  ['022.', 9, '方法', '学术论理不能双重标准'],

  ['023.', 5, '人格', '思想家可鼓舞政治家而不亲自从政'],
  ['023.', 13, '法权', '文字传播构成加重诽谤'],

  ['024.', 3, '方法', '停刊不能倒果为因'],
  ['024.', 4, '写作', '变质在自己背弃理想'],
  ['024.', 5, '写作', '文星曾推动现代自由开明'],
  ['024.', 6, '写作', '复刊若背弃精神会成伪文星'],
  ['024.', 7, '写作', '从挑战统治到拍统治马屁'],
  ['024.', 9, '政治', '党报反应显示谁变了'],
  ['024.', 10, '写作', '杂志只能死一次'],

  ['025.', 3, '文化', '死亡无保障催生长寿祈愿'],
  ['025.', 7, '文化', '祈眉寿会变成难老愿望'],
  ['025.', 13, '文化', '难老会发展成不死'],
  ['025.', 18, '政治', '帝王权势催生长生骗子'],
  ['025.', 21, '文化', '不死思想分形骸与灵魂'],
  ['025.', 22, '文化', '儒家重形骸不死'],
  ['025.', 23, '文化', '道家灵魂不死更进步'],
  ['025.', 25, '文化', '厚葬只是延迟归土'],
  ['025.', 26, '文化', '灵魂形骸两分更生动'],
  ['025.', 27, '文化', '塑像崇拜是低段信仰'],

  ['026.', 4, '文化', '万岁本是人民庆贺词'],
  ['026.', 6, '政治', '万岁被皇家化'],
  ['026.', 15, '政治', '权臣也想逼近万岁'],
  ['026.', 16, '政治', '山呼万岁成典型马屁'],
  ['026.', 17, '方法', '从万岁字眼可小见大'],
  ['026.', 18, '政治', '万岁应重新平民化'],

  ['027.', 7, '方法', '奴才词源要追到胡人语境'],
  ['027.', 16, '政治', '满洲得天下后要别人自下'],
  ['027.', 22, '政治', '密折另建亲密统治渠道'],
  ['027.', 24, '政治', '奴才自称可表示亲密'],
  ['027.', 30, '政治', '不许汉人称奴才也是等级区分'],
  ['027.', 45, '方法', '奏折改字可见称臣得体'],
  ['027.', 48, '政治', '奴才自称风起云涌'],
  ['027.', 52, '人格', '奴才自称使人格沦落'],
  ['027.', 54, '政治', '奴才阶层还会分上下'],

  ['028.', 6, '法权', '真假官员会使被告不敢翻供'],
  ['028.', 12, '法权', '自白必须出于任意'],
  ['028.', 16, '法权', '以取供方法为准是一切祸源'],
  ['028.', 20, '法权', '调查刑求的行文只是演戏'],
  ['028.', 22, '法权', '一党侦审一体使翻供无用'],
  ['028.', 28, '法权', '检察官面前也能逼出自白'],
  ['028.', 29, '法权', '自白证据能力应被釜底抽薪'],

  ['029.', 3, '方法', '出土文献可恢复古书地位'],
  ['029.', 6, '法权', '刑求造假案古已有之'],
  ['029.', 9, '法权', '先自诬可为出狱反击'],
  ['029.', 14, '法权', '招了再说是求生策略'],
  ['029.', 15, '人格', '要杀坏人先免于被坏人所杀'],

  ['030.', 24, '写作', '狱中杂记是绝好文章'],
  ['030.', 27, '人格', '方苞遗爱不止作文'],
  ['030.', 29, '法权', '姑息凶人不是仁厚'],
  ['030.', 31, '写作', '干涉审判文字也可成妙文'],
  ['030.', 37, '政治', '中国黑牢依旧而光明不复'],

  ['031.', 6, '法权', '富人杀人穷人顶罪'],
  ['031.', 9, '法权', '白鸭进退皆死'],
  ['031.', 12, '法权', '顶罪靠穷人与办案者各取所需'],
  ['031.', 14, '政治', '陈启礼可能成为现代白鸭'],

  ['032.', 3, '方法', '忠奸善恶不能草率二分'],
  ['032.', 8, '方法', '判断冤白要加入时间因素'],
  ['032.', 9, '法权', '时间因素有运气与残忍'],
  ['032.', 10, '人格', '冤屈者要比敌人长寿'],

  ['033.', 5, '方法', '诗义可由典故综合追索'],
  ['033.', 7, '人格', '谭嗣同以佛学歌咏而殉道'],

  ['034.', 4, '人格', '人活着不只为了面包'],
  ['034.', 5, '人格', '君子使物不为物使'],
  ['034.', 6, '人格', '使命受阻时可弃物如敝屣'],

  ['035.', 12, '人格', '乱世努力泡汤也不后悔'],
  ['035.', 13, '人格', '求仁得仁要知道所居风险'],
  ['035.', 19, '人格', '名誉受损不足惜只要愿无违'],
  ['035.', 20, '人格', '陶渊明立下荣辱标准'],

  ['036.', 5, '政治', '国家刑责不是君主私物'],
  ['036.', 8, '政治', '国民党颠倒忠烈是非'],

  ['037.', 4, '文化', '儒家骂墨子是伪君子'],
  ['037.', 5, '人格', '墨家没落是中国真人没落'],

  ['038.', 6, '人格', '地藏精神是先救众生再成佛'],
  ['038.', 7, '人格', '人只有做事与说风凉话两种'],
  ['038.', 9, '人格', '具体成绩才检定真愿'],
  ['038.', 17, '人格', '做事者常被风凉话拖后腿'],
  ['038.', 22, '人格', '真菩萨行不靠庙宇官位承认'],

  ['039.', 7, '政治', '目标是永久救多数人'],
  ['039.', 8, '政治', '国民党只是现代化路障'],
  ['039.', 9, '政治', '挡成正觉者只好被打倒'],

  ['040.', 2, '人格', '敌人也有入流与不入流'],
  ['040.', 13, '人格', '敌人之间也应公平竞争'],
  ['040.', 14, '文化', '现代敌人失去江湖情调'],

  ['041.', 2, '方法', '退敌学是遇难成祥的学问'],
  ['041.', 6, '政治', '割地赔款和亲也是退敌术'],
  ['041.', 10, '文化', '读经退敌显示妖妄'],
  ['041.', 27, '政治', '中正真人退敌学古不如今'],

  ['042.', 6, '人格', '头号政敌也可表其心'],
  ['042.', 8, '写作', '敌人文字也该保存传世'],
  ['042.', 11, '人格', '褒显敌臣可伸正气'],

  ['043.', 3, '人格', '对小人有消极积极两路'],
  ['043.', 5, '文化', '打小人只是精神胜利'],
  ['043.', 6, '人格', '大丈夫惩小人要用正义法律'],

  ['044.', 3, '文化', '经的范围被尊古狂热扩大'],
  ['044.', 6, '方法', '周易本是卜筮手册'],
  ['044.', 8, '方法', '易传越帮越忙'],
  ['044.', 32, '方法', '易经中的孔子是假造的'],
  ['044.', 38, '方法', '孔子与易关系是附会'],
  ['044.', 42, '方法', '易在孔子眼中不能等量齐观'],
  ['044.', 48, '文化', '易玄理化后攀附孔子'],
  ['044.', 49, '方法', '圣人作易说多是造谣'],
  ['044.', 50, '文化', '系辞把百物发明归给易'],
  ['044.', 53, '文化', '易在经典排名战中成龙头'],

  ['045.', 2, '写作', '诗应救济人病裨补时阙'],
  ['045.', 22, '政治', '统治者德政往往有始无终'],
  ['045.', 25, '人格', '知识分子合作权力会如驯犀'],
  ['045.', 26, '人格', '知识分子有不合作必要'],
];

function resolveSourceFile(prefix) {
  if (prefix === '自序') {
    const sourceFile = sourceFiles.find((name) => name.includes('自序'));
    if (!sourceFile) throw new Error('Cannot find self-preface source file');
    return sourceFile;
  }

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
  return fileName.replace(/^\d+\./u, '').replace(/^《中国命研究》/u, '').replace(/\.txt$/u, '');
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
  '- 保留可独立检索的命定论、天与神、泰山生死信仰、亡国与殉国、死亡观、万岁与奴才、刑求自白、白鸭顶罪、人格节义、敌友方法和经典考据判断。',
  '- 删除目录、日期、电子书页脚、纯引文、神名地名清单、封禅铺陈清单，以及仅作引证而无李敖判断的长引文。',
  '- 长篇考据文章优先取能显示方法或结论的段落，不把材料清单整体搬入索引。',
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
