import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const essayGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('002.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, essayGroup))
  .find((name) => name.startsWith('006.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '014.波波颂');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '014',
  title: '波波颂',
  slug: 'bobo-song',
  round: '提取轮',
  status: '待校对',
};

const taxonomy = [
  '写作',
  '方法',
  '知识',
  '人格',
  '文化',
  '政治',
  '法权',
];

const entries = [
  ['方法', '自然不是多情体', '001', 3, '自然,感伤,方法'],
  ['人格', '自然教人不浪费生命', '001', 4, '自然,生命,达观'],
  ['人格', '坐牢改变时间尺度', '003', 5, '坐牢,时间,尺度'],
  ['人格', '冰冷也能表现洁白', '004', 7, '冰冷,洁白,表达'],
  ['人格', '友谊要靠人格和公益', '005', 5, '朋友,人格,公益'],
  ['人格', '朋友也可能成为阻力', '005', 6, '朋友,人情,阻力'],
  ['人格', '耐得住寂寞才承认朋友没落', '005', 8, '朋友,寂寞,时代'],
  ['人格', '坐牢拉长时间感', '008', 3, '坐牢,时间,自由'],
  ['人格', '坐牢缩小空间感', '008', 4, '坐牢,空间,墙'],

  ['方法', '伪君子坏在冒充好东西', '009', 2, '伪君子,真小人,面具'],
  ['文化', '显性伪君子用正义说风凉话', '009', 8, '伪君子,正义,风凉话'],
  ['文化', '隐性伪君子逃避现实', '009', 10, '伪君子,逃避,远庖厨'],
  ['文化', '伪君子重视造型', '009', 11, '伪君子,造型,节俭'],
  ['文化', '慈善作秀是伪中之尤', '009', 12, '慈善,作秀,伪善'],
  ['文化', '救远不救近是一种作秀', '010', 5, '三毛,伪善,作秀'],
  ['文化', '信仰只取有利面就是伪善', '010', 7, '金庸,信佛,伪善'],
  ['文化', '伪君子同时要上帝和财神', '010', 9, '信仰,财富,伪君子'],
  ['文化', '受迫害意识会遮蔽能力问题', '011', 11, '新女性,受迫害意识,能力'],

  ['人格', '选择不能因危险而退', '013', 10, '选择,牺牲,孟子'],
  ['人格', '正言不讳就患有所不辟', '013', 16, '正言不讳,祢衡,危险'],
  ['人格', '志士仁人不只为了面包', '013', 17, '面包,理想,志士'],
  ['政治', '劝黄祖不劝祢衡', '013', 19, '祢衡,黄祖,统治者'],
  ['政治', '党禁支票长期说了不算', '014', 4, '党禁,国民党,承诺'],
  ['政治', '不见棺材不流泪的政权', '014', 6, '党禁,政权,开放'],
  ['政治', '等国民党开放只是做梦', '014', 7, '党禁,新党,等待'],

  ['知识', '不读书会误判索尔仁尼琴', '015', 3, '索尔仁尼琴,读书,判断'],
  ['知识', '索尔仁尼琴精神大于思想', '015', 5, '索尔仁尼琴,极权,精神'],
  ['政治', '反共不是黑暗统治护符', '015', 9, '反共,自由民主,法西斯'],
  ['政治', '极右政权下纯民间团体难存在', '015', 10, '基金会,官方,利用'],
  ['法权', '受难者不该忘记眼前受难者', '015', 14, '古拉格,囚犯,人道'],
  ['人格', '第一流志士不入极权危邦', '015', 19, '志士,极权,原则'],
  ['人格', '第一流不会这样来去', '015', 20, '索尔仁尼琴,原则,二流'],
  ['方法', '人格肯定不等于行为正确', '016', 3, '堂吉诃德,人格,行为'],
  ['人格', '堂吉诃德保持信仰纯度', '016', 4, '信仰,怀疑,纯度'],
  ['方法', '把巨人看成风车也是错误', '016', 5, '堂吉诃德,索尔仁尼琴,判断'],
  ['人格', '人也要为自己活', '017', 4, '战士,自己,圣人'],
  ['政治', '国民党不会给孔子出境证', '017', 5, '国民党,出境,孔子'],
  ['人格', '有人冲决网罗就该庆幸', '017', 6, '网罗,离开,自由'],

  ['法权', '屈于力的道歉不由衷', '018', 3, '道歉,将军,权力'],
  ['法权', '个人名誉案不是军方的事', '018', 31, '司法,军方,公私'],
  ['法权', '未打官司先致歉是软弱', '018', 33, '诽谤,道歉,司法'],
  ['政治', '党外放水式软弱须反省', '018', 34, '党外,放水,反省'],
  ['法权', '将军应严守公私之分', '018', 35, '将军,职权,法治'],
  ['方法', '错误软弱和横行小气都是输', '018', 36, '输家,软弱,横行'],
  ['写作', '用笔如剑揭发权贵', '019', 4, '皮尔逊,专栏,揭发'],
  ['人格', '文化独行侠让大头头痛', '019', 10, '皮尔逊,独行侠,权贵'],
  ['政治', '政治变色是技术和无耻升级', '020', 5, '政治动物学,变色龙,无耻'],
  ['政治', '宁废己蛋也不孵贼蛋', '020', 11, '贼蛋,黄莺,党外'],
  ['政治', '假党外把后援会变自援会', '020', 13, '党外,后援会,利益'],
  ['政治', '另筑第六层巢', '020', 14, '党外,贼蛋,反叛'],
  ['法权', '不准出境是政治流放逻辑', '021', 9, '出境,流放,国民党'],
  ['政治', '流放李敖显示国民党矛盾', '021', 14, '流放,大陆,国民党'],
  ['法权', '送去大陆是国民党流刑', '021', 19, '流刑,大陆,出境'],

  ['写作', '抒情高分不等于思想无误', '022', 36, '抒情文,乡愁,思想'],
  ['文化', '乡愁是被滥用的情绪', '022', 37, '乡愁,文学,陈腔滥调'],
  ['知识', '乡愁有社会条件', '022', 38, '乡愁,农业社会,交通'],
  ['方法', '乡愁梦越久越不真实', '022', 39, '乡愁,梦境,现实'],
  ['文化', '袖手寻春难免失望', '022', 40, '江南,乡愁,现实'],
  ['人格', '面对真实重建希望', '022', 41, '真实,希望,中国人'],
  ['方法', '本性之外仍要不忘战斗', '024', 4, '本性,教养,战斗'],
  ['知识', '假古董家好古不敏求', '026', 4, '古董,好古,敏求'],
  ['知识', '真懂古董者不玩古董', '026', 6, '古董,今董,鉴赏'],
  ['政治', '人间造天堂是一场错梦', '027', 4, '天堂,革命,乌托邦'],
  ['人格', '黑暗未除天堂不是我们的', '027', 10, '使命,黑暗,天堂'],
  ['人格', '不做无谓谦虚', '028', 3, '顾恺之,谦虚,坦率'],
  ['方法', '称赞者可用替身代行', '028', 9, '称赞,替身,幽默'],

  ['政治', '美国支持法西斯政权令人不满', '029', 5, '美国,国民党,法西斯'],
  ['方法', '要从被间接迫害者角度看事', '029', 8, '美国,迫害,视角'],
  ['政治', '美国若不弃威权就不必会见', '029', 9, '美国,法西斯,会见'],
  ['政治', '美国支援法西斯只求一时苟安', '030', 4, '美国,法西斯,苟安'],
  ['政治', '苟安终不可得', '030', 5, '美国,尼加拉瓜,苟安'],
  ['知识', '观音无形却造像可笑', '031', 4, '观音,无形,造像'],
  ['方法', '以欲止欲是一种信仰策略', '031', 12, '以欲止欲,佛教,策略'],
  ['写作', '裸女入文是打破禁忌的武器', '031', 13, '性自由,裸女,战斗'],
  ['人格', '陶潜归隐是不合作主义', '032', 4, '陶潜,不合作,归隐'],
  ['人格', '陶潜不是温吞隐士', '032', 5, '陶潜,刚正,不合作'],
  ['人格', '不为五斗米折腰', '032', 7, '陶潜,五斗米,国民党'],

  ['方法', '白纸黑字错误有三种', '033', 2, '错误,证据,写作'],
  ['知识', '古字基本解释不能误读', '033', 26, '古字,宋代话本,误读'],
  ['方法', '外文语义不能望文生义', '033', 34, '迪斯累里,语义,翻译'],
  ['知识', 'Brave不是勇敢', '033', 42, '莎士比亚,brave,翻译'],
  ['方法', '读书粗心能让死人写书', '034', 10, '林语堂,梁启超,读书'],
  ['知识', '国学常识可辨赝品', '034', 18, '石达开,梁启超,赝品'],
  ['知识', '引句出处不能张冠李戴', '034', 22, '陶渊明,出处,引文'],
  ['写作', '文学角度不能被政战角度替代', '035', 16, '文学角度,政战,反叛'],
  ['方法', '是非挂帅不怕得罪人', '036', 5, '是非,保护,主张'],
  ['方法', '批评要就事论事', '036', 6, '批评,事实,题外话'],
  ['政治', '媒体垄断制造专家', '037', 5, '媒体垄断,专家,查证'],
  ['方法', '查证履历才能拆穿身份扩张', '037', 19, '履历,查证,身份'],
  ['人格', '声闻过情应自我澄清', '037', 20, '声闻过情,澄清,知耻'],
  ['方法', '积非成是不是笔误', '037', 23, '积非成是,学历,笔误'],
  ['写作', '文字救世鼓动风潮', '039', 4, '文字,救世,现实'],
  ['写作', '大文章靠长期打底', '039', 5, '写作,准备,童子功'],
  ['人格', '百年后留下功业交情', '040', 14, '功业,交情,雪泥爪印'],
  ['方法', '实事求是莫作调人', '041', 2, '实事求是,调人,原则'],
  ['政治', '可疑和事老是里应外合', '041', 3, '和事老,沟通,国民党'],
  ['政治', '学术政治人物可能是体制受益者', '041', 17, '学术,政治,体制'],
  ['写作', '讽刺文笔可以表达意见', '042', 5, '讽刺,文笔,意见'],
  ['人格', '不知航向就没有顺风', '043', 6, '航向,顺风,逆风'],
  ['法权', '审查破坏公平竞争', '043', 7, '审查,公平竞争,杂志'],

  ['法权', '打官司能留下司法记录', '046', 12, '官司,司法,记录'],
  ['法权', '弹弓也是残存武器', '046', 13, '司法,武器,不公平'],
  ['方法', '施洗者约翰可能被宣传小化', '048', 4, '施洗者约翰,耶稣,宣传'],
  ['政治', '派系利益不敢肯定先驱', '048', 7, '派系,先驱,忘恩负义'],
  ['写作', '文人征服是千秋的', '050', 7, '文人,武人,征服'],
  ['写作', '千秋之笔斥一时之谎', '050', 8, '蒋介石,文人,谎言'],
  ['方法', '改名法是封建把戏', '051', 4, '改名,封建,文化'],
  ['方法', '改名自慰是否认现实', '051', 8, '改名,现实,防卫方式'],
  ['人格', '人生不只温饱', '052', 3, '温饱,志向,人生'],
  ['人格', '妻财子禄小看志士', '052', 6, '妻财子禄,理想,叛乱'],
  ['政治', '钱买不下政治原则', '052', 10, '政治原则,金钱,统一'],
  ['法权', '国民党好禁异己为人师', '053', 5, '教师,异己,人权'],
  ['方法', '不证自明无需巧立理由', '054', 2, '理由,不证自明,方法'],
  ['政治', '政治活动巧立名目泛滥', '054', 3, '政治活动,巧立名目,跑步'],
  ['人格', '在其位必谋其政', '055', 6, '贝克特,敬业,真理'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function paragraphs(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
}

function readSource(sourceFile) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, sourceFile)));
}

const sourceFiles = fs.readdirSync(sourceDir);
const sourceFileCache = new Map();

function resolveSourceFile(prefix) {
  if (!sourceFileCache.has(prefix)) {
    const matches = sourceFiles.filter((name) => name.startsWith(`${prefix}.`));
    if (matches.length !== 1) {
      throw new Error(`Expected one source file for ${prefix}, got ${matches.length}`);
    }
    sourceFileCache.set(prefix, matches[0]);
  }
  return sourceFileCache.get(prefix);
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

function writeMarkdown(filePath, records) {
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '',
  ];

  for (const record of records) {
    lines.push(`## ${record.id} ${record.title}`);
    lines.push('');
    lines.push(`- 分类：${record.category}`);
    lines.push(`- 来源：${record.source_file} 第 ${record.source_paragraph} 段`);
    lines.push(`- 关键词：${record.keywords}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeNote(filePath, records) {
  const categoryLines = taxonomy.map((category) => {
    const count = records.filter((record) => record.category === category).length;
    return `- ${category}：${count}`;
  });

  const lines = [
    `# 《${book.title}》提取说明`,
    '',
    `- 轮次：${book.round}`,
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '',
    '## 分类统计',
    '',
    ...categoryLines,
    '',
    '## 提取原则',
    '',
    '- 标题为检索用浓缩标题。',
    '- `description` 保留源文本原文段落，由脚本按源文件段号抽取。',
    '- 本轮优先收录具有明确思想判断、方法论、写作观、文化批判、政治法权含义的段落；纯掌故与材料性段落暂不密集收录。',
    '- 书信、短札与讽刺文中只抽取可独立检索的思想骨架，避免逐段铺开掌故。',
    '',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function buildRecords() {
  return entries.map(([category, title, sourcePrefix, sourceParagraph, keywords], index) => {
    if (!taxonomy.includes(category)) {
      throw new Error(`Unknown category: ${category}`);
    }

    const sourceFile = resolveSourceFile(sourcePrefix);
    const sourceParagraphs = paragraphs(readSource(sourceFile));
    const description = sourceParagraphs[sourceParagraph - 1];

    if (!description) {
      throw new Error(`Missing source paragraph: ${sourceFile} P${sourceParagraph}`);
    }

    const fullSourcePath = path.join(sourceDir, sourceFile);

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
      source_path: path.relative(rootDir, fullSourcePath).replaceAll(path.sep, '/'),
      keywords,
    };
  });
}

fs.mkdirSync(outputDir, { recursive: true });

const records = buildRecords();
const payload = {
  generated_at: new Date().toISOString(),
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
writeMarkdown(path.join(outputDir, '思想索引-提取轮.md'), records);
writeNote(path.join(outputDir, '提取说明.md'), records);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
