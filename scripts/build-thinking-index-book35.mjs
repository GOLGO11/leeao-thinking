import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const fictionGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('004.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, fictionGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('005.'));
const sourceDir = path.join(rootDir, sourceRoot, fictionGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '035.阳痿美国');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '035',
  title: '阳痿美国',
  slug: 'yangwei-meiguo',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从剧本正文中提取可独立检索的思想段落；重点收美国例外论、帝国扩张、奴隶与排华、人权法治、国际法、对华政策、台湾问题、媒体包装、冷战反共、反恐战争和美元霸权等材料。纯情节推进、舞台动作、人物插科打诨、过度依赖总统个人逸闻的段落不收；涉及书名性隐喻的段落，仅在其主旨明确落在政治批判时保留，本轮未收露骨场面描写。',
};

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const entries = [
  ['法权', '国内法不能替代世界文明', '002', 88, '美国,袋鼠法庭,国内法,帝国法权'],
  ['方法', '最后审判重在道德细节', '003', 125, '最后审判,道德审判,法律审判,方法'],
  ['人格', '援外慷慨要看真实比例', '003', 163, '援外,慷慨,国家形象,人格'],
  ['法权', '独立宣言要看兑现期限', '004', 35, '独立宣言,黑人自由,自由兑现,法权'],
  ['知识', '世界无知仍要全球伸手', '004', 50, '地理知识,世界认知,伊拉克,知识'],
  ['政治', '美国例外用仁义包装拳头', '005', 14, '美国例外,仁义道德,霸权,政治'],
  ['政治', '黑心霸权伪装红心道德', '005', 22, '美国例外,伪君子,霸权,政治'],
  ['政治', '开国自由只给白人男子', '005', 24, '自由,白人男子,黑人,印第安人,政治'],
  ['法权', '追求自由却惩罚奴隶自由', '006', 37, '自由,奴隶,麦迪逊,人权,法权'],
  ['人格', '体谅不能遮住道德问题', '006', 39, '道德问题,开国元勋,奴隶制,人格'],
  ['政治', '新门罗主义覆盖全世界', '007', 23, '门罗主义,伊拉克,美国式民主,政治'],
  ['方法', '黑人量尺丈量美国伪善', '007', 53, '黑人问题,量尺,伪善,方法'],
  ['政治', '少数总统暴露选制漏洞', '008', 24, '总统选举,少数总统,人民被骗,政治'],
  ['政治', '平民地位提升才算民主政绩', '008', 28, '杰克逊民主,平民政治,人民,政治'],
  ['法权', '反奴记录反证美国不自由', '008', 30, '奴隶制,言论箝制,侵略,法权'],
  ['法权', '印第安条约暴露言而无信', '009', 45, '印第安人,国际条约,主权,法权'],
  ['政治', '人道主义口号包装迁徙政策', '009', 59, '印第安迁徙,人道主义,白人,政治'],
  ['法权', '盗印文学暴露版权双标', '010', 32, '版权,盗印,爱默生,知识产权,法权'],
  ['文化', '形象竞选早成政治技术', '011', 37, '形象竞选,总统竞选,政治文化,文化'],
  ['政治', '趁战争捡便宜成为国策', '012', 7, '鸦片战争,对华政策,捡便宜,政治'],
  ['政治', '望厦条约结合帝国机会主义', '012', 19, '望厦条约,帝国主义,机会主义,政治'],
  ['政治', '鸦片贸易既直接又间接', '012', 21, '鸦片贸易,中国,美国商人,政治'],
  ['法权', '不平等条约靠细节落实', '012', 23, '望厦条约,领事裁判权,关税,法权'],
  ['政治', '墨西哥战争是国际恶霸', '013', 15, '墨西哥战争,正义,国际恶霸,政治'],
  ['政治', '天赋人权滑向天赋地权', '013', 23, '天命孔昭,扩张,帝国主义,政治'],
  ['法权', '政府赔偿藏着利益冲突', '014', 37, '赔偿案,利益冲突,民主,法权'],
  ['人格', '奴隶制首先是道德问题', '015', 11, '奴隶制,政治家,道德问题,人格'],
  ['政治', '个人突击也是帝国工具', '016', 13, '帝国主义,filibuster,资本家,政治'],
  ['政治', '台湾琉球进入扩张设想', '016', 23, '台湾,琉球,对华扩张,政治'],
  ['法权', '宪法花瓶挡不住分裂', '017', 27, '宪法,国家统一,布坎南,法权'],
  ['政治', '一体均沾就是对华捡便宜', '017', 42, '一体均沾,对华外交,英法,政治'],
  ['文化', '美丽文献包装丑陋人权', '018', 19, '共和国,人权记录,文献包装,文化'],
  ['方法', '林肯神话要用真历史校正', '018', 23, '林肯神话,真历史,政治传统,方法'],
  ['政治', '美式民主偷换主宾关系', '018', 45, '美国式民主,人民,政府,政治'],
  ['法权', '解放文告受制军事需要', '018', 49, '解放文告,奴隶制,军事需要,法权'],
  ['政治', '美国统一定型却干扰中国统一', '019', 13, '国家统一,中国统一,台湾关系,政治'],
  ['法权', '台湾关系法制造伪政权悖论', '020', 50, '台湾关系法,伪政权,中国,法权'],
  ['政治', '汤姆原理让被保护者付代价', '020', 60, '汤姆原理,台湾军费,美国利益,政治'],
  ['文化', '软实力擅长颠倒黑白', '020', 64, '软实力,媒体,台湾,文化'],
  ['法权', '排华法案背叛移民道德', '021', 13, '排华法案,移民国家,中国劳工,法权'],
  ['法权', '宪法不能成为不履约借口', '021', 23, '丹佛暴动,宪法,国际条约,法权'],
  ['法权', '条约遇宪法即被废弃', '021', 25, '条约,宪法,美国政府,法权'],
  ['法权', '猪仔贩卖背离自由传统', '022', 30, '华工,猪仔贩卖,信仰自由,法权'],
  ['法权', '暂停入境是换汤不换药', '023', 11, '排华,暂停入境,公民资格,法权'],
  ['法权', '排华制造唯一排斥对象', '023', 15, '排华法案,中国人,白人排外,法权'],
  ['法权', '中央管不了地方成为赖账话术', '024', 11, '华人保护,地方行政,赔偿责任,法权'],
  ['法权', '违宪确认后仍可不负责', '024', 14, '旧金山,宪法第14修正案,条约,法权'],
  ['法权', '排华体系无限期延长', '024', 16, '排华,移民区域,无资格区,法权'],
  ['政治', '台上人道败给帝国身份', '025', 23, '两面美国,夏威夷,帝国,政治'],
  ['政治', '侵略中国后推广到全世界', '026', 13, '八国联军,侵略中国,帝国主义,政治'],
  ['政治', '解放菲律宾口号下大杀戮', '026', 17, '菲律宾,独立,文明使命,政治'],
  ['文化', '西藏神权不是文明样板', '027', 55, '西藏,神权统治,宗教,文化'],
  ['政治', '达赖牌靠人权和平包装', '027', 67, '达赖,西藏,人权,政治'],
  ['政治', '国际警察堕落为国际强盗', '027', 71, '罗斯福定理,国际警察,帝国主义,政治'],
  ['政治', '金元外交就是经济侵略', '028', 21, '金元外交,经济渗透,门罗主义,政治'],
  ['政治', '菲律宾独立被拖成帝国负担', '028', 34, '菲律宾,独立,美菲战争,政治'],
  ['政治', '理想主义掩盖帝国定型', '029', 43, '威尔逊,美国人民史,帝国主义,政治'],
  ['法权', '红色恐怖下自由失效', '029', 63, '红色恐怖,自由,人权,法权'],
  ['法权', '战时法律压制批评言论', '029', 67, '间谍法,煽动叛乱法,言论,法权'],
  ['政治', '武力推动美式民主很荒谬', '029', 89, '美国式民主,武力,使命,政治'],
  ['政治', '联合国态度显出高调破产', '030', 66, '国际联盟,联合国,孤立主义,政治'],
  ['政治', '太平洋活动证明并非孤立', '030', 69, '孤立主义,太平洋,对华条约,政治'],
  ['知识', '对东方无知却指手画脚', '030', 74, '东方,中国,认知,知识'],
  ['法权', '移民法用比例排斥亚洲', '031', 21, '移民法,配额,日本,中国,法权'],
  ['文化', '媒体强权压过别人的声音', '032', 64, '媒体力量,宣传,世界舆论,文化'],
  ['政治', '镇压学生不是制度专利', '032', 65, '肯特大学,学生运动,镇压,政治'],
  ['政治', '国际组织高调下仍出卖中国', '033', 41, '威尔逊,罗斯福,中国,联合国,政治'],
  ['政治', '支援侵华日本也是血史', '033', 47, '日本侵华,美国军火,中国,政治'],
  ['政治', '小国自由牺牲于强权谈判', '033', 49, '雅尔塔,强权谈判,小国自由,政治'],
  ['政治', '美元霸权靠印钞机吃世界', '033', 77, '美元,金本位,世界经济,政治'],
  ['法权', '原子弹判例指向国际法', '034', 40, '原子弹,国际法,日本判例,法权'],
  ['法权', '合法胁迫也能损害政敌', '034', 54, '卓别林,曼恩法,合法胁迫,法权'],
  ['政治', '军火贸易背叛世界和平', '034', 82, '日本侵华,军火商,世界和平,政治'],
  ['政治', '台湾伪政权连承认也没有', '034', 90, '台湾,伪政权,国民党,政治'],
  ['政治', '拉美民主杀手由学校培训', '034', 104, '美洲学校,拉丁美洲,独裁者,政治'],
  ['法权', '麦卡锡主义反法治自由', '034', 108, '史密斯法,麦卡锡,反法治,法权'],
  ['政治', '军工体系裹胁美国人民', '035', 57, '军工复合体,政府,人民,政治'],
  ['政治', '盲目黩武靠敌名扩预算', '035', 59, '黩武主义,国防预算,武器合同,政治'],
  ['方法', '听话与否决定敌友划分', '035', 111, '敌友划分,民主,人权,方法'],
  ['政治', '扶植反动政权导致反噬', '035', 118, '伊朗,巴列维,反动政权,政治'],
  ['政治', '核威胁突破君子协定', '035', 126, '核武,朝鲜战争,威胁,政治'],
  ['政治', '战争边缘政策变成真风险', '036', 60, '肯尼迪,战争边缘,核危机,政治'],
  ['法权', '年复一年目无国际法', '036', 64, '国际法,军事干涉,伊拉克,法权'],
  ['方法', '东京湾事件显示战争叙事问题', '037', 22, '东京湾事件,越战,战争叙事,方法'],
  ['政治', '黩武好战不只是一小撮人', '037', 26, '越战,民意,黩武,政治'],
  ['政治', '越战和平变成请求放行', '037', 71, '越战,光荣和平,尼克松,政治'],
  ['政治', '美国例外让侵略都有例外', '037', 79, '美国例外主义,侵略,种族灭绝,政治'],
  ['政治', '富强不能等于介入世界权', '037', 95, '世界介入,美国权力,越南,政治'],
  ['政治', '英国迷惘源于美元秩序', '038', 32, '美元,英国,帝国角色,政治'],
  ['方法', '区分历史反正义和现行反正义', '038', 73, '历史反正义,现行反正义,方法'],
  ['政治', '自我神话败给越战现实', '038', 106, '越战,美国神话,国家羞辱,政治'],
  ['政治', '光荣和平只是撤退修辞', '038', 116, '越战,光荣和平,撤退,政治'],
  ['政治', 'CIA协助拉美独裁追杀', '038', 140, 'CIA,皮诺切特,兀鹰计划,政治'],
  ['政治', '折磨越南后美国先逃', '039', 46, '越南,撤退,国家责任,政治'],
  ['法权', '台湾关系法自撞建交公报', '040', 29, '中美建交公报,台湾关系法,法权'],
  ['法权', '移民自由法变成对华双簧', '040', 35, '杰克逊范尼克修正案,移民自由,中国,法权'],
  ['法权', '反恐拘押使人权口号失效', '040', 104, '反恐,拘押,人权,法权'],
  ['法权', '巴拿马战争暴露人权双标', '040', 131, '巴拿马,人权,独立,法权'],
  ['法权', '伊朗门糟蹋法律信用', '041', 82, '伊朗门,法律,信用,法权'],
  ['文化', '经济信仰被生存法则带坏', '041', 163, '经济信仰,适者生存,工资铁律,文化'],
  ['人格', '自称慷慨要对照援外排名', '041', 165, '援外,慷慨,政府预算,人格'],
  ['政治', '宗教领袖名义包装独立活动', '042', 60, '达赖,西藏独立,宗教领袖,政治'],
  ['法权', '普世人权成了对华工具', '042', 62, '普世人权,中国,西藏,法权'],
  ['政治', 'CIA支援西藏情报游击', '042', 66, 'CIA,西藏,嘉乐顿珠,政治'],
  ['文化', '媒体自由只在分肉时显现', '043', 101, '媒体,言论自由,CIA,文化'],
  ['法权', '难民公约把避难权变成国门规则', '043', 120, '难民公约,避难权,国门,法权'],
  ['文化', '美国历史叙事赖掉国内抢走国外', '043', 166, '历史叙事,印第安人,世界大战,文化'],
  ['文化', '伊拉克社论配合政府叙事', '043', 170, '纽约时报,伊拉克,舆论,文化'],
  ['法权', '国际条约被美国逐一退避', '044', 30, '国际条约,京都议定书,国际刑事法庭,法权'],
  ['法权', '伊拉克战争违反联合国宪章', '044', 32, '伊拉克战争,联合国宪章,国际法,法权'],
  ['法权', '虐囚毁掉自由人权信用', '044', 208, '虐囚,人权,大规模毁灭性武器,法权'],
  ['法权', '空白授权让民主走向滥权', '044', 242, '战争授权,民主,总统权力,法权'],
  ['方法', '恐怖主义核心是恐惧放大', '044', 248, '恐怖主义,恐惧,反恐,方法'],
  ['法权', '军事法令绕过审讯监禁', '044', 250, '军事法令,审讯,终身监禁,法权'],
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

function sourceFileByPrefix(prefix) {
  const file = fs
    .readdirSync(sourceDir)
    .filter((name) => name.endsWith('.txt'))
    .find((name) => name.startsWith(`${prefix}.`));
  if (!file) {
    throw new Error(`Missing source file prefix: ${prefix}`);
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
    '- 分类策略：沿用 8 个原子分类；本书主要进入政治、法权、文化、方法、人格和知识。',
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
    '- 收入：美国例外论、帝国扩张、奴隶与排华、人权法治、国际法、对华政策、台湾问题、媒体包装、冷战反共、反恐战争和美元霸权等可独立检索的思想段落。',
    '- 暂不收入：纯情节推进、舞台动作、人物插科打诨、过度依赖总统个人逸闻的段落。',
    '- 涉及书名性隐喻的段落，只有主旨明确落在政治批判时才纳入；本轮未收露骨场面描写。',
    '- 所有 `description` 均为源文本原文段落，未改写。',
    '',
    '## 分类统计',
    '',
    ...counts.map((item) => `- ${item.category}：${item.count}`),
    '',
    '## 后续校对重点',
    '',
    '- 检查政治与法权边界：国际法、宪法、条约和人权程序的段落是否应统一归入法权。',
    '- 检查冷战、台湾、反恐段落是否存在近义重复，校对轮可继续压缩。',
    '- 检查美国总统个人逸闻是否被保留过多；若段落主旨不能离开人物情节独立检索，可在校对轮删除。',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

fs.mkdirSync(outputDir, { recursive: true });

const used = new Set();
const records = entries.map(([category, title, prefix, paragraphNumber, keywords], index) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category: ${category}`);
  }

  const key = `${prefix}:${paragraphNumber}`;
  if (used.has(key)) {
    throw new Error(`Duplicate source paragraph: ${key}`);
  }
  used.add(key);

  const sourceFile = sourceFileByPrefix(prefix);
  const sourcePath = path.join(sourceDir, sourceFile);
  const sourceParagraphs = paragraphs(sourcePath);
  const description = sourceParagraphs[paragraphNumber - 1];

  if (!description) {
    throw new Error(`Missing paragraph ${paragraphNumber} in ${sourceFile}`);
  }

  return {
    id: `LAT035-${String(index + 1).padStart(3, '0')}`,
    book: book.title,
    round: book.round,
    status: book.status,
    category,
    title,
    description,
    source_file: sourceFile,
    source_paragraph: paragraphNumber,
    source_path: path.relative(rootDir, sourcePath).replaceAll(path.sep, '/'),
    keywords,
  };
});

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
  category_counts: categoryCounts(records),
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

console.log(`Built ${records.length} records for ${book.title}.`);
console.table(categoryCounts(records));
