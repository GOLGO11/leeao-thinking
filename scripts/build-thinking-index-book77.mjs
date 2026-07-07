import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const rootDir = process.cwd();
const bookSeq = 77;
const bookTitle = '中国现代史正论';
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
  (name) => name.startsWith('008.'),
  'source book',
);
const sourceBookDir = path.join(sourceRootName, sourceCategoryName, sourceBookName);
const sourceDir = path.join(rootDir, sourceBookDir);
const sourceFiles = fs.readdirSync(sourceDir).filter((name) => /^\d+\..*\.txt$/u.test(name));

const book = {
  sequence: String(bookSeq).padStart(3, '0'),
  title: bookTitle,
  slug: 'zhongguo-xiandai-shi-zhenglun',
  sourceDir: sourceBookDir.replaceAll(path.sep, '/'),
  round,
  status,
  note:
    '本轮从《中国现代史正论》的青年党批判、国民党密件、陈立夫与CC、党与法、张学良与西安事变、国民党三通前科和《独立评论》疑案中提取思想索引。description 保留源文本原段落；目录、日期、电子书页脚、纯法规附录、纯谈话全文、注释清单和没有李敖判断的长引文不进入本轮。',
};

const candidates = [
  ['001.', 4, '政治', '青年党根本问题在法西斯倾向'],
  ['001.', 5, '政治', '青年党被夹杀后沦为花瓶党'],
  ['001.', 6, '政治', '民进党若法西斯化会成青年党第二'],

  ['002.', 2, '方法', '历史研究要动手找材料'],
  ['002.', 3, '写作', '密件须以史学眼光曝光'],
  ['002.', 5, '政治', '青年党已被国民党分化收买'],
  ['002.', 6, '人格', '晚节不保者难挣脱魔掌'],

  ['003.', 6, '政治', '青年党出卖自己至此'],
  ['003.', 7, '人格', '最后不合作象征不该晚节不保'],

  ['004.', 7, '政治', '乱拍马屁会捏造政治身份'],
  ['004.', 10, '方法', '史实不符就是捏造历史'],
  ['004.', 12, '政治', '捏造元老身份可制造反共先觉'],
  ['004.', 13, '政治', '宣传会制造正人君子错觉'],
  ['004.', 17, '方法', '显而易见事实为何不早说'],
  ['004.', 22, '方法', '旧说不指共产党便难改口'],
  ['004.', 30, '方法', '官方侦查结果反驳新说'],
  ['004.', 35, '方法', '迟来内幕若真反使旧说难通'],
  ['004.', 36, '方法', '有造谣前科便须合理怀疑'],

  ['005.', 2, '政治', 'CC派系来自陈氏兄弟势力'],
  ['005.', 5, '方法', '激烈否认可反证CC存在'],
  ['005.', 10, '政治', '陈立夫自掀CC之底耐人寻味'],
  ['005.', 11, '方法', '博读旁引可破政治欺人'],

  ['006.', 2, '政治', '国民政府合议形式独裁精神'],
  ['006.', 5, '政治', '总理遗教被当成法律'],
  ['006.', 7, '法权', '保障人权须有最高根本法'],
  ['006.', 11, '法权', '模糊人权命令令人失望'],
  ['006.', 13, '法权', '人权命令太空洞不明确'],
  ['006.', 15, '法权', '人权命令不能约束政府机关'],
  ['006.', 20, '法权', '只许州官放火不是保障'],
  ['006.', 22, '法权', '依法必须先问依什么法'],
  ['006.', 24, '法权', '没有明确法条必生分歧'],
  ['006.', 26, '法权', '贴上标签即可剥夺人权'],
  ['006.', 31, '法权', '党部证明定罪根本否认法治'],
  ['006.', 35, '法权', '公民应能负责讨论国家问题'],
  ['006.', 38, '法权', '求情无效只剩罢市即无法治'],
  ['006.', 41, '法权', '人权命令后仍有血肉模糊'],
  ['006.', 43, '法权', '真正法治只认法律不认人'],
  ['006.', 44, '法权', '无权限规定便无权利保障'],
  ['006.', 46, '法权', '补救缺陷要立根本法律'],
  ['006.', 48, '法权', '组织法不能保障基本自由人权'],
  ['006.', 49, '法权', '今日需要一个约法'],
  ['006.', 57, '人格', '胡适挺身负责署名'],
  ['006.', 59, '法权', '徒法不足以自行仍需法律确定'],
  ['006.', 63, '法权', '党纲与法律界限不易明了'],
  ['006.', 65, '政治', '建国大纲使宪法遥遥无期'],
  ['006.', 68, '政治', '没有宪法训政只是专制'],
  ['006.', 70, '法权', '宪法训练政府不得越权'],
  ['006.', 73, '政治', '政府也要受宪法训练'],
  ['006.', 75, '政治', '政治失败是不曾实行宪政'],
  ['006.', 76, '政治', '应以宪政训练人民与政府'],
  ['006.', 78, '法权', '明白人应懂基本人权法理'],
  ['006.', 80, '法权', '基本人权先于国家政府'],
  ['006.', 81, '知识', '中国人权理论武器单薄'],

  ['007.', 5, '法权', '宪法万灵论低估冻结手段'],
  ['007.', 6, '政治', '宪法可被临时条款冻结'],
  ['007.', 7, '法权', '有宪法不等于真有人权'],

  ['008.', 3, '政治', '直拨电话也是国民党无法拦截的通'],
  ['008.', 29, '人格', '孙铭九亲昵称呼显示张学良信任'],
  ['008.', 33, '方法', '少壮派处理事变高明于将领'],
  ['008.', 35, '政治', '将在外君命都有所不受'],
  ['008.', 36, '政治', '与虎谋皮是天真想法'],
  ['008.', 38, '政治', '妄想与虎谋皮完全错误'],
  ['008.', 39, '人格', '孙铭九是真人且足以不朽'],
  ['008.', 40, '写作', '公开写出来也是传信管道'],

  ['009.', 3, '政治', '蒋介石软禁张学良又分化东北军'],
  ['009.', 18, '方法', '军头被杀因不愿执行决议'],
  ['009.', 19, '政治', '少壮派判断高于高级将领'],
  ['009.', 20, '政治', '军头太不了解蒋介石阴狠'],
  ['009.', 22, '政治', '顾大局结果使张学良虽生犹死'],
  ['009.', 24, '方法', '对照细读可得历史真相'],

  ['010.', 5, '政治', '张学良拒绝满独促成中国统一'],
  ['010.', 9, '人格', '张学良宁做地方官也不做开国元勋'],

  ['011.', 2, '政治', '蒋介石长期囚禁爱国者空前绝后'],
  ['011.', 3, '人格', '被锁久了会扭曲自由感'],
  ['011.', 6, '写作', '挖掘张学良真相是不甘缄默的责任'],
  ['011.', 7, '人格', '张学良爱国大节有两点'],
  ['011.', 8, '写作', '出版张学良研究为拍案翻案'],

  ['012.', 2, '政治', '蒋介石对张学良阴狠卑鄙'],
  ['012.', 3, '政治', '蒋介石以诬名丑化张学良'],
  ['012.', 4, '法权', '特赦竟成为长期软禁'],
  ['012.', 5, '人格', '人间真相不因当事人缄默而缄默'],

  ['013.', 2, '政治', '张学良存在使历史难以落幕'],
  ['013.', 3, '法权', '张学良无完全自由不合法'],
  ['013.', 5, '方法', '熟知历史可识破国民党老套'],
  ['013.', 6, '政治', '张学良长寿使国民党继续现形'],

  ['014.', 3, '政治', '家庭礼拜秀仍难证明自由'],
  ['014.', 4, '文化', '御教堂式基督徒只是世俗权贵型'],
  ['014.', 5, '人格', '岁月会扭曲自由观'],

  ['015.', 2, '人格', '迟来的公道令人感慨'],
  ['015.', 3, '政治', '祝寿不等于平反只是和稀泥'],
  ['015.', 5, '方法', '悔祸悔悟说曲解历史'],
  ['015.', 6, '人格', '张学良九死无悔失去自由'],
  ['015.', 7, '方法', '学历史者要辨正关键解释'],

  ['016.', 2, '方法', '湮没谈话须由历史家发掘'],
  ['016.', 63, '方法', '张学良谈话显出蒋介石真面目'],

  ['017.', 5, '政治', '张学良两次自我牺牲背恶名'],
  ['017.', 6, '方法', '历史真相不因当事人隐晦而埋没'],
  ['017.', 8, '人格', '张学良含蓄是太忠厚'],
  ['017.', 9, '人格', '长寿换得清白机会不该含蓄'],

  ['018.', 7, '写作', '知情者不留纪录真相会随死去'],
  ['018.', 8, '方法', '研究西安事变受制于沉默与假话'],
  ['018.', 9, '人格', '长期失自由会造成认同与逃避'],
  ['018.', 10, '人格', '事关大义不宜曲护蒋介石'],
  ['018.', 11, '人格', '张学良应公布真相换清白'],
  ['018.', 13, '人格', '张学良应以直气留纪录'],

  ['019.', 5, '方法', '关键问题不答显示欲说还休'],
  ['019.', 6, '方法', '遮掩内容可从史料找答案'],
  ['019.', 12, '方法', '张学良遮掩蒋介石怯懦'],
  ['019.', 13, '方法', '欲说还休是在掩护背信者'],

  ['020.', 3, '政治', '保护关怀半世纪也太恐怖'],
  ['020.', 4, '法权', '特赦比十年刑期更可怕'],
  ['020.', 5, '人格', '长寿使张学良得以扬眉'],
  ['020.', 7, '人格', '清白要拼命争到底'],
  ['020.', 8, '人格', '为自己吐气就是为正义吐气'],

  ['021.', 7, '方法', '被拦截电讯仍能取得'],
  ['021.', 8, '政治', '杨虎城血案终会暴白于世'],
  ['021.', 9, '人格', '张学良应个别纪念杨虎城'],

  ['022.', 5, '政治', '回到台湾使纵囚戏码成功'],
  ['022.', 8, '人格', '大丈夫不应只认小市民的家'],
  ['022.', 11, '人格', '张学良无脸见东北父兄'],
  ['022.', 12, '人格', '长期拘禁可转为认同拘禁者'],
  ['022.', 15, '人格', '张学良回避还乡令人失望'],
  ['022.', 16, '人格', '少说少跑反像期望中的男子汉'],

  ['023.', 8, '人格', '捉蒋不因私谊而迟疑'],
  ['023.', 10, '人格', '错失还乡良机是不智不仁不勇'],
  ['023.', 12, '方法', '春秋责备贤者为国家哀'],
  ['023.', 23, '方法', '马君武诗责张学良是造谣'],
  ['023.', 32, '方法', '张学良被造谣诽谤已成定论'],
  ['023.', 35, '政治', '国民党造谣用心至今未已'],
  ['023.', 36, '人格', '马君武死法成诗句反讽'],
  ['023.', 37, '人格', '张学良令人敬仰同情又失望'],

  ['024.', 2, '政治', '国民党拒绝三通却处处例外'],
  ['024.', 3, '方法', '查证国民党前科才不轻信'],
  ['024.', 6, '政治', '九一八不抵抗不只张学良责任'],
  ['024.', 10, '方法', '不抵抗全记在张学良账上不公道'],
  ['024.', 11, '政治', '张学良替国民党中央背黑锅'],
  ['024.', 12, '政治', '不抵抗政策导致东北沦陷'],
  ['024.', 16, '政治', '国民党对内内行会用绑票对学生'],
  ['024.', 17, '政治', '国民党左右逢源使中国功夫'],
  ['024.', 18, '政治', '三通会使满洲国被习惯承认'],
  ['024.', 26, '政治', '被挟持下识时务同意通车'],
  ['024.', 28, '政治', '不承认原则下完成第一通'],
  ['024.', 33, '政治', '东北通讯资金往来难以掐断'],
  ['024.', 35, '方法', '承认主子不承认奴才'],
  ['024.', 37, '政治', '外内压力迫使国民党建议通邮'],
  ['024.', 45, '政治', '通邮谈判信誓旦旦后全让步'],
  ['024.', 46, '政治', '高压下通邮防卫藩篱尽撤'],
  ['024.', 47, '政治', '通邮大纲同时还有密约'],
  ['024.', 56, '政治', '卖国密约暴露不肯通邮真相'],
  ['024.', 59, '政治', '便利民众名义下完成第二通'],
  ['024.', 68, '政治', '不通商便无油水来源'],
  ['024.', 71, '政治', '物尽其用下完成第三通'],
  ['024.', 74, '方法', '国民党对汉奸政权三通标准离奇'],
  ['024.', 75, '政治', '今日国民党未必真的不三通'],
  ['024.', 80, '政治', '政府可通民众却通不过'],
  ['024.', 85, '政治', '严禁匪货与消费心理矛盾'],
  ['024.', 90, '方法', '绝不三通应先自照镜子'],
  ['024.', 110, '方法', '所谓不通商只是掩耳盗铃'],

  ['025.', 35, '方法', '直接当事人可揭发谎话'],
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
  '- 保留可独立检索的青年党批判、国民党密件、陈立夫与CC、党与法、张学良与西安事变、国民党三通前科和《独立评论》疑案判断。',
  '- 删除目录、日期、电子书页脚、纯法规附录、纯谈话全文、注释清单和没有李敖判断的长引文。',
  '- 张学良谈话与汪荣祖附录只取李敖的导言、结论或对史料意义的判断，不把全文转成李敖思想索引。',
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
