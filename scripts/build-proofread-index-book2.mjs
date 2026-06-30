import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '002.李敖自传与回忆续集');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT002-010', '只作胡适关系的局部文献补证，思想索引价值已由 LAT002-008 覆盖。'],
  ['LAT002-018', '只说明《文星》立场另有专书证明，思想密度偏低。'],
  ['LAT002-020', '段落过短，主要是过渡判断，言论自由主题已由相邻条目承载。'],
  ['LAT002-028', '是事件背景提要，独立思想含量低，保留后续更完整段落。'],
  ['LAT002-035', '是信件组导语，偏人物交往背景。'],
  ['LAT002-044', '是患难交友背景，独立思想性较弱。'],
  ['LAT002-060', '偏萧孟能个人品评，和思想索引主轴距离较远。'],
  ['LAT002-083', '与国法党限主题重复，保留理论表达更完整的 LAT002-084。'],
]);

const overrides = new Map([
  ['LAT002-001', {
    category: '历史观与地域意识',
    title: '两岸隔绝中的骨肉伦理',
    keywords: '两岸隔绝,国民党,亲情伦理',
  }],
  ['LAT002-002', {
    title: '困学求变后的思想定型',
    keywords: '读书,思想定型,知识分子',
  }],
  ['LAT002-003', {
    title: '书刊管制限制思想资源',
    keywords: '书刊管制,思想资源,国民党',
  }],
  ['LAT002-004', {
    category: '传统与社会',
    title: '传统文化不等于国家命运',
    keywords: '钱穆,传统文化,国家民族',
  }],
  ['LAT002-005', {
    title: '御用学者迎合帝王心态',
    keywords: '钱穆,蒋介石,御用学者',
  }],
  ['LAT002-006', {
    title: '胡适影响的早期阅读',
    keywords: '胡适,早期阅读,思想来源',
  }],
  ['LAT002-007', {
    title: '《播种者胡适》引发思想论战',
    keywords: '胡适,文星,思想论战',
  }],
  ['LAT002-008', {
    title: '以原始文献反驳臆测',
    keywords: '胡适,原始资料,文证',
  }],
  ['LAT002-009', {
    category: '历史观与地域意识',
    title: '五四使新文化运动政治化',
    keywords: '五四,新文化运动,政治化',
  }],
  ['LAT002-011', {
    title: '国民党恶法的系统批判',
    keywords: '恶法录,国民党,法律批判',
  }],
  ['LAT002-012', {
    title: '朋友关系不取消批评',
    keywords: '王尚义,朋友,批评',
  }],
  ['LAT002-013', {
    category: '历史观与地域意识',
    title: '断裂时代的文化寻根',
    keywords: '王尚义,五四传统,文化断裂',
  }],
  ['LAT002-014', {
    title: '知识分子的可耻阶级与例外',
    keywords: '知识分子,儒家传统,特立独行',
  }],
  ['LAT002-015', {
    title: '知识分子在低气压中的代言',
    keywords: '知识分子,台湾,文星',
  }],
  ['LAT002-016', {
    title: '文星拒绝政治挂帅',
    keywords: '文星,政治挂帅,思想',
  }],
  ['LAT002-017', {
    category: '传统与社会',
    title: '现代化不等于否定文化研究',
    keywords: '文星,中国文化,现代化',
  }],
  ['LAT002-019', {
    title: '出版预审没有法理依据',
    keywords: '出版法,预审制,中央党部',
  }],
  ['LAT002-021', {
    title: '国法党限之争的正面发难',
    keywords: '国法党限,文星,出版审查',
  }],
  ['LAT002-022', {
    title: '思想言论者暴露于无约束权力',
    keywords: '思想自由,言论自由,权力',
  }],
  ['LAT002-023', {
    title: '党命令压过行政命令',
    keywords: '文星,党命令,行政命令',
  }],
  ['LAT002-024', {
    title: '法律胜利不能抵消公论败绩',
    keywords: '法律,公论,道德',
  }],
  ['LAT002-025', {
    title: '文星封杀的象征意义',
    keywords: '文星,封杀,正义',
  }],
  ['LAT002-026', {
    title: '理想高于战友去留',
    keywords: '理想,文星,战友',
  }],
  ['LAT002-027', {
    title: '思想性杂志有永久价值',
    keywords: '文星,思想性杂志,永久价值',
  }],
  ['LAT002-029', {
    title: '文星接替自由中国的思想位置',
    keywords: '文星,自由中国,思想自由',
  }],
  ['LAT002-030', {
    title: '宪法自由被违宪法律搁置',
    keywords: '宪法,言论自由,非法搜索',
  }],
  ['LAT002-031', {
    title: '开明政治信誉下的黑影',
    keywords: '国民党,自由中国,文星',
  }],
  ['LAT002-032', {
    title: '反共政权迫害自由主义者',
    keywords: '自由主义,反共,迫害',
  }],
  ['LAT002-033', {
    title: '文星是心智真诚的象征',
    keywords: '文星,真诚,台湾',
  }],
  ['LAT002-034', {
    title: '文祸揭开知识分子创伤',
    keywords: '知识分子,文祸,迫害',
  }],
  ['LAT002-036', {
    title: '环境与教育制造软弱青年',
    keywords: '青年,教育,环境',
  }],
  ['LAT002-037', {
    title: '查禁书刊的劫后余波',
    keywords: '查禁,书刊,国民党',
  }],
  ['LAT002-038', {
    title: '国际特赦与良心犯运动',
    keywords: '国际特赦,良心犯,人权',
  }],
  ['LAT002-039', {
    title: '政治犯名单外泄的反监控意义',
    keywords: '泰源监狱,政治犯,名单',
  }],
  ['LAT002-040', {
    title: '把外泄责任揽到自己身上',
    keywords: '泰源名单,责任,孟绝子',
  }],
  ['LAT002-041', {
    title: '孤寂中的妨害军机者',
    keywords: '妨害军机,党外,台独',
  }],
  ['LAT002-042', {
    title: '以非党化教育守住女儿',
    keywords: '女儿,教育,三民主义',
  }],
  ['LAT002-043', {
    title: '狱中书信作为父女教育',
    keywords: '坐牢,书信,尼赫鲁',
  }],
  ['LAT002-045', {
    title: '判决书也会编造神话',
    keywords: '判决书,刑求,冤案',
  }],
  ['LAT002-046', {
    title: '刑求逼供制造政治冤案',
    keywords: '刑求,爆炸案,邀功',
  }],
  ['LAT002-047', {
    title: '岛内外皆无自由感',
    keywords: '自由,台湾,坐牢',
  }],
  ['LAT002-048', {
    title: '解严秀与上诉权封锁',
    keywords: '解严,政治犯,上诉',
  }],
  ['LAT002-049', {
    title: '解严后应恢复救济权',
    keywords: '戒严法,上诉,法律救济',
  }],
  ['LAT002-050', {
    category: '政治权力批判',
    title: '以晴空乱流戳破解严美景',
    keywords: '蒋经国,解严秀,晴空乱流',
  }],
  ['LAT002-051', {
    category: '法律与言论自由',
    title: '刑满无保导致候保拘押',
    keywords: '保人,政治犯,候保队',
  }],
  ['LAT002-052', {
    title: '拒绝交保与继续感化威胁',
    keywords: '交保,政治犯,感化',
  }],
  ['LAT002-053', {
    category: '法律与言论自由',
    title: '交保制度违背刑满释放',
    keywords: '交保,监狱行刑法,违法',
  }],
  ['LAT002-054', {
    title: '刑满释放不能以誓书拖延',
    keywords: '监狱行刑法,释放,誓书',
  }],
  ['LAT002-055', {
    title: '反对政府是民主常态',
    keywords: '民主,政府,誓书',
  }],
  ['LAT002-056', {
    title: '不利政府的言行无罪',
    keywords: '政府,法律,言论',
  }],
  ['LAT002-057', {
    title: '拒绝交保的自我负责',
    keywords: '保人,英雄,拒绝交保',
  }],
  ['LAT002-058', {
    title: '法律保护下仍须归还公道',
    keywords: '公道,法院,萧孟能',
  }],
  ['LAT002-059', {
    title: '授权办事也有道理和道德',
    keywords: '朋友,道德,萧孟能',
  }],
  ['LAT002-061', {
    category: '人格与自我',
    title: '文化理想不能以小算盘收场',
    keywords: '文化理想,财务,文星',
  }],
  ['LAT002-062', {
    title: '真理高于亲疏立场',
    keywords: '真理,大义灭亲,择善固执',
  }],
  ['LAT002-063', {
    title: '看守所超收的结构问题',
    keywords: '台北看守所,分监,超收',
  }],
  ['LAT002-064', {
    category: '法律与言论自由',
    title: '保护名义下的通信监控',
    keywords: '看守所,信件检查,监控',
  }],
  ['LAT002-065', {
    title: '劳动与牢狱时间的消磨',
    keywords: '监狱,做工,寂寞',
  }],
  ['LAT002-066', {
    title: '政治性特殊关押',
    keywords: '看守所,法务部,政治犯',
  }],
  ['LAT002-067', {
    title: '思想纯正作为用人条件',
    keywords: '管理员,思想纯正,监狱',
  }],
  ['LAT002-068', {
    title: '死刑犯一律脚镣违法',
    keywords: '脚镣,刑事诉讼法,违法',
  }],
  ['LAT002-069', {
    title: '党报订阅与经济凌虐',
    keywords: '党报,经济凌虐,看守所',
  }],
  ['LAT002-070', {
    title: '病舍中的特权秩序',
    keywords: '病舍,特权,看守所',
  }],
  ['LAT002-071', {
    title: '查扣书刊的荒谬尺度',
    keywords: '查禁书刊,战争与和平,荒谬',
  }],
  ['LAT002-072', {
    title: '看病成为囚犯片刻移动',
    keywords: '看病,囚犯,生命力',
  }],
  ['LAT002-073', {
    title: '管理安全压倒人权',
    keywords: '人权,看守所,出庭',
  }],
  ['LAT002-074', {
    title: '超收造成的人犯爆炸',
    keywords: '监狱,人犯爆炸,缓刑',
  }],
  ['LAT002-075', {
    title: '低成本剥夺自由无法教化',
    keywords: '自由,政府,监狱成本',
  }],
  ['LAT002-076', {
    title: '囚房空间塑造身体动作',
    keywords: '囚房,空间,身体',
  }],
  ['LAT002-077', {
    title: '文星死后主流变乱流',
    keywords: '文星,主流,乱流',
  }],
  ['LAT002-078', {
    title: '诬告被刊登清白被封锁',
    keywords: '媒体,封锁,名誉',
  }],
  ['LAT002-079', {
    title: '文星复刊的未来取向',
    keywords: '文星,未来取向,复刊',
  }],
  ['LAT002-080', {
    title: '洁本叙事替暴政开脱',
    keywords: '文星,洁本,暴政',
  }],
  ['LAT002-081', {
    title: '文星不是私产而是公器',
    keywords: '文星,公器,萧孟能',
  }],
  ['LAT002-082', {
    title: '思想挂帅挖政治之根',
    keywords: '文星,思想挂帅,政治挂帅',
  }],
  ['LAT002-084', {
    title: '宪政时代党限受国法限制',
    keywords: '宪政,党限,国法',
  }],
  ['LAT002-085', {
    title: '国民党应接受批评',
    keywords: '国民党,批评,言论自由',
  }],
  ['LAT002-086', {
    title: '宪政要求党退出司法军队',
    keywords: '宪政,党限,司法军队',
  }],
  ['LAT002-087', {
    title: '读书人不能被随意栽诬',
    keywords: '读书人,栽诬,文星',
  }],
  ['LAT002-088', {
    title: '文星开拓中文出版风潮',
    keywords: '文星书店,中文出版,香港书展',
  }],
  ['LAT002-089', {
    title: '出版契约中的行规与法律',
    keywords: '出版契约,法律,行规',
  }],
  ['LAT002-090', {
    title: '资料保存支撑当场举证',
    keywords: '资料大王,证据意识,原稿',
  }],
]);

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
    'proofread_from',
  ];

  const rows = [
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(record[header])).join(',')),
  ];

  fs.writeFileSync(filePath, `\uFEFF${rows.join('\n')}\n`, 'utf8');
}

function writeMarkdown(filePath, payload) {
  const { book, taxonomy, records } = payload;
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
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
      lines.push(`- 提取轮编号：${record.proofread_from}`);
      lines.push('');
      lines.push('原文：');
      lines.push('');
      lines.push(`> ${record.description}`);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function countByCategory(records, taxonomy) {
  return taxonomy
    .map((category) => [category, records.filter((record) => record.category === category).length])
    .filter(([, count]) => count > 0);
}

function writeSummary(filePath, payload, originalRecords) {
  const { book, taxonomy, records } = payload;
  const categoryCounts = countByCategory(records, taxonomy);
  const lines = [
    `# 《${book.title}》${book.round}说明`,
    '',
    `本轮由提取轮 ${originalRecords.length} 条校对为 ${records.length} 条，删除 ${dropReasons.size} 条。`,
    '',
    '校对动作只涉及条目取舍、分类、标题、关键词和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
    '',
    '## 删除条目',
    '',
    ...[...dropReasons.entries()].map(([id, reason]) => `- ${id}：${reason}`),
    '',
    '## 分类统计',
    '',
    ...categoryCounts.map(([category, count]) => `- ${category}：${count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-校对轮.csv',
    '- 思想索引-校对轮.json',
    '- 思想索引-校对轮.md',
  ];

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

const originalPayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const book = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
};

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const override = overrides.get(record.id) ?? {};
    return {
      ...record,
      ...override,
      id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
      book: book.title,
      round: book.round,
      status: book.status,
      proofread_from: record.id,
    };
  });

const missingOverrides = records.filter((record) => !overrides.has(record.proofread_from));
if (missingOverrides.length) {
  throw new Error(`Missing proofreading override for: ${missingOverrides.map((record) => record.proofread_from).join(', ')}`);
}

const payload = {
  book,
  taxonomy: originalPayload.taxonomy,
  records,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, originalPayload.records);

console.log(`Proofread ${originalPayload.records.length} records into ${records.length} records for ${book.title}.`);
