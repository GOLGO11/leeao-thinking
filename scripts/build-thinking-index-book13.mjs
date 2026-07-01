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
  .find((name) => name.startsWith('005.'));
const sourceDir = path.join(rootDir, sourceRoot, essayGroup, sourceBookDir);
const outputDir = path.join(rootDir, 'outputs', '013.李敖文存二集');
const decoder = new TextDecoder('gb18030');

const book = {
  sequence: '013',
  title: '李敖文存二集',
  slug: 'leeao-wencun-erji',
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
  ['法权', '刑先于法律', '001', 14, '刑罚,法律,无法无天'],
  ['法权', '极权用科学方法升级酷刑', '001', 15, '极权,酷刑,科学方法'],
  ['法权', '废肉刑表面轻实际重', '001', 34, '肉刑,汉文帝,刑罚'],
  ['法权', '犯罪只能罚本人', '001', 40, '犯罪主体,代罚,刑法'],
  ['文化', '父权集中了家内支配权', '001', 42, '父权,家庭,支配'],
  ['法权', '传统连坐杀一窝', '001', 46, '连坐,族诛,刑罚'],
  ['法权', '族诛不以人为单位', '001', 52, '族诛,人权单位,家族'],
  ['法权', '中国人权单位按家族计算', '001', 56, '人权单位,家族,文化'],
  ['法权', '人权代位深入人心', '001', 59, '人权代位,缇萦,交换'],
  ['法权', '代罚违背现代刑法', '001', 65, '代罚,犯罪主体,现代刑法'],
  ['法权', '人格权不能让与', '001', 66, '人格权,人身权,法理'],
  ['法权', '不可出让权利先于政府', '001', 69, '不可出让权利,政府,奴隶'],
  ['法权', '奴隶是人格大减等', '001', 77, '奴隶,人格,罗马法'],
  ['法权', '奴隶来源连接买卖掳掠', '001', 83, '奴隶,买卖,掳掠'],
  ['文化', '中国没有黑奴但有黄奴', '001', 86, '奴隶,黄奴,文化'],

  ['文化', '女人常被做成败国替罪羊', '002', 5, '杨贵妃,男权,替罪羊'],
  ['人格', '不爱江山爱美人要看行动', '002', 9, '江山,美人,行动'],

  ['写作', '老夫子把国文带进死胡同', '003', 4, '国文,老夫子,写作'],
  ['知识', '线装书读得少也读得糟', '003', 5, '线装书,中华文化,知识'],
  ['方法', '可以改成适足会改坏论点', '003', 8, '可以,适足,语义'],
  ['方法', '倒果为因是不通', '003', 14, '因果,倒果为因,论证'],
  ['方法', '不该怪逸豫本身', '003', 18, '逸豫,因果,归因'],
  ['文化', '道德迷把安逸娱乐当罪', '003', 22, '道德迷,安逸,娱乐'],
  ['写作', '命题先要弄清来龙去脉', '003', 24, '作文命题,古文,来龙去脉'],

  ['文化', '美本身无须道德判断', '004', 12, '美,选美,道德判断'],
  ['政治', '美不该被政治挂帅', '004', 13, '美,政治挂帅,统战'],
  ['方法', '道德性禁止和政治性开放同样混', '004', 14, '道德,政治,选美'],

  ['政治', '改名学是思想宣传战', '005', 6, '改名学,命名学,宣传'],
  ['方法', '改名理由不该随政治情绪转移', '005', 20, '改名,政治情绪,历史'],

  ['人格', '敢说我的重要', '006', 3, '重要,勇气,判断'],
  ['方法', '重要性主观可变', '006', 11, '重要性,主观,变化'],
  ['知识', '重要发现常先被当不重要', '006', 12, '巴斯德,贝尔,发现'],
  ['方法', '重要性需要舆论检讨', '006', 13, '重要性,舆论,检讨'],
  ['方法', '社会问题要个别解决', '006', 15, '社会问题,个别解决,进化'],
  ['法权', '舆论多言就是人权民主求真', '006', 16, '舆论,人权,民主'],
  ['政治', '政治家能重视被视为不重要的事', '006', 17, '政治家,萧何,阿拉斯加'],

  ['方法', '善必须实践', '007', 12, '善,实践,动机'],
  ['文化', '诛心文化造好人不造好事', '007', 13, '诛心,动机观点,事实'],
  ['法权', '法律事件不可当道德判断', '007', 14, '法律事件,道德判断,强奸罪'],
  ['法权', '诛心会使人人可诛', '007', 15, '诛心,意淫,人道主义'],

  ['知识', '诗无达诂', '008', 2, '诗经,解释,诗无达诂'],
  ['文化', '禁者自禁脱者自脱', '008', 31, '禁令,脱衣舞,保守势力'],
  ['文化', '灵肉可以合一', '008', 43, '李玫瑰,身体,写作'],
  ['方法', '不能用淫字摆平真相', '008', 53, '真相,淫,判断'],
  ['知识', '行业专精会改变轻视', '008', 60, '脱衣舞,专业化,艺术'],

  ['政治', '现代政治害人会转弯', '009', 4, '现代政治,陷害,借刀'],
  ['政治', '借党报大刀杀人', '009', 10, '中央日报,借刀杀人,台大'],
  ['政治', '党报主张打官司失体', '009', 13, '党报,打官司,宽容'],
  ['人格', '不能容异己会自损', '009', 16, '异己,宽忍,恶名'],
  ['政治', '不能容一青年划不来', '009', 17, '容忍,青年人,政治损失'],
  ['人格', '权势不能贬低不靠它的人', '009', 19, '权势,名士,烈士'],
  ['人格', '肉体不自由不等于精神不自由', '009', 20, '肉体自由,精神自由,迫害'],
  ['法权', '公民权利不是大逆不道', '009', 21, '公民,宪法,权利'],
  ['政治', '李敖主张和平渐进改革', '009', 25, '改革,和平,渐进'],
  ['方法', '思想变化是改革动力', '009', 26, '思想变化,改革,动力'],
  ['政治', '不承认政治领导一切', '009', 32, '政治,领导一切,知识分子'],
  ['政治', '思想变化可以少流血', '009', 33, '思想变化,流血,非暴力'],
  ['政治', '知识分子与流氓合作是腐败公式', '009', 34, '知识分子,流氓,政治'],
  ['政治', '爱国不只政权转移', '009', 36, '爱国,政权,社会改良'],
  ['人格', '不合作不降志辱身', '009', 38, '不合作,降志辱身,知识分子'],
  ['政治', '非政治救国活动有实效', '009', 39, '救国,非政治,民情'],
  ['法权', '民情民智与人权法律非暴力防极权', '009', 40, '民情,民智,人权'],
  ['方法', '社会改造是政治清明基础', '009', 41, '社会改造,政治清明,基础'],
  ['写作', '公开试行胜过藏着高论', '009', 49, '公开,实践,高论'],
  ['政治', '回答知识分子去向', '009', 50, '知识分子,政治,救国'],

  ['法权', '违背礼法信义契约不能忍受', '010', 7, '契约,信义,商业道德'],
  ['政治', '封杀异己却谈公道', '010', 13, '封杀异己,公道,办报'],

  ['政治', '流血自由让双方都亏', '011', 7, '流血自由,谭嗣同,变法'],
  ['法权', '流血自由是临终表白真我的自由', '011', 9, '流血自由,抗议,烈士'],
  ['政治', '新式统治者暗中干掉异己', '011', 10, '统治技术,暗杀,异己'],
  ['法权', '公审可剥夺自辩', '011', 13, '公审,律师,被告'],
  ['政治', '斯大林消灭流血自由', '011', 16, '斯大林,流血自由,屈辱'],
  ['法权', '现代烈士失去悲壮死亡自由', '011', 17, '烈士,自由,统治技术'],
  ['政治', '新式统治者先毁掉烈士信用', '011', 18, '烈士,信用,统治者'],

  ['知识', '不容于现状的文人可改行谋生', '012', 8, '文人,知识人,谋生'],
  ['政治', '知识人应为被压迫大众说话', '012', 23, '知识人,大众,余光中'],
  ['写作', '禁毁让怪杰难以畅言', '012', 29, '禁毁,出书,李卓吾'],
  ['知识', '希望时代跑在自己的书前面', '012', 35, '时代,书,落伍'],
  ['写作', '写作者丧失出书权利与方便', '012', 36, '写作者,出书,权利'],
  ['人格', '江山代有才人出', '012', 49, '才人,播种,信念'],
  ['人格', '救国救人类事业折损率最大', '012', 50, '救国,失败,知识人'],
  ['知识', '文坛影响依赖环境大小', '012', 51, '文坛,环境,影响'],
  ['知识', '小环境压缩知识人命运', '012', 52, '小环境,知识人,命运'],
  ['人格', '局外人不知挫折多大', '012', 65, '挫折,局内人,出家'],

  ['写作', '泛敦厚主义虚礼化表达', '013', 4, '泛敦厚主义,表达,批评'],
  ['方法', '批评重在内容和指涉点', '013', 6, '批评,指涉点,方法'],
  ['法权', '进步社会依赖法治', '013', 7, '法治,戒讼,礼治'],

  ['文化', '书房碉堡是文化人通病', '014', 7, '文化人,书房,通病'],
  ['人格', '豪华监狱训练孤独', '014', 9, '孤独,豪华监狱,忍耐'],
  ['人格', '牢狱可怕在寂寞', '014', 11, '牢狱,寂寞,预习'],

  ['写作', '不像样杂志靠媚世津贴派销', '015', 3, '杂志,媚世,津贴'],
  ['文化', '文化沙漠上的仙人掌被点缀', '015', 4, '文化沙漠,仙人掌,自我'],
  ['写作', '独立杂志不随波逐流', '015', 5, '文风,独立杂志,随波逐流'],
  ['人格', '废墟中盖小建筑寄小希望', '015', 7, '废墟,希望,未来'],
  ['人格', '只要不倒下可怜一点也可怜', '015', 8, '废墟,可怜,坚持'],

  ['写作', '写全新不是全新拷贝', '016', 3, '全新,拷贝,作品'],
  ['人格', '没人能赶在台风前面', '016', 4, '台风李敖,论断,个性'],
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
    '- 附录与外部材料原则上不作为李敖思想条目收录。',
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
