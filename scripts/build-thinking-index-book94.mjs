import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 94;
const sequence = String(bookSeq).padStart(3, '0');
const bookTitle = '李敖放电集';
const slug = 'leeao-fangdian-collection';
const round = '提取轮';
const status = '待校对';
const decoder = new TextDecoder('gb18030');
const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const sourceBookDir = path.join(
  '《大李敖全集6.0》分章节',
  '011.李敖电子报',
  '001.李敖放电集',
);
const sourceDir = path.join(rootDir, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', `${sequence}.${bookTitle}`);

const specs = [
  ['001.《李敖电子报》五书总序.txt', 3, '电子报是阶段性使命', '写作', ['电子报', '写作', '阶段']],
  ['002.1999年11月1日.txt', 3, '口述改变写作方式', '写作', ['电子报', '口述', '写作']],
  ['002.1999年11月1日.txt', 4, '电子报是实名厕所文学', '写作', ['电子报', '网络', '实名']],
  ['002.1999年11月1日.txt', 5, '电子报让个人办报更轻', '写作', ['电子报', '办报', '科技']],
  ['002.1999年11月1日.txt', 6, '电子报接续求是报远景', '写作', ['求是报', '电子报', '言论']],
  ['002.1999年11月1日.txt', 11, '审查连字眼也不放过', '法权', ['审查', '广告', '言论']],
  ['002.1999年11月1日.txt', 18, '科技让口述写作可行', '写作', ['科技', '口述', '丘吉尔']],
  ['002.1999年11月1日.txt', 22, '审美标准随时代改变', '情爱', ['审美', '胖妹', '时代']],
  ['002.1999年11月1日.txt', 24, '虚拟爱情不该落实收费', '情爱', ['虚拟', '爱情', '网络']],
  ['002.1999年11月1日.txt', 26, '有名的人也该自嘲', '人格', ['自嘲', '名人', '幽默']],
  ['002.1999年11月1日.txt', 32, '中文修辞要出神入化', '文化', ['中文', '修辞', '袁枚']],
  ['003.1999年11月2日.txt', 3, '好书首先推荐自己的著作', '写作', ['著作', '推荐', '读者']],
  ['003.1999年11月2日.txt', 5, '幸福不在远方而在眼前', '人格', ['幸福', '当下', '生活']],
  ['003.1999年11月2日.txt', 10, '民主不能强奸民意', '政治', ['民主', '民意', '李登辉']],
  ['003.1999年11月2日.txt', 12, '逃兵在骂逃兵', '政治', ['逃兵', '民主', '李远哲']],
  ['003.1999年11月2日.txt', 14, '词典不能漏掉活汉语', '文化', ['汉语', '词典', '白虎']],
  ['003.1999年11月2日.txt', 16, '言论管制也是性恐惧', '法权', ['出版自由', '新闻局', '性']],
  ['003.1999年11月2日.txt', 18, '金钱外交会人财两空', '政治', ['外交', '台湾', '马其顿']],
  ['003.1999年11月2日.txt', 20, '中华文化连毛笔字都失败', '文化', ['毛笔字', '中华文化', '李登辉']],
  ['003.1999年11月2日.txt', 21, '毛笔字也要有才气', '文化', ['毛笔字', '才气', '书法']],
  ['004.1999年11月3日.txt', 11, '真的历史靠史料呈现', '知识', ['历史', '史料', '宋美龄']],
  ['004.1999年11月3日.txt', 13, '宋美龄同胞观可由史料见', '政治', ['宋美龄', '中国大陆', '史料']],
  ['004.1999年11月3日.txt', 16, '造假诗境背离学术交流', '文化', ['余光中', '学术交流', '造假']],
  ['004.1999年11月3日.txt', 18, '两岸政策不能单向思考', '政治', ['陈水扁', '三通', '两岸']],
  ['005.1999年11月4日.txt', 5, '买票政治戳破民主先生', '政治', ['买票', '民主', '李登辉']],
  ['005.1999年11月4日.txt', 7, '改名不能维持国格', '政治', ['国格', '泰国', '中华民国']],
  ['005.1999年11月4日.txt', 10, '马屁不能遮蔽史料证据', '知识', ['宋美龄', '证据', '马屁']],
  ['005.1999年11月4日.txt', 14, '暴民民主扭曲专业鉴定', '政治', ['暴民民主', '鉴定', '专业']],
  ['005.1999年11月4日.txt', 16, '决断不能交给暴民挑选', '政治', ['决断', '暴民', '证明']],
  ['006.1999年11月5日.txt', 3, '台湾政客多于政治家', '政治', ['政治家', '政客', '台湾']],
  ['006.1999年11月5日.txt', 14, '争自由要文细武粗', '政治', ['自由', '民主', '苏秋镇']],
  ['006.1999年11月5日.txt', 16, '维护人民权益要紧追不舍', '政治', ['人民权益', '立法', '苏秋镇']],
  ['006.1999年11月5日.txt', 18, '政治家敢说逆耳真话', '政治', ['政治家', '真话', '大陆']],
  ['006.1999年11月5日.txt', 19, '政治家的终点可成起点', '人格', ['苏秋镇', '死亡', '台湾人']],
  ['006.1999年11月5日.txt', 23, '特务治国已做不到', '政治', ['特务治国', '宋楚瑜', '李登辉']],
  ['006.1999年11月5日.txt', 26, '逃兵有知耻与祸害之分', '政治', ['逃兵', '李远哲', '沈富雄']],
  ['006.1999年11月5日.txt', 28, '台湾人不能把美国当跳板', '政治', ['美国', '台湾人', '移民']],
  ['006.1999年11月5日.txt', 30, '改诗要显出中文高下', '写作', ['余光中', '中文', '改诗']],
  ['007.1999年11月8日.txt', 7, '公产占用要查究', '法权', ['秦孝仪', '公产', '查究']],
  ['007.1999年11月8日.txt', 8, '承诺处理不能放空', '法权', ['国防部长', '承诺', '公产']],
  ['007.1999年11月8日.txt', 67, '烂中文不配做诗人', '写作', ['余光中', '中文', '诗人']],
  ['008.1999年11月9日.txt', 6, '健康社会需要批判者', '人格', ['社会批评', '健康社会', '批判者']],
  ['008.1999年11月9日.txt', 7, '批评要靠资料系统', '方法', ['资料', '批评', '证据']],
  ['008.1999年11月9日.txt', 11, '自由仍会被经济压制', '法权', ['自由', '经济制压', '箝制']],
  ['008.1999年11月9日.txt', 15, '查封可以用多执照反制', '方法', ['查封', '出版', '执照']],
  ['008.1999年11月9日.txt', 18, '不担心害怕才能活下去', '人格', ['威胁', '勇敢', '恐惧']],
  ['008.1999年11月9日.txt', 37, '狱底有游魂我就不自由', '法权', ['自由', '监狱', '戴布兹']],
  ['008.1999年11月9日.txt', 45, '证据不是要求现场目击', '方法', ['证据', '史料', '宋美龄']],
  ['009.1999年11月10日.txt', 7, '以夷制中国比汉奸更贱', '政治', ['李登辉', '日本', '中国']],
  ['009.1999年11月10日.txt', 9, '夹击策略会反噬自己', '知识', ['历史', '夹击', '宋朝']],
  ['009.1999年11月10日.txt', 13, '笔记本不能替代录音证据', '方法', ['证据', '录音', '笔记']],
  ['009.1999年11月10日.txt', 14, '放空气后狡赖仍会露馅', '政治', ['李登辉', '狡赖', '日本']],
  ['009.1999年11月10日.txt', 19, '诗人没有真情就不成诗人', '写作', ['诗人', '真情', '余光中']],
  ['009.1999年11月10日.txt', 21, '技术可以解决性代用品问题', '情爱', ['硅胶娃娃', '技术', '性']],
  ['009.1999年11月10日.txt', 22, '代用品不否定真实女人', '情爱', ['女人', '代用品', '性']],
  ['010.1999年11月11日.txt', 4, '民进党两岸政策抄旧', '政治', ['陈水扁', '两岸', '民进党']],
  ['010.1999年11月11日.txt', 7, '台湾教科书媚日是自虐', '文化', ['教科书', '慰安妇', '日本']],
  ['010.1999年11月11日.txt', 9, '选举可能叫好不叫座', '政治', ['选举', '副手', '总统']],
  ['010.1999年11月11日.txt', 11, '格局可以抢到天下后变大', '政治', ['宋楚瑜', '副手', '格局']],
  ['010.1999年11月11日.txt', 23, '朋友敌人要以正义利益重写', '政治', ['朋友', '敌人', '正义']],
  ['011.1999年11月12日.txt', 5, '宗教转世政治都妖妄', '文化', ['宗教', '转世', '大宝法王']],
  ['011.1999年11月12日.txt', 8, '不能贪天之功改写历史', '知识', ['台湾关系法', '历史', '证据']],
  ['011.1999年11月12日.txt', 29, '理论家下海写作才见真章', '写作', ['理论', '写作', '批评家']],
  ['011.1999年11月12日.txt', 30, '文字高下需要辨别能力', '写作', ['文字', '译诗', '辨别']],
  ['011.1999年11月12日.txt', 32, '校史不能切断前身', '知识', ['台大', '校史', '历史']],
  ['011.1999年11月12日.txt', 33, '校长任期自肥败坏斯文', '政治', ['台大', '任期', '自肥']],
  ['012.1999年11月15日.txt', 3, '不该替石原背书', '政治', ['石原慎太郎', '马英九', '日本']],
  ['012.1999年11月15日.txt', 6, '外交程序不能被日本占便宜', '政治', ['程序', '日本', '马英九']],
  ['012.1999年11月15日.txt', 9, '城市外交不能代替正式外交', '政治', ['城市外交', '外交', '常识']],
  ['012.1999年11月15日.txt', 10, '石原问题不是城市层次', '政治', ['石原慎太郎', '日本', '中国']],
  ['012.1999年11月15日.txt', 15, '先知与混人同岛是错位', '人格', ['先知', '台湾', '人格']],
  ['013.1999年11月16日.txt', 13, '孤立者之间也有孤立之交', '人格', ['许信良', '孤立', '做人']],
  ['013.1999年11月16日.txt', 16, '建国不能自动抵御日本', '政治', ['建国党', '慰安妇', '日本']],
  ['013.1999年11月16日.txt', 17, '强势能让不同立场俯首', '人格', ['强势', '建国党', '声势']],
  ['013.1999年11月16日.txt', 21, '政治人物会随势利改变', '政治', ['陈水扁', '政治人物', '势利']],
  ['013.1999年11月16日.txt', 23, '文章背后要仁智勇钱', '人格', ['仁', '智', '勇', '独立']],
  ['014.1999年11月17日.txt', 5, '情趣用品要从法规放宽', '情爱', ['硅胶娃娃', '法律', '性']],
  ['014.1999年11月17日.txt', 17, '开明判决会提升视界', '法权', ['判决', '法官', '情趣用品']],
  ['015.1999年11月18日.txt', 5, '与国民党合作会把自己陷进去', '人格', ['知识分子', '国民党', '合作']],
  ['015.1999年11月18日.txt', 7, '知识分子标准是不合作', '人格', ['知识分子', '不合作', '人格']],
  ['015.1999年11月18日.txt', 13, '佛教才是真瞧不起女人', '情爱', ['女人', '佛教', '刘泰英']],
  ['015.1999年11月18日.txt', 22, '道歉必须更正清楚', '方法', ['道歉', '更正', '刘泰英']],
  ['016.1999年11月19日.txt', 3, '自救宣言主调不是台独', '知识', ['自救宣言', '台独', '历史']],
  ['016.1999年11月19日.txt', 19, '不能把历史全改写成台独', '知识', ['历史', '台独', '改写']],
  ['016.1999年11月19日.txt', 42, '情趣用品要靠技术降低价格', '情爱', ['硅胶娃娃', '技术', '价格']],
  ['017.1999年11月22日.txt', 4, '汉人应向原住民致歉', '政治', ['原住民', '致歉', '台湾']],
  ['017.1999年11月22日.txt', 6, '原住民社会役可救部落空洞', '政治', ['原住民', '社会役', '部落']],
  ['017.1999年11月22日.txt', 8, '强迫为娼必须严刑对付', '法权', ['原住民', '娼妓', '法律']],
  ['017.1999年11月22日.txt', 10, '一国两制可用于解决核废料', '政治', ['一国两制', '核废料', '原住民']],
  ['017.1999年11月22日.txt', 12, '原住民意见就是我的意见', '政治', ['原住民', '土地', '文化']],
  ['017.1999年11月22日.txt', 14, '台湾政党仍是乙式政党', '政治', ['政党', '胡适', '台湾']],
  ['017.1999年11月22日.txt', 16, '柔性政党值得新党学习', '政治', ['新党', '美国', '政党']],
  ['017.1999年11月22日.txt', 19, '男女问题不是警察能压住', '情爱', ['男女', '警察', '妓女']],
  ['017.1999年11月22日.txt', 20, '经济问题不是警察能压住', '政治', ['经济', '警察', '蒋经国']],
  ['017.1999年11月22日.txt', 21, '压不住的问题需要智慧', '方法', ['智慧', '经济', '男女']],
  ['018.1999年11月23日.txt', 8, '政党内外是非要分明', '政治', ['新党', '党员', '是非']],
  ['018.1999年11月23日.txt', 9, '骄傲的狼不是备胎', '人格', ['新党', '狼', '尊严']],
  ['018.1999年11月23日.txt', 24, '接待石原有损民族形象', '政治', ['石原慎太郎', '民族', '气节']],
  ['018.1999年11月23日.txt', 31, '勾结日本会出卖钓鱼台', '政治', ['李登辉', '钓鱼台', '日本']],
  ['019.1999年11月24日.txt', 4, '国民党党龄算法是吹牛', '知识', ['国民党', '党史', '兴中会']],
  ['019.1999年11月24日.txt', 6, '国民党历史不能硬衔接', '知识', ['国民党', '历史', '孙中山']],
  ['019.1999年11月24日.txt', 8, '拉长党史是变本加厉', '知识', ['国民党', '党史', '历史']],
  ['019.1999年11月24日.txt', 17, '冥婚违背正统经典', '文化', ['冥婚', '周礼', '传统']],
  ['019.1999年11月24日.txt', 18, '民俗传统不同于经典传统', '文化', ['民俗', '经典', '冥婚']],
  ['019.1999年11月24日.txt', 21, '冥婚故事要放入文化延续理解', '文化', ['冥婚', '台湾', '文化']],
  ['020.1999年11月25日.txt', 4, '英文中译不能短路', '文化', ['翻译', '英文', '马英九']],
  ['020.1999年11月25日.txt', 9, '台奸罪名不可轻予', '法权', ['台奸', '罪名', '民众日报']],
  ['020.1999年11月25日.txt', 10, '禁止入境是无法无天', '法权', ['台奸', '入境', '流刑']],
  ['020.1999年11月25日.txt', 14, '先杀同胞的台奸逻辑恐怖', '法权', ['台奸', '暴徒', '同胞']],
  ['020.1999年11月25日.txt', 18, '帽子可以被随意滥用', '法权', ['汉奸', '台奸', '帽子']],
  ['021.1999年11月26日.txt', 3, '不求甚解不是马虎读书', '方法', ['读书', '不求甚解', '陶渊明']],
  ['021.1999年11月26日.txt', 9, '一国两制利台部分被扭曲', '政治', ['一国两制', '台湾', '邓小平']],
  ['021.1999年11月26日.txt', 39, '看政策要看上下文轨迹', '方法', ['一国两制', '上下文', '政策']],
  ['022.1999年11月29日.txt', 4, '去掉地域才见胸襟', '政治', ['陈水扁', '地域', '孔子']],
  ['022.1999年11月29日.txt', 5, '地方本位显出小器', '政治', ['陈水扁', '台南', '胸襟']],
  ['022.1999年11月29日.txt', 26, '邓小平香港谈话言而有信', '政治', ['邓小平', '香港', '一国两制']],
  ['023.1999年11月30日.txt', 5, '反对党前辈要保持尊严', '政治', ['黄信介', '反对党', '尊严']],
  ['023.1999年11月30日.txt', 6, '本省外省之别显出狭陋', '政治', ['黄信介', '本省外省', '台湾']],
  ['023.1999年11月30日.txt', 25, '一国两制对台湾是大利多', '政治', ['一国两制', '台湾', '和平统一']],
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

function csvEscape(value) {
  const text = Array.isArray(value) ? value.join('；') : String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
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
  fs.writeFileSync(filePath, `${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(filePath, records) {
  const lines = [
    `# ${bookTitle}思想索引（${round}）`,
    '',
    `共 ${records.length} 条。标题为检索浓缩，描述保留源文本原段落。`,
    '',
  ];
  for (const record of records) {
    lines.push(`## ${record.id} ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file} #${record.source_paragraph}`);
    lines.push(`- 关键词：${record.keywords.join('、')}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeTxt(filePath, records) {
  const lines = [];
  for (const record of records) {
    lines.push(`${record.id}｜${record.category}｜${record.title}`);
    lines.push(`来源：${record.source_file} #${record.source_paragraph}`);
    lines.push(record.description);
    lines.push('');
  }
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

const paragraphCache = new Map();
const records = specs.map(([sourceFile, sourceParagraph, title, category, keywords], index) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category ${category} for ${title}`);
  }
  if (!paragraphCache.has(sourceFile)) {
    paragraphCache.set(sourceFile, readParagraphs(sourceFile));
  }
  const paragraphs = paragraphCache.get(sourceFile);
  const description = paragraphs[sourceParagraph - 1];
  if (!description) {
    throw new Error(`Missing paragraph ${sourceFile} #${sourceParagraph}`);
  }
  return {
    id: `LAT${sequence}-${String(index + 1).padStart(3, '0')}`,
    book: bookTitle,
    round,
    status,
    category,
    title,
    description,
    source_file: sourceFile,
    source_paragraph: sourceParagraph,
    source_path: path.join(sourceBookDir, sourceFile).replace(/\\/g, '/'),
    keywords,
  };
});

const sourceFiles = fs
  .readdirSync(sourceDir)
  .filter((name) => /^\d+\..*\.txt$/u.test(name))
  .sort((a, b) => a.localeCompare(b, 'zh-Hans-u-kn-true'));
const sourceParagraphCount = sourceFiles
  .map((sourceFile) => readParagraphs(sourceFile).length)
  .reduce((sum, count) => sum + count, 0);

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    sequence,
    title: bookTitle,
    slug,
    sourceDir: sourceBookDir.replace(/\\/g, '/'),
    round,
    status,
    note: '本轮从《李敖放电集》1999年11月电子报文本中提取思想索引。源文为短评、公开信、资料揭露、法院判决引述和一国两制文献整理的混合体；本轮优先保留李敖自己的判断、方法、批评和引证目的，减少纯目录、纯来信、纯判决长引和纯邓小平原文。标题用于检索浓缩，description 保留源文本原段落。',
    source_file_count: sourceFiles.length,
    source_paragraph_count: sourceParagraphCount,
    eligible_count: records.length,
    record_count: records.length,
    skipped_duplicate_count: 0,
    skipped_duplicates: [],
    skipped_files: ['《李敖放电集》目录.txt'],
    category_counts: categoryCounts(records),
  },
  taxonomy,
  records,
};

fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(
  path.join(outputDir, '思想索引-提取轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-提取轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), records);
fs.writeFileSync(
  path.join(outputDir, '思想索引.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引.csv'), records);
writeTxt(path.join(outputDir, '思想索引.txt'), records);
fs.writeFileSync(
  path.join(outputDir, '提取说明.md'),
  [
    `# ${bookTitle}提取说明`,
    '',
    `- 轮次：${round}`,
    `- 状态：${status}`,
    `- 来源目录：${payload.book.sourceDir}`,
    `- 来源文件：${sourceFiles.length}`,
    `- 来源段落：${sourceParagraphCount}`,
    `- 提取条目：${records.length}`,
    '',
    '## 取舍说明',
    '',
    '- 保留李敖自己的判断段、方法段、批评段，以及能说明他为何引证资料的段落。',
    '- 减少纯目录、纯读者来信、纯法院判决长文、纯邓小平原文和广告信息。',
    '- 标题为检索浓缩，description 未改写，严格取自源文本对应段落。',
    '',
    '## 分类统计',
    '',
    ...payload.book.category_counts.map((item) => `- ${item.category}：${item.count}`),
    '',
  ].join('\n'),
  'utf8',
);

console.log(JSON.stringify({
  book: bookTitle,
  records: records.length,
  source_files: sourceFiles.length,
  source_paragraphs: sourceParagraphCount,
  category_counts: payload.book.category_counts,
}, null, 2));
