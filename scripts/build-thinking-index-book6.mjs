import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const memoirGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('001.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, memoirGroup))
  .find((name) => name.startsWith('006.'));
const sourceDir = path.join(rootDir, sourceRoot, memoirGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '006.李敖议坛哀思录');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '006',
  title: '李敖议坛哀思录',
  slug: 'li-ao-yitan-aisilu',
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
  ['政治', '在小岛热讽冷嘲', '001《李敖议坛哀思录》小引一.txt', 2, '小岛,热讽,冷嘲'],
  ['写作', '自传少弄假', '002.《李敖议坛哀思录》小引二.txt', 2, '自传,唠叨,真实'],
  ['方法', '议坛双主轴', '004.以玩笑出之.txt', 2, '反对,嘲弄,朝隐'],
  ['方法', '以玩笑延长反对', '004.以玩笑出之.txt', 4, '玩笑,反对,长命'],

  ['文化', '不信怪力乱神', '005.为何起了怪书名？.txt', 4, '迷信,鬼神,现代'],
  ['政治', '夤缘以为义', '005.为何起了怪书名？.txt', 7, '政治,义,立委'],
  ['政治', '亡国中的议员定位', '005.为何起了怪书名？.txt', 8, '中华民国,亡国,议员'],
  ['方法', '以子之矛攻子之盾', '005.为何起了怪书名？.txt', 9, '蒋介石,亡国,证据'],

  ['政治', '小化自我放大国家', '006.我把自己变小了！.txt', 6, '国家,台湾,中国'],
  ['人格', '一言堂的思想担当', '006.我把自己变小了！.txt', 27, '一言堂,特立独行,天下法'],
  ['方法', '立委只是布道道具', '006.我把自己变小了！.txt', 39, '立委,道具,布道'],
  ['法权', '选举程序的正当性', '006.我把自己变小了！.txt', 42, '选举,做票,正当'],

  ['政治', '选贤难合造势规格', '007.绝无仅有的选举方式.txt', 5, '选举,选贤,造势'],
  ['人格', '不拉票也能当选', '007.绝无仅有的选举方式.txt', 10, '选举,特立独行,不拜票'],
  ['人格', '拒绝政治献金', '008.从参选到上台.txt', 4, '政治献金,贷款,拒收'],
  ['法权', '拆门表示公开', '008.从参选到上台.txt', 10, '研究室,透明,隔阂'],

  ['政治', '台湾错乱的三角架构', '009.我所处的大气候.txt', 3, '台湾,三角架构,统一'],
  ['人格', '拆穿蒋介石的道德意义', '009.我所处的大气候.txt', 5, '蒋介石,拆穿,人格'],
  ['政治', '美国人权不责走狗', '009.我所处的大气候.txt', 6, '美国,人权,白色恐怖'],
  ['政治', '好人也可能做共犯', '009.我所处的大气候.txt', 7, '中华民国,统一,共犯'],

  ['政治', '被害者拥护加害权力', '010.斯德哥尔摩症候群.txt', 4, '斯德哥尔摩,外省族群,投票'],
  ['政治', '坏人架构转成浑人架构', '010.斯德哥尔摩症候群.txt', 5, '坏人,浑人,本土政权'],
  ['方法', '逍遥通世法', '011.王闿运的身影.txt', 5, '王闿运,逍遥,玩世'],
  ['方法', '以讽讽议坛', '012.吾从其讽.txt', 2, '讽,先知,立委'],
  ['方法', '劝告要讲究手段', '012.吾从其讽.txt', 3, '讽谏,孔子,手段'],
  ['人格', '先知不从愚昧取力', '012.吾从其讽.txt', 13, '先知,鬼神,自得'],

  ['法权', '拒向发假誓者宣誓', '013.我拒绝向孙中山宣誓.txt', 10, '宣誓,伪造文书,孙中山'],
  ['政治', '蓝绿自欺危机', '014.院长王金平.txt', 25, '自欺,反攻,台独'],
  ['政治', '亲美危机', '014.院长王金平.txt', 26, '亲美,军购,奶嘴'],
  ['政治', '仇共危机', '014.院长王金平.txt', 27, '仇共,宪法,谈判'],
  ['政治', '小岛失血而死', '014.院长王金平.txt', 28, '危机,正本清源,失血'],

  ['政治', '选立委第一目的反美', '015.我选立委的第一目的.txt', 2, '军购,媚美,美国'],
  ['法权', '台湾关系法不是条约', '015.我选立委的第一目的.txt', 12, '与台湾关系法,国内法,条约'],
  ['政治', '看门狗不自买骨头', '015.我选立委的第一目的.txt', 16, '军购,看门狗,尊严'],
  ['政治', '国防不能限于军事层面', '016.挡军购，宋楚瑜有前功.txt', 6, '国防,军事层面,国家安全'],
  ['方法', '党团细胞分裂', '016.挡军购，宋楚瑜有前功.txt', 34, '党团,政党协商,预算'],

  ['写作', '保存犀利问政记录', '017.问政述奇.txt', 3, '质询,议会政治,记录'],
  ['政治', '无尊严还自费买武器', '018.我告诉你，就是狗.txt', 12, '美国,尊严,军购'],
  ['方法', '台湾不可只交给爱台湾者', '018.我告诉你，就是狗.txt', 13, '台湾,爱台湾,判断'],
  ['政治', '军备竞赛如三轮追汽车', '018.我告诉你，就是狗.txt', 18, '军备竞赛,三轮车,汽车'],
  ['知识', '记录老兵心酸', '019.我闻过他们的臭脚.txt', 7, '荣民,生命纪录,国家'],

  ['法权', '程序不可为理想牺牲', '020.老贼化的民进党.txt', 3, '法理,程序,老党外'],
  ['法权', 'provide不是卖', '021.上将割屌记.txt', 4, 'provide,台湾关系法,供应'],
  ['政治', '美国未保证来救', '021.上将割屌记.txt', 6, '美国,十四天,严重关切'],
  ['政治', '宪法是两岸刹车', '022.我高潮，你刹车.txt', 7, '陆委会,宪法,内地'],
  ['方法', '数字也会说谎', '023.应该去跟妇产科医生讲.txt', 5, '数字,统计,谎话'],
  ['政治', '最高战略是不打', '023.应该去跟妇产科医生讲.txt', 9, '孙子兵法,战略,高压电塔'],

  ['政治', '考虑不设防', '024.为什么不从大的战略来考虑.txt', 8, '不设防,租赁,国防'],
  ['方法', '做大战略而非细节', '024.为什么不从大的战略来考虑.txt', 9, '大战略,历史,占便宜'],
  ['法权', '公投否决不能再审', '025.第一被告是谢长廷，第二就是你.txt', 15, '公投法,渎职,司法程序'],
  ['知识', '重释莫须有', '026.用衣冠整禽兽.txt', 15, '莫须有,考据,罪名'],
  ['政治', '军队失去为何而战', '027.历史会证明我们同归于尽.txt', 10, '军队,信念,为何而战'],
  ['法权', '抵抗权不能任意停法', '028.长廷啊，不要在后台唱戏.txt', 56, '抵抗权,法律,大法官'],

  ['方法', '外部拆穿胜过内部颠覆', '031.我炮口转向了.txt', 3, '质询,外部拆穿,炮口'],
  ['文化', '台湾话不等于本土语言', '033.去他妈的话.txt', 4, '本土语言,闽南话,政治'],
  ['文化', '抢救语言不是压给孩子', '033.去他妈的话.txt', 6, '语言,教育,孩子'],
  ['方法', '困难要排除不是解释', '035.钢笔事件.txt', 12, '困难,将军,办法'],
  ['人格', '公开退礼避免管道', '035.钢笔事件.txt', 14, '收礼,国防部,公开'],
  ['法权', '侮辱官署是军阀观念', '035.钢笔事件.txt', 31, '侮辱官署,法律,军阀'],

  ['法权', '安全不是黑暗作业护符', '037.安全不是黑暗作业的护符.txt', 4, '安全,黑暗作业,自由中国'],
  ['法权', '秘密基金应报缴国库', '037.安全不是黑暗作业的护符.txt', 15, '秘密基金,预算,国库'],
  ['法权', '判决书不能不公布', '041.副局长要毒死谁？.txt', 63, '判决书,机密,法官'],
  ['政治', '以化敌为友保安全', '045.香蕉好吃吗？.txt', 8, '国家安全,化敌为友,逻辑'],

  ['知识', '地图不可强塞政治含义', '047.八次叫杜正胜闭嘴.txt', 13, '古地图,台湾史,政治'],
  ['人格', '校长应为受迫害教授作证', '048.大学校长水肥事件.txt', 3, '台大,殷海光,道德勇气'],
  ['法权', '去中国化撞上宪法', '049.杜正胜听训.txt', 4, '去中国化,宪法,大陆地区'],
  ['人格', '学术机构不应介入政治', '050.逼李远哲道歉.txt', 10, '中央研究院,公信力,政治'],

  ['方法', '军购先清五个前提', '057.李敖就军购案说帖.txt', 5, '军购,前提,澄清'],
  ['政治', '不能信严重关切', '057.李敖就军购案说帖.txt', 23, '严重关切,美国,火海'],
  ['政治', '美国利益不等于台湾利益', '057.李敖就军购案说帖.txt', 27, '美国利益,台湾,责任'],
  ['法权', '台湾关系法师出无名', '057.李敖就军购案说帖.txt', 39, '台湾关系法,国际法,脆弱'],

  ['政治', '假民主看在野党', '061.只要掐住马英九.txt', 28, '假民主,在野党,国会'],
  ['政治', '哥斯达黎加模式', '062.公听会听我言.txt', 4, '哥斯达黎加,无军队,警察'],
  ['方法', '问答说明军购无效', '063.最简明的智慧十题.txt', 2, '军购无效,问答,智慧'],
  ['政治', '军备竞赛使台湾民穷', '063.最简明的智慧十题.txt', 31, '军备竞赛,民穷财尽,预算'],

  ['政治', '国民党下班论', '071.我的国民党观.txt', 5, '国民党,信念,党员'],
  ['法权', '政党协商违反程序正义', '071.我的国民党观.txt', 15, '程序正义,政党协商,立委'],
  ['政治', '警惕小国民党', '072.我的民进党观.txt', 4, '民进党,国民党第二,执政'],
  ['人格', '先知的光荣与痛苦', '072.我的民进党观.txt', 8, '先知,预言,痛苦'],
  ['政治', '拒绝表决是假民主', '073.83只鸭子式民主.txt', 18, '罢免,民进党,假民主'],

  ['政治', '反分裂法反而约束大陆', '076.台湾人为什么这么笨？.txt', 8, '反分裂法,台独,安全'],
  ['人格', '第一流知识分子要抵抗坏政府', '077.不要像李远哲这样子迷失.txt', 9, '蔡元培,胡适,知识分子'],
  ['方法', '核废料要专业面对', '078.关于核电后端.txt', 18, '核废料,公投,原住民'],
  ['政治', '投降也可保存子孙文化', '079.台湾人就是被吓大的.txt', 17, '投降计划,谈判,文化'],
  ['法权', '部长缺席藐视国会', '080.狗的午餐就是免费的.txt', 12, '国防部长,国会,尊严'],
  ['法权', '安全承诺口气转为自我防卫', '080.狗的午餐就是免费的.txt', 25, '台湾关系法,自我防卫,承诺'],

  ['方法', '阻挠议事是少数权利', '082.瓦斯伺之以后.txt', 13, 'filibuster,阻挠议事,少数'],
  ['法权', '纪律追究要讲比例原则', '082.瓦斯伺之以后.txt', 21, '比例原则,纪律,瓦斯'],
  ['方法', '用选举传播理念', '086.用选市长传播理念.txt', 2, '选市长,传播,理想'],
  ['政治', '抛弃蓝绿展开新思维', '089.要抛弃蓝绿，展开新的思维.txt', 11, '蓝绿,新思维,台湾'],

  ['知识', '一千问答维护正义', '092.“你不知道的二二八”.txt', 2, '二二八,问题,答案'],
  ['文化', '角色错乱的媚外性格', '093.台湾的“贱种”性格.txt', 7, '媚外,角色错乱,台湾'],
  ['法权', '紧急预算不能违法追加', '094.太平岛纠缠战.txt', 9, '预算法,太平岛,预算'],
  ['政治', '军购只是奶嘴', '096.会自杀的国防部长.txt', 23, '军购,奶嘴,慰安'],

  ['人格', '大法官要有对抗风骨', '098.“你确实非常深入”.txt', 15, '大法官,风骨,对抗'],
  ['法权', '大法官要有胆量良知', '099.我解释了“大法官”.txt', 11, '大法官,胆量,良知'],
  ['文化', '语言没有文字难传文化', '100.我又宰了四个.txt', 7, '母语,文字,文化传承'],
  ['政治', '国家安全不可交给将军', '102.什么机密？机个屁密！.txt', 5, '国家安全,将军,爱台湾'],
  ['政治', '只有压迫者与被压迫者', '103.游锡堃的爸爸是外省士官.txt', 11, '压迫者,被压迫者,台湾'],

  ['方法', '一个人的国会作用是外胁', '119.我是很列宁的.txt', 9, '立法院,外胁,风潮'],
  ['政治', '有权必烂', '119.我是很列宁的.txt', 15, '权力,腐化,定律'],
  ['政治', '颠覆伪国会', '119.我是很列宁的.txt', 20, '伪民主,伪国会,列宁'],
  ['政治', '国会减半毁制衡', '122.赵良燕现象.txt', 4, '国会减半,制衡,民主'],
  ['政治', '创立英美式政党', '124.创立中国第一个英美式民主政党.txt', 2, '中国智慧党,英美式政党,假民主'],
  ['政治', '民主政党没有列宁阴魂', '125.“中国智慧党”灌顶宣言.txt', 8, '民主政党,柔性政党,列宁'],
  ['方法', '智慧测量反对抹杀证据', '127.“中国智慧党”智慧测量表.txt', 2, '智慧测量,证据,政见'],

  ['政治', '少数用暴力阻止多数投票', '129.伪国会.txt', 6, '假民主,少数党,投票'],
  ['政治', '蒋氏蓝绿遗害', '130.蒋介石阴魂不散.txt', 7, '蒋介石,蓝绿,思想型模'],
  ['政治', '台湾人也有中国所有权', '131.“桃花圣解”十五则.txt', 15, '中国,所有权,台湾人'],
  ['法权', '废止宣誓条例', '133.附录一、给立法院各位同仁的一封信.txt', 7, '宣誓条例,中央法规标准法,废止'],
  ['法权', '决议文侵犯程序正义', '134.附录二、控告全部立法委员民事起诉状.txt', 5, '决议文,程序正义,侵权'],
  ['法权', '和而不同才是民主真谛', '134.附录二、控告全部立法委员民事起诉状.txt', 11, '民主,和而不同,多元意见'],

  ['政治', '中华民国亡国证据', '135.附录三、控告布什、李登辉、陈水扁的状子.txt', 7, '中华民国,亡国,蒋介石'],
  ['法权', '台湾关系法自相矛盾', '135.附录三、控告布什、李登辉、陈水扁的状子.txt', 10, '台湾关系法,建交公报,自相矛盾'],
  ['法权', '法律中的中国不能偷换', '137.立法院公报第94卷第70期院会纪录.txt', 27, '中国,法律,民法'],
  ['法权', '一中宪法不能躲', '138.立法院公报第95卷第8期院会纪录.txt', 11, '一中宪法,国统纲领,统一'],
  ['人格', '假罪名真坐牢', '139.立法院公报第96卷第27期院会纪录.txt', 11, '台独,坐牢,真假'],
  ['法权', '发言权不可被剥夺', '140.立法院公报第96卷第48期院会纪录.txt', 3, '立法权,发言权,宪法'],
  ['法权', '行政院抵抗立法权', '141.立法院公报第96卷第51期委员会纪录.txt', 9, '立法院,立法权,核四'],
  ['法权', '审计要铁面无私', '142.立法院公报第96卷第61期委员会纪录.txt', 15, '审计部,铁面无私,包公'],
];

function normalize(text) {
  return String(text ?? '').replace(/\s+/g, ' ').trim();
}

function readSource(fileName) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)));
}

function paragraphs(text) {
  return text
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(normalize)
    .filter(Boolean);
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
    `# 《${book.title}》思想索引：${book.round}`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：沿用当前 7 个原子分类，避免按人物、事件、年份继续拆碎。',
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

function categoryCounts(records) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

fs.mkdirSync(outputDir, { recursive: true });

const paragraphCache = new Map();
const records = entries.map(([category, title, sourceFile, sourceParagraph, keywords], index) => {
  if (!taxonomy.includes(category)) {
    throw new Error(`Unknown category: ${category}`);
  }

  if (!paragraphCache.has(sourceFile)) {
    paragraphCache.set(sourceFile, paragraphs(readSource(sourceFile)));
  }

  const sourceParagraphs = paragraphCache.get(sourceFile);
  const description = sourceParagraphs[sourceParagraph - 1];
  if (!description) {
    throw new Error(`Missing paragraph: ${sourceFile} P${sourceParagraph}`);
  }

  const sourcePath = path.relative(rootDir, path.join(sourceDir, sourceFile));
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
    source_path: sourcePath,
    keywords,
  };
});

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...book,
    source_dir: path.relative(rootDir, sourceDir),
    record_count: records.length,
    category_counts: categoryCounts(records),
  },
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

const note = [
  '# 《李敖议坛哀思录》思想索引提取说明',
  '',
  `- 轮次：${book.round}`,
  `- 状态：${book.status}`,
  `- 条目数：${records.length}`,
  `- 源目录：${path.relative(rootDir, sourceDir)}`,
  '- 原则：本书材料以立法院质询、公听会、声明和附录为主，收录可独立复用的思想段落，压缩重复军购、台独、美国和蓝绿论述。',
  '- 描述字段：直接读取源文件段落，保持原文，不做改写。',
  '- 分类：继续使用写作、方法、知识、人格、文化、政治、法权七类。',
  '',
  '## 分类计数',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
];

fs.writeFileSync(path.join(outputDir, '提取说明.md'), `${note.join('\n')}\n`, 'utf8');

console.log(`Built ${book.title}: ${records.length} records.`);
