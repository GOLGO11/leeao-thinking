import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 90;
const bookTitle = '笑傲六十年·有话说李敖';
const sequence = String(bookSeq).padStart(3, '0');
const round = '提取轮';
const status = '待校对';
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

function findRequired(parent, predicate, label) {
  const found = fs.readdirSync(parent).find(predicate);
  if (!found) throw new Error(`Cannot find ${label} under ${parent}`);
  return found;
}

const sourceRootName = findRequired(rootDir, (name) => name.includes('大李敖全集6.0'), 'source root');
const sourceCategoryName = findRequired(path.join(rootDir, sourceRootName), (name) => name.startsWith('010.'), 'source category');
const sourceBookName = findRequired(
  path.join(rootDir, sourceRootName, sourceCategoryName),
  (name) => name.startsWith('010.') && name.includes('笑傲六十年'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((name) => /^\d+\..*\.txt$/u.test(name))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-u-kn-true'));

const candidates = [
  { f: 1, p: 3, category: '政治', title: '国民党撤离叙事是在骗人' },
  { f: 1, p: 4, category: '政治', title: '转进是逃亡话术' },
  { f: 1, p: 5, category: '政治', title: '解放台湾被蒋介石团队延宕' },
  { f: 1, p: 6, category: '政治', title: '六十年纠缠蒋介石团队' },
  { f: 1, p: 7, category: '政治', title: '台湾富足不能感谢日本' },
  { f: 1, p: 8, category: '知识', title: '钱穆鼓励过早年李敖' },
  { f: 1, p: 10, category: '写作', title: '片瓦能写出凄凉' },
  { f: 1, p: 14, category: '政治', title: '早年就想离开台湾回祖国' },
  { f: 1, p: 16, category: '政治', title: '留在鬼岛是失败的偷渡史' },
  { f: 1, p: 17, category: '人格', title: '有骨气要把尸体也做证据' },
  { f: 1, p: 20, category: '人格', title: '特立独行反对旧式丧礼' },
  { f: 1, p: 21, category: '方法', title: '婚丧喜庆可以礼到人不到' },
  { f: 1, p: 22, category: '法权', title: '监察院长应该行动而非空谈' },
  { f: 1, p: 28, category: '情爱', title: '爱情应断因为情会老' },
  { f: 1, p: 30, category: '人格', title: '学术圈外的野狐也会被出局' },

  { f: 2, p: 3, category: '方法', title: '说得出的话才能得到人的心' },
  { f: 2, p: 6, category: '政治', title: '国民党军队容不下非党人' },
  { f: 2, p: 12, category: '知识', title: '纵贯线自由中国不知民间疾苦' },
  { f: 2, p: 13, category: '方法', title: '真正真相要靠明察暗访' },
  { f: 2, p: 15, category: '政治', title: '黑社会本来要杀李敖' },
  { f: 2, p: 16, category: '政治', title: '江南成了李敖的替死鬼' },
  { f: 2, p: 20, category: '人格', title: '老兵返乡的梦会碎掉' },
  { f: 2, p: 22, category: '法权', title: '老兵李师科也有他的正义' },
  { f: 2, p: 24, category: '法权', title: '要替无声者讲公道话' },
  { f: 2, p: 25, category: '人格', title: '明知不会当选也要替弱者发声' },
  { f: 2, p: 26, category: '写作', title: '文星翻江倒海是李敖出现' },
  { f: 2, p: 29, category: '法权', title: '文星时代的书大多被查禁' },
  { f: 2, p: 30, category: '写作', title: '李敖水准高于文星' },
  { f: 2, p: 32, category: '写作', title: '敌人也会肯定文星丰功伟业' },
  { f: 2, p: 34, category: '写作', title: '文星只是兴风作浪的踏板' },
  { f: 2, p: 35, category: '写作', title: '骂人光环来自文星' },
  { f: 2, p: 36, category: '方法', title: '不顶嘴能少挨骂' },
  { f: 2, p: 37, category: '政治', title: '文星抄家才与国民党翻脸' },
  { f: 2, p: 38, category: '文化', title: '文化思想能挖掉国民党根' },
  { f: 2, p: 39, category: '人格', title: '黑暗星光之后更桀骜' },

  { f: 3, p: 5, category: '人格', title: '胡适一千元救急见恩义' },
  { f: 3, p: 9, category: '文化', title: '胡适铜像象征改革开放的信心' },
  { f: 3, p: 10, category: '知识', title: '要分清启蒙胡适和蒋友胡适' },
  { f: 3, p: 11, category: '政治', title: '胡适劝蒋介石分党促民主' },
  { f: 3, p: 12, category: '知识', title: '胡适在台湾未完成自由民主' },
  { f: 3, p: 14, category: '人格', title: '求士比交友更能保身后不朽' },
  { f: 3, p: 18, category: '法权', title: '查禁会让作者赔老本' },
  { f: 3, p: 20, category: '法权', title: '切掉书名也是查禁羞辱' },
  { f: 3, p: 21, category: '人格', title: '对国民党团队不谅解' },
  { f: 3, p: 24, category: '法权', title: '言论自由争取时常只是空话' },
  { f: 3, p: 25, category: '人格', title: '一个人也要撑住查禁局面' },
  { f: 3, p: 26, category: '知识', title: '禁书残本是人类禁书史文献' },
  { f: 3, p: 27, category: '人格', title: '在台湾做自己要付反抗代价' },
  { f: 3, p: 30, category: '政治', title: '查禁十书是七十四年怪现状之尤' },
  { f: 3, p: 31, category: '法权', title: '白色恐怖像天罗地网' },
  { f: 3, p: 32, category: '法权', title: '媒体封锁才是真白色恐怖' },
  { f: 3, p: 37, category: '文化', title: '集中营不可以美化' },
  { f: 3, p: 38, category: '人格', title: '耶稣受审也不讲话' },
  { f: 3, p: 39, category: '情爱', title: '白色生分是红色玫瑰' },
  { f: 3, p: 41, category: '法权', title: '小刑求也直达内心' },
  { f: 3, p: 42, category: '人格', title: '刑求中也能怪原子笔' },
  { f: 3, p: 43, category: '人格', title: '肉体背叛时精神仍可抵抗' },
  { f: 3, p: 44, category: '法权', title: '坐牢比牛棚还牛棚' },

  { f: 4, p: 4, category: '写作', title: '监狱经验要写成书信和剧本' },
  { f: 4, p: 8, category: '法权', title: '冤狱比例高得可笑又带泪' },
  { f: 4, p: 9, category: '写作', title: '独白下的传统是书名翻身' },
  { f: 4, p: 10, category: '写作', title: '修辞可以让吹牛变成记忆' },
  { f: 4, p: 12, category: '写作', title: '制造事实才能让李敖复出' },
  { f: 4, p: 16, category: '法权', title: '黑牢文章能掀开监狱黑暗' },
  { f: 4, p: 17, category: '人格', title: '冲决网罗才算报复' },
  { f: 4, p: 18, category: '法权', title: '争取言论自由要正式宣战' },
  { f: 4, p: 19, category: '政治', title: '第二次政治犯后决心报复' },
  { f: 4, p: 21, category: '写作', title: '每月十万字连续写十年' },
  { f: 4, p: 22, category: '写作', title: '出书可以替代被禁杂志' },
  { f: 4, p: 23, category: '法权', title: '查禁一本也照样出一本' },
  { f: 4, p: 24, category: '写作', title: '禁书记录也是世界级记录' },
  { f: 4, p: 28, category: '方法', title: '查禁成本会抬高书价' },
  { f: 4, p: 29, category: '方法', title: '禁书混在黄色书刊里卖' },
  { f: 4, p: 34, category: '法权', title: '搜查禁书程序可以被反击' },
  { f: 4, p: 35, category: '法权', title: '打官司五年也能赢' },
  { f: 4, p: 36, category: '法权', title: '许历农认错证明言论自由可开放' },
  { f: 4, p: 38, category: '政治', title: '选的是中国台湾地区领导人' },
  { f: 4, p: 39, category: '人格', title: '游戏政治也不加入任何党' },
  { f: 4, p: 41, category: '政治', title: '选举是思想运动和特技表演' },
  { f: 4, p: 44, category: '写作', title: '政见越短越见中文本领' },
  { f: 4, p: 47, category: '政治', title: '不能向孙中山宣誓' },
  { f: 4, p: 49, category: '政治', title: '政治是君子不得已而为之' },
  { f: 4, p: 50, category: '政治', title: '不得已玩政治不是本色' },
  { f: 4, p: 54, category: '政治', title: '参加伪国会是为了颠覆它' },
  { f: 4, p: 55, category: '方法', title: '开玩笑也是颠覆方法' },

  { f: 5, p: 3, category: '政治', title: '议会规则只对真民主有意义' },
  { f: 5, p: 4, category: '方法', title: '假民主地区就要闹' },
  { f: 5, p: 7, category: '方法', title: '瓦斯比憋尿和跑厕所有效' },
  { f: 5, p: 11, category: '政治', title: '裸抗也能成为反军购表达' },
  { f: 5, p: 12, category: '政治', title: '台湾军购挡不住共产党' },
  { f: 5, p: 14, category: '政治', title: '三百亿只买到死讯' },
  { f: 5, p: 15, category: '政治', title: '铺路爪雷达是给美国买眼睛' },
  { f: 5, p: 16, category: '政治', title: '连战也要负军购责任' },
  { f: 5, p: 17, category: '政治', title: '蓝绿都会护航军购' },
  { f: 5, p: 18, category: '政治', title: '马英九道歉没有改变结果' },
  { f: 5, p: 20, category: '法权', title: '台湾关系法是荒谬的国内法' },
  { f: 5, p: 21, category: '法权', title: '既然保护美国利益就该送武器' },
  { f: 5, p: 25, category: '政治', title: '美国历史上祸害中国台湾' },
  { f: 5, p: 28, category: '政治', title: '美国没有资格谈祸延无辜' },
  { f: 5, p: 29, category: '政治', title: '台湾被美国宣传污染' },
  { f: 5, p: 30, category: '政治', title: '美国生活标准不能输出' },
  { f: 5, p: 33, category: '政治', title: '慰安妇义卖是为了打败日本羞辱' },
  { f: 5, p: 36, category: '情爱', title: '妻太聪明夫太怪' },
  { f: 5, p: 42, category: '人格', title: '开刀也可以洒脱幽默' },
  { f: 5, p: 52, category: '情爱', title: '结婚秘诀是慎重选择前妻' },

  { f: 6, p: 2, category: '政治', title: '李敖不是旁观者而是见证人' },
  { f: 6, p: 3, category: '政治', title: '台湾假历史靠中华民国亡国支撑' },
  { f: 6, p: 4, category: '政治', title: '谴责蒋介石在于卖国' },
  { f: 6, p: 5, category: '人格', title: '反对敌人不能把自己怄死' },
  { f: 6, p: 6, category: '政治', title: '台湾的民主自由台独都是假的' },
  { f: 6, p: 7, category: '知识', title: '鲁迅的宽恕常被误读' },
  { f: 6, p: 8, category: '政治', title: '蒋介石政权遗毒是卖国媚美拦路' },
  { f: 6, p: 9, category: '知识', title: '历史上面是有是非的' },
  { f: 6, p: 10, category: '人格', title: '我是战斗型不是先烈型' },
  { f: 6, p: 11, category: '人格', title: '六十年下残棋有悔恨' },
  { f: 6, p: 12, category: '政治', title: '爱国不是世界公民幻想' },
  { f: 6, p: 14, category: '政治', title: '新一代爱国者用自己的方法表达' },
  { f: 6, p: 15, category: '方法', title: '目的和过程可以分开取胜' },
  { f: 6, p: 16, category: '方法', title: '目的远在天边过程更重要' },
  { f: 6, p: 18, category: '文化', title: '要用好中文发扬中文' },
  { f: 6, p: 20, category: '文化', title: '抢救中文是未来使命' },
  { f: 6, p: 22, category: '写作', title: '李敖真正市场在祖国' },
  { f: 6, p: 24, category: '政治', title: '回祖国不能用乡愁眼光' },
  { f: 6, p: 26, category: '政治', title: '收回香港证明共产党带来光荣' },
  { f: 6, p: 27, category: '政治', title: '革命完了要请客吃饭' },
  { f: 6, p: 32, category: '人格', title: '创格完人来自人格和风格' },
];

const keywordCandidates = [
  '李敖', '台湾', '中国', '祖国', '国民党', '蒋介石', '马英九', '胡适', '钱穆',
  '文星', '查禁', '言论自由', '白色恐怖', '监狱', '政治犯', '军购', '美国',
  '日本', '台独', '中华民国', '历史', '中文', '写作', '爱情', '老兵', '法权',
  '人格', '方法', '文化', '情爱',
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/gu, ' ').trim();
}

function readParagraphs(sourceFile) {
  const text = decoder.decode(fs.readFileSync(path.join(sourceDir, sourceFile)));
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/u)
    .map(normalize)
    .filter(Boolean);
}

function sourceTopic(sourceFile) {
  return sourceFile
    .replace(/^\d+\./u, '')
    .replace(/^\d{8}/u, '')
    .replace(/\.txt$/u, '')
    .trim();
}

function keywordsFor(candidate, sourceFile) {
  const text = `${candidate.title} ${candidate.category} ${sourceFile}`;
  const picked = [candidate.category];
  for (const keyword of keywordCandidates) {
    if (text.includes(keyword) && !picked.includes(keyword)) {
      picked.push(keyword);
    }
    if (picked.length >= 4) break;
  }
  if (picked.length < 3) {
    picked.push(sourceTopic(sourceFile));
  }
  return [...new Set(picked)].slice(0, 4);
}

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function toCsv(records) {
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
  return `${[
    headers.join(','),
    ...records.map((record) => headers.map((header) => {
      if (header === 'keywords') return csvEscape(record.keywords.join(';'));
      return csvEscape(record[header]);
    }).join(',')),
  ].join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（提取轮）`,
    '',
    `- 书名：${bookTitle}`,
    `- 轮次：${round}`,
    `- 状态：${status}`,
    `- 条目数：${records.length}`,
    '- 说明：标题用于检索浓缩，description 保留源文本原段落。',
    '',
  ];
  for (const record of records) {
    lines.push(`## ${record.id}. ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file}#${record.source_paragraph}`);
    lines.push(`- 关键词：${record.keywords.join('、')}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => [
    `${record.id}. ${record.title}`,
    `分类：${record.category}`,
    `来源：${record.source_file}#${record.source_paragraph}`,
    `关键词：${record.keywords.join('、')}`,
    record.description,
  ].join('\n')).join('\n\n')}\n`;
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({ category, count: records.filter((record) => record.category === category).length }))
    .filter((item) => item.count > 0);
}

const paragraphCache = new Map();
function paragraphFor(sourceFile, paragraphNumber) {
  if (!paragraphCache.has(sourceFile)) {
    paragraphCache.set(sourceFile, readParagraphs(sourceFile));
  }
  const paragraph = paragraphCache.get(sourceFile)[paragraphNumber - 1];
  if (!paragraph) {
    throw new Error(`Missing paragraph ${sourceFile}#${paragraphNumber}`);
  }
  return paragraph;
}

const seenSource = new Set();
const records = candidates.map((candidate, index) => {
  if (!taxonomy.includes(candidate.category)) {
    throw new Error(`Unknown category for candidate ${index + 1}: ${candidate.category}`);
  }
  const sourceFile = sourceFiles[candidate.f - 1];
  if (!sourceFile) {
    throw new Error(`Unknown source file index ${candidate.f}`);
  }
  const sourceKey = `${sourceFile}#${candidate.p}`;
  if (seenSource.has(sourceKey)) {
    throw new Error(`Duplicate source paragraph ${sourceKey}`);
  }
  seenSource.add(sourceKey);

  return {
    id: `LAT${sequence}-${String(index + 1).padStart(3, '0')}`,
    book: bookTitle,
    round,
    status,
    category: candidate.category,
    title: candidate.title,
    description: paragraphFor(sourceFile, candidate.p),
    source_file: sourceFile,
    source_paragraph: candidate.p,
    source_path: path.join(sourceBookDir, sourceFile).replaceAll(path.sep, '/'),
    keywords: keywordsFor(candidate, sourceFile),
  };
});

const titleCounts = new Map();
for (const record of records) {
  titleCounts.set(record.title, (titleCounts.get(record.title) || 0) + 1);
}
const duplicateTitles = [...titleCounts.entries()].filter(([, count]) => count > 1);
if (duplicateTitles.length) {
  throw new Error(`Duplicate titles: ${duplicateTitles.map(([title]) => title).join('；')}`);
}

const book = {
  sequence,
  title: bookTitle,
  slug: 'xiaoao-liushi-nian-youhuashuo-leeao',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note: '本轮从《笑傲六十年·有话说李敖》六集回顾节目稿中提取思想索引。源文以李敖自述和少量访谈插入组成，本轮排除目录、制作信息、资源信息、嘉宾单独评价和纯现场展示段；优先保留李敖关于历史真相、白色恐怖、文星禁书、政治行动、反军购、美国日本、中文使命、人格风格和情爱关系的可独立检索判断段。标题用于检索浓缩，description 保留源文本原段落。',
  source_file_count: sourceFiles.length,
  record_count: records.length,
  candidate_count: candidates.length,
  skipped_duplicate_count: 0,
  skipped_duplicates: [],
  category_counts: categoryCounts(records),
};

const payload = { book, records };

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.csv'), toCsv(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-提取轮.md'), toMarkdown(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '提取说明.md'), [
  `# ${bookTitle} 提取说明`,
  '',
  `- 源目录：${book.sourceDir}`,
  `- 正文章节：${sourceFiles.length}`,
  `- 提取条目：${records.length}`,
  '- 轮次：提取轮，待校对。',
  '- 取舍：保留李敖自己的判断段，剔除目录、制作信息、资源信息、嘉宾单独评价、纯图片展示和上下文依附过强的串场段。',
  '- 原文：description 字段逐条取自 GB18030 源文本段落，不做改写。',
  '',
  '## 分类分布',
  '',
  ...book.category_counts.map((item) => `- ${item.category}：${item.count}`),
  '',
].join('\n'), 'utf8');

console.log(JSON.stringify({
  book: bookTitle,
  sourceFiles: sourceFiles.length,
  records: records.length,
  category_counts: book.category_counts,
  outputDir: path.relative(rootDir, outputDir),
}, null, 2));
