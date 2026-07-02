import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const sourceRoot = fs.readdirSync(rootDir).find((name) => name.includes('6.0'));
const essayGroup = fs
  .readdirSync(path.join(rootDir, sourceRoot))
  .find((name) => name.startsWith('003.'));
const sourceBookDir = fs
  .readdirSync(path.join(rootDir, sourceRoot, essayGroup), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .find((name) => name.startsWith('006.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '021.求是新语');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '021',
  title: '求是新语',
  slug: 'qiushi-xinyu',
  sourceDir: path.relative(rootDir, sourceDir).replaceAll(path.sep, '/'),
  round: '提取轮',
  status: '待校对',
  note:
    '本轮从《求是新语》三组短论中提取可独立检索的思想段落，重点收政治法权、知识分子、证据写作、民主假象、文化迷信与两岸论述；短文较多，未按篇目机械逐篇收录。',
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
  ['写作', '新语文体来自短谈', '自序', 2, '新语,世说新语,文体,短论'],
  ['写作', '言论自由高于报纸格调', '自序', 3, '言论自由,专栏,报纸,写作'],
  ['文化', '奴才教育丢掉尊严权利', '002', 3, '奴才教育,尊严,权利,主子'],
  ['政治', '混蛋教育逃避现实真相', '002', 4, '混蛋教育,现实,真相,台独'],
  ['写作', '以小喻大写出新意见', '003', 3, '以小喻大,新意见,写作,洛克'],
  ['人格', '争言论自由者不可被遗忘', '006', 3, '言论自由,自立晚报,李氏父子,勇敢'],
  ['人格', '私信直言不该自吹成履历', '009', 3, '直言,履历,文字狱,脸皮'],
  ['知识', '知识错误败坏文章', '010', 3, '事实,知识水平,写作,读书'],
  ['知识', '知识分子不该作秀帮闲', '011', 4, '知识分子,作秀,政治帮闲,士林'],
  ['人格', '知识分子先要自立风骨', '012', 3, '知识分子,风骨,立身,责任'],
  ['文化', '政治竞选不该诉诸天谴', '014', 3, '天谴,竞选,迷信,封建'],
  ['人格', '爱必须落实为行动', '017', 3, '爱心,行动,伪善,送钱'],
  ['政治', '善心不可替政府卸责', '017', 4, '政府责任,慈善,残障,坏政府'],
  ['知识', '知识分子帮闲会使天下更浊', '018', 4, '知识分子,帮闲,趋炎附势,澄社'],
  ['文化', '受过教育者不该政治迷信', '021', 3, '教育,迷信,符咒,选票'],
  ['方法', '政治判断要合常识', '022', 4, '常识,一厢情愿,台独,国民党教育'],
  ['人格', '是非真理应六亲不认', '023', 3, '是非,真理,六亲不认,批评'],
  ['法权', '反国民党不能复制坏宪制', '027', 3, '宪法,内阁制,总统制,国民党教育'],
  ['人格', '英雄不能只捡便宜', '028', 4, '英雄,代价,冒险,是非'],
  ['人格', '政治身份不可吃里扒外', '029', 2, '党籍,信誓,吃里扒外,失德'],
  ['人格', '还钱也要厚道明理', '030', 4, '厚道,人情,退还,爱人以德'],
  ['政治', '民代表功不能压榨小民', '032', 4, '民意代表,小公务员,仁心,表功'],
  ['人格', '私利改投不足为训', '036', 2, '私利,投靠,弃暗投明,原则'],
  ['知识', '知识分子应守格调尊严', '037', 4, '知识分子,格调,尊严,评鉴'],
  ['政治', '国民党劫贫济富', '038', 4, '黄金,劫贫济富,大陆同胞,台湾'],
  ['法权', '司法使用不能双重标准', '040', 3, '法院,双重标准,公道,告人'],
  ['政治', '户半开的民主只是外院戏', '041', 3, '民主假象,户半开,权力核心,选举'],
  ['政治', '选举可能成为统治迷魂阵', '041', 5, '选举,民主假戏,统治,民进党'],
  ['人格', '无耻公开化即无药可救', '042', 3, '无耻,社会风气,红包,公开'],
  ['政治', '政治人物常把小权力演大', '043', 4, '政治人物,权力,小人,奴性'],
  ['政治', '反对党也可能只是小国民党', '044', 3, '民进党,小国民党,反对党,制衡'],
  ['政治', '人才政策败坏政党', '045', 3, '人才政策,奴才,国民党,用人'],
  ['方法', '选民判断力依赖记忆力', '048', 5, '选民,判断力,记忆力,政客'],
  ['政治', '民主运动需要气质', '049', 3, '民主,气质,暴民政治,自由'],
  ['政治', '在野治权会被制度围困', '050', 3, '县市长,治权,国民党,议会党团'],
  ['写作', '用笔如刀必须有证据', '052', 2, '证据,文笔,用笔如刀,写作'],
  ['政治', '选举可使真正民主落败', '054', 4, '选举,民主政治,法制,理性'],
  ['人格', '同流可以合污不可', '056', 2, '同流,合污,贼船,人格'],
  ['方法', '国民党总不能恪守本位', '057', 2, '经济问题,政治问题,法律问题,本位'],
  ['法权', '两党都会联手毁掉法律', '057', 4, '法治,法律,国民党,民进党'],
  ['政治', '民主风度不能鼓噪闹场', '059', 3, '民主风度,演说,闹场,民进党'],
  ['知识', '时代变化不该变成无知', '061', 4, '时代变化,无知,胡适,林语堂'],
  ['文化', '附庸文化好古而不敏求', '062', 3, '附庸文化,文昌,中国文化,皮毛'],
  ['知识', '知识分子不可做官方门面', '063', 3, '知识分子,独立,迫害,官方门面'],
  ['人格', '艺术家可抵制不人道国家', '070', 3, '卡萨尔斯,人道主义,抵制,危邦'],
  ['法权', '总统行政实权是违宪膨胀', '072', 3, '宪法,总统,行政实权,违宪'],
  ['法权', '政府违宪会污染人民思路', '072', 4, '违宪,人民,国民党教育,宪政'],
  ['方法', '制度选择要接近人道', '073', 3, '资本主义,社会主义,人道,制度'],
  ['人格', '不靠消遣生活也是境界', '074', 5, '生活方式,消遣,高人,阎锡山'],
  ['政治', '小贼会接替老贼误民主', '077', 3, '老贼,小贼,民主,议会'],
  ['政治', '监督先于设会', '079', 4, '监督,大陆事务委员会,立法委员,权责'],
  ['政治', '社会主义理想会卷入奴役腐败', '081', 2, '社会主义,奴役,腐败,理想'],
  ['人格', '傲骨可以不露骄气', '083', 3, '傲骨,骄气,立身,不合作'],
  ['政治', '民进党也从国民党娘胎来', '085', 4, '民进党,国民党,出身,投机'],
  ['人格', '恋栈者常假装归隐', '089', 5, '官位,恋栈,假戏,政治人物'],
  ['人格', '才人有官位可能自毁', '090', 2, '才人,官位,知识分子,自毁'],
  ['方法', '大格局要警惕小人国心态', '093', 4, '小人国,格局,大陆人,警觉'],
  ['知识', '报阀独立地位常是假象', '094', 3, '报阀,独立地位,筹码,言论自由'],
  ['政治', '政治要维系唇齿平衡', '095', 4, '唇亡齿寒,政治平衡,读书,宋楚瑜'],
  ['文化', '脱离一种宗教不该速投另一种', '098', 3, '宗教,共产党,皈依,空虚'],
  ['政治', '美国是超级伪君子之国', '099', 2, '美国,伪善,人权,贸易'],
  ['政治', '民主进步不能交给民进党', '100', 2, '民主,民进党,将军,政治'],
  ['人格', '错事勇敢对事胆怯是怪社会', '101', 2, '勇气,错误,保守,社会'],
  ['法权', '增额立委也是违宪共犯', '102', 4, '立法委员,违宪,共犯,宪法'],
  ['写作', '历史批判要证明而非只骂', '103', 3, '历史家,证据,批判,蒋氏父子'],
  ['政治', '独夫专政连假戏也可不演', '107', 5, '总统选举,民主假戏,独夫专政,李登辉'],
  ['人格', '政治人物要说话算话', '109', 3, '上诉,许信良,光明磊落,信用'],
  ['政治', '民主政党不该学党员训练班', '110', 4, '党员训练班,独裁模式,民进党,国民党'],
  ['知识', '强势知识分子应独来独往', '111', 3, '知识分子,独立,中社,格局'],
  ['政治', '劫贫济富不可被遗忘', '112', 4, '劫贫济富,黄金,大陆,台湾'],
  ['政治', '蒋经国没有部署民主宪政', '113', 5, '蒋经国,民主宪政,马屁,历史'],
  ['文化', '色情标签不能抹杀复杂作品', '116', 4, '色情刊物,花花公子,标签,审查'],
  ['写作', '写文章可直取政治假相', '122', 4, '写文章,拆穿,政坛,快事'],
  ['人格', '反对单面的道德', '128', 6, '单面道德,公道,民进党,正义'],
  ['文化', '堵死声色管道会逼出低级替代', '134', 3, '声色,成人电影,政策,电子花车'],
  ['人格', '仁慈也会成为残忍', '135', 6, '仁慈,死刑犯,医生,标的'],
  ['写作', '作诗是个人的事', '137', 3, '作诗,联吟,个人,旧诗'],
  ['文化', '公共机构不该替宗教布施', '138', 2, '宗教,市政府,公共机构,佛教'],
  ['人格', '法律免责不等于道德免责', '142', 6, '马克吐温,债务,大丈夫,法律'],
  ['法权', '程序权利不能被双簧消耗', '143', 5, '上诉,程序,公信力,法律'],
  ['法权', '新闻管理因人而异破坏法治', '145', 3, '出版法,新闻管理,因人而异,法治'],
  ['知识', '共产主义理想不同于共产党', '146', 6, '共产主义,共产党,理想,人性'],
  ['法权', '政治冤案是政权耻辱', '150', 5, '王实味,平反,冤案,共产党'],
  ['政治', '金钱也能赎回自由', '153', 6, '自由,金钱,独立,坦克'],
  ['文化', '裸体也可以有美感', '156', 5, '裸体,广告,美感,女性形象'],
  ['文化', '科学方法也会帮助迷信进步', '157', 3, '妈祖,迷信,科学方法,分灵'],
  ['文化', '爱国不能只爱在嘴上', '158', 6, '国旗,爱国,法律,象征'],
  ['政治', '主权逻辑不能自我梦呓', '159', 3, '主权,李登辉,满清,逻辑'],
  ['知识', '知识分子不能先勇后怯', '161', 5, '知识分子,傅正,国民党,民进党'],
  ['知识', '研究不能以附会代史料', '162', 3, '孙中山研究,史料,附会,学术'],
  ['法权', '执法清楚却视若无睹', '165', 3, '出版法,刑法,色情广告,执法'],
  ['文化', '公信先看主持人人品', '166', 3, '故宫,公信,人品,秦孝仪'],
  ['政治', '党库通国库还把利益归党', '168', 3, '党库,国库,党产,国民党'],
  ['法权', '黑名单映出自由伪善', '169', 3, '黑名单,美国,国民党,入境'],
  ['方法', '政策论述要实事求是', '172', 3, '一国两制,科学,实事求是,宣传'],
  ['政治', '金权会取代政党政治', '173', 5, '金权,财阀,立法院,政党政治'],
  ['政治', '宣传过量会倒尽胃口', '175', 6, '毛语录,宣传,霸王硬上弓,政治崇拜'],
  ['政治', '台湾省称谓未必是矮化', '177', 4, '台湾省,海基会,称谓,两岸'],
  ['文化', '偶像照片不配油画化', '180', 3, '蒋氏父子,偶像,艺术,立法院'],
  ['方法', '改称谓不能改变事实', '182', 4, '称谓,事实,舞女,语言'],
  ['写作', '做人成功不等于作文成功', '188', 6, '散文,国民党文人,作文,文坛'],
  ['法权', '查禁思想会使书只剩罪证', '190', 4, '资本论,马克思,查禁,犯罪证物'],
  ['政治', '市场改革难与党控并存', '193', 5, '市场经济,共产党,制度,李光耀'],
  ['政治', '国民党民进党抱负相同', '194', 2, '李登辉,许信良,历史人物,两党'],
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

const sourceFiles = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));
const sourceFileCache = new Map();

function resolveSourceFile(sourceKey) {
  if (!sourceFileCache.has(sourceKey)) {
    const matches = sourceFiles.filter((name) => {
      const base = path.basename(name, '.txt');
      return base === sourceKey || base.startsWith(`${sourceKey}.`) || base.includes(sourceKey);
    });
    if (matches.length !== 1) {
      throw new Error(`Expected one source file for ${sourceKey}, got ${matches.length}: ${matches.join(', ')}`);
    }
    sourceFileCache.set(sourceKey, matches[0]);
  }
  return sourceFileCache.get(sourceKey);
}

function readSource(sourceFile) {
  return decoder.decode(fs.readFileSync(path.join(sourceDir, sourceFile)));
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
    `- 源目录：${book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...categoryLines,
    '',
    '## 提取原则',
    '',
    '- 标题为检索用浓缩标题。',
    '- `description` 保留源文本原文段落，由脚本按源文件段号抽取。',
    '- 本书由多组短论组成，本轮只收可独立检索的判断段、方法段和结论段，不按篇目机械平均分配。',
    '- 纯新闻铺垫、短笑话、重复人物攻讦和附录推广文字不单独收录。',
    '',
  ];

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function buildRecords() {
  return entries.map(([category, title, sourceKey, sourceParagraph, keywords], index) => {
    if (!taxonomy.includes(category)) {
      throw new Error(`Unknown category: ${category}`);
    }

    const sourceFile = resolveSourceFile(sourceKey);
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
if (records.length !== 104) {
  throw new Error(`Expected 104 records, got ${records.length}`);
}

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
