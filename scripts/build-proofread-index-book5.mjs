import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '005.李敖快意恩仇录');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT005-001', '自序段落主要说明续作出版缘起，思想索引价值低于正文中的回忆录方法条目。'],
  ['LAT005-006', '少年图书馆研究与 LAT005-005、LAT005-012 的读书自修主题重复，校对轮保留更概括的两条。'],
  ['LAT005-013', '预官日记段落偏材料说明，军中磨练主题已由 LAT005-016、LAT005-017 承载。'],
  ['LAT005-031', '社会问题实察段落依附私人考察语境，方法主题不如史料、公开、海外舆论等条目稳定。'],
  ['LAT005-034', '逆境求援段落偏梁实秋个案，且与 LAT005-032、LAT005-033 的乱世牺牲主题相近。'],
  ['LAT005-045', '拒绝国民党提拔偏彭明敏人物评价，政治主轴由知识分子影响政治和自由民主本位条目承载。'],
  ['LAT005-051', '被戴台独帽与后文刑求逼供主题重叠，保留 LAT005-052 更具法权密度。'],
  ['LAT005-071', '宣淫定义偏章题起笔，性观念批判由 LAT005-072 承载更集中。'],
]);

const overrides = new Map([
  ['LAT005-002', { title: '祖宗观中的追远与作伪', keywords: '祖宗,追远,攀附' }],
  ['LAT005-003', { title: '回忆录不只写自己', keywords: '回忆录,时代,衬托' }],
  ['LAT005-004', { title: '禁书抹除作者姓名', keywords: '禁书,作者,书店' }],
  ['LAT005-005', { title: '课外阅读养成知识傲慢', keywords: '课外书,知识傲慢,学校' }],
  ['LAT005-007', { title: '少年时期已现思想底色', keywords: '少年,思想,预言' }],
  ['LAT005-008', { title: '真理高于师承', keywords: '真理,师承,诤言' }],
  ['LAT005-009', { title: '丧礼改革检验传统', keywords: '丧礼改革,古礼,传统' }],
  ['LAT005-010', { title: '大学治学贵在独立', keywords: '大学,独立治学,笔记' }],
  ['LAT005-011', { title: '真实自我胜过假成绩', keywords: '作弊,成绩,真实' }],
  ['LAT005-012', { title: '困学自修胜过大学', keywords: '自修,大学,困学' }],
  ['LAT005-014', { title: '威胁入党仍不屈', keywords: '入党,威胁,硬气' }],
  ['LAT005-015', { title: '极限中少做懦夫', keywords: '极限,勇士,真我' }],
  ['LAT005-016', { title: '以肉体磨练加工精神', keywords: '肉体训练,精神训练,军中' }],
  ['LAT005-017', { title: '军中经验炼成反抗资本', keywords: '军队,磨练,反抗' }],
  ['LAT005-018', { title: '大学为校外权势作伪证', keywords: '台大,伪证,权势' }],
  ['LAT005-019', { title: '学术自由不该助纣', keywords: '学术自由,陷害,权势' }],
  ['LAT005-020', { title: '自由意志来自读书放任', keywords: '父亲,自由意志,读书' }],
  ['LAT005-021', { title: '胡适打开思想出路', keywords: '胡适,思想,自由主义' }],
  ['LAT005-022', { title: '借题发挥才是方法', keywords: '借题发挥,方法,胡适' }],
  ['LAT005-023', { title: '个人主义造就特立独行', keywords: '个人主义,特立独行,思想自由' }],
  ['LAT005-024', { title: '文星挖国民党的文化根', keywords: '文星,国民党,文化思想' }],
  ['LAT005-025', { title: '禁书越禁越流传', keywords: '禁书,流传,读者' }],
  ['LAT005-026', { title: '青年责难政府应被容忍', keywords: '言论,政府,青年' }],
  ['LAT005-027', { title: '教授失去五四勇气', keywords: '大学教授,五四,勇气' }],
  ['LAT005-028', { title: '傲骨导致不合作', keywords: '知识分子,傲骨,不合作' }],
  ['LAT005-029', { title: '全盘西化拒绝选择论', keywords: '全盘西化,文化移植,选择' }],
  ['LAT005-030', { title: '重文本而轻作者', keywords: '读书,作者,文本' }],
  ['LAT005-032', { title: '乱世中种树不悔', keywords: '乱世,努力,牺牲' }],
  ['LAT005-033', { title: '素愿高于清名', keywords: '素愿,名誉,牺牲' }],
  ['LAT005-035', { title: '专栏要扩张言论尺度', keywords: '专栏,言论自由,尺度' }],
  ['LAT005-036', { title: '自由民主反省的少数派', keywords: '自由民主,自由中国,殷海光' }],
  ['LAT005-037', { title: '求真先于自卫', keywords: '求真,自卫,理想主义' }],
  ['LAT005-038', { title: '生存权先于不劳而获', keywords: '生存权,工作权,宪法' }],
  ['LAT005-039', { title: '纪念思想要整理遗稿', keywords: '遗稿,思想,纪念' }],
  ['LAT005-040', { title: '斗士不可劝退', keywords: '斗士,殷海光,纪念' }],
  ['LAT005-041', { title: '冤狱材料先送海外', keywords: '冤狱,法律文书,海外' }],
  ['LAT005-042', { title: '以海外舆论施压', keywords: '海外舆论,营救,压力' }],
  ['LAT005-043', { title: '连续公开揭发恶政', keywords: '揭发,知识人,政权' }],
  ['LAT005-044', { title: '求情无效须公开', keywords: '求情,公开,压制自由' }],
  ['LAT005-046', { title: '知识分子影响政治而不从政', keywords: '知识分子,政治,洁身自爱' }],
  ['LAT005-047', { title: '自由民主高于统独想象', keywords: '自由民主,台湾自救,运动本位' }],
  ['LAT005-048', { title: '没有办法就是空话', keywords: '具体办法,空话,联合国' }],
  ['LAT005-049', { title: '大是大非不可让步', keywords: '朋友,大是大非,进言' }],
  ['LAT005-050', { title: '用外国记者破封锁', keywords: '雷震,外国记者,封锁' }],
  ['LAT005-052', { title: '刑求逼出台独供词', keywords: '刑求,台独,政治犯' }],
  ['LAT005-053', { title: '大案制造依靠刑求', keywords: '刑求,假案,爆炸案' }],
  ['LAT005-054', { title: '感训就是洗脑', keywords: '感训,洗脑,政治犯' }],
  ['LAT005-055', { title: '政治不能牺牲朋友', keywords: '朋友,政治手段,卑鄙' }],
  ['LAT005-056', { title: '小人物被当匪谍', keywords: '匪谍,小人物,军法' }],
  ['LAT005-057', { title: '强制悔过颠倒罪责', keywords: '悔过,政治犯,罪责' }],
  ['LAT005-058', { title: '复出词汇也受审查', keywords: '复出,蒙难,审查' }],
  ['LAT005-059', { title: '从被害者看美国', keywords: '美国,法西斯,受害者' }],
  ['LAT005-060', { title: '社会公义不受收买', keywords: '公义,黑狱,收买' }],
  ['LAT005-061', { title: '武夫审查书刊', keywords: '审查,书刊,言论自由' }],
  ['LAT005-062', { title: '历史训练剖析权力', keywords: '历史训练,史料,国民党' }],
  ['LAT005-063', { title: '批判暴君要持久', keywords: '批判,暴君,专集' }],
  ['LAT005-064', { title: '支持反对党不等于信任政客', keywords: '反对党,政客,民主' }],
  ['LAT005-065', { title: '公开资料可翻出新义', keywords: '公开资料,解释,考证' }],
  ['LAT005-066', { title: '笔伐兼做辨冤', keywords: '笔伐,辨冤,国民党' }],
  ['LAT005-067', { title: '老百姓要反闹衙门', keywords: '衙门,老百姓,官司' }],
  ['LAT005-068', { title: '查禁法令自造混乱', keywords: '查禁,法令,出版' }],
  ['LAT005-069', { title: '持有禁书不等于散布', keywords: '禁书,持有,出版法' }],
  ['LAT005-070', { title: '判决不能违背常识', keywords: '判决,常识,经验法则' }],
  ['LAT005-072', { title: '性禁忌使语言失真', keywords: '性禁忌,假道学,失真' }],
  ['LAT005-073', { title: '给知识分子留浩然之气', keywords: '知识分子,浩然之气,敌人' }],
  ['LAT005-074', { title: '亡天下时必须站出来', keywords: '亡天下,知识分子,道德' }],
  ['LAT005-075', { title: '以圣人行自命', keywords: '圣人行,豪杰,仗义' }],
  ['LAT005-076', { title: '思想家应领导政治家', keywords: '思想家,政治家,自我肯定' }],
  ['LAT005-077', { title: '用玩世喜感化解逆境', keywords: '玩世,喜感,评论' }],
  ['LAT005-078', { title: '整理人类观念行为', keywords: '观念,行为,结论' }],
]);

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function categoryCounts(records, taxonomy) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
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
    '- 分类策略：校对轮继续使用 7 个原子分类，删除偏背景、偏轶事、偏重复的条目。',
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

function writeSummary(filePath, payload, originalRecords) {
  const { book, taxonomy, records } = payload;
  const counts = categoryCounts(records, taxonomy);

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
    ...counts.map((item) => `- ${item.category}：${item.count}`),
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
const taxonomy = originalPayload.taxonomy;
const originalBook = originalPayload.book;
const bookBase = {
  ...originalBook,
  round: '校对轮',
  status: '已校对',
};

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const override = overrides.get(record.id);
    if (!override) {
      throw new Error(`Missing proofreading override for ${record.id}`);
    }

    return {
      ...record,
      ...override,
      id: `LAT${bookBase.sequence}-${String(index + 1).padStart(3, '0')}`,
      book: bookBase.title,
      round: bookBase.round,
      status: bookBase.status,
      proofread_from: record.id,
    };
  });

const book = {
  ...bookBase,
  record_count: records.length,
  category_counts: categoryCounts(records, taxonomy),
};

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
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
