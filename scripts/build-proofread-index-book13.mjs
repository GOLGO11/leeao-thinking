import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '013.李敖文存二集');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT013-006', '与“族诛不以人为单位”“人权单位被家族化”重复，保留后两条作为更清楚的制度分析。'],
  ['LAT013-014', '奴隶来源段偏材料罗列，校对轮保留“人格大减等”和“中国有黄奴”两条主旨。'],
  ['LAT013-017', '杨贵妃与温莎公爵的对照偏讽刺例证，思想索引价值弱于败国责任转嫁女人。'],
  ['LAT013-019', '对老夫子读线装书的批评与“国文死胡同”相邻重复，保留后一条。'],
  ['LAT013-031', '“重要性主观可变”偏过渡，保留“不重要的傻事可能最重要”和舆论检讨。'],
  ['LAT013-043', '李玫瑰灵肉合一偏人物评价，校对轮保留解释学、禁令、真相判断和行业专精条目。'],
  ['LAT013-048', '党报主张打官司失体偏事件细节，保留“借刀杀人”和“不能容异己会自损”。'],
  ['LAT013-050', '与“不能容异己会自损”重复，且语境更窄。'],
  ['LAT013-061', '与“不合作也是有为方法”“社会改造是政治清明基础”重复，校对轮不单列。'],
  ['LAT013-064', '“公开试行”是补充说明，主旨由改革动力与知识分子去向条目承载。'],
  ['LAT013-065', '全文总结段，内容已由前面政治与知识分子条目拆出。'],
  ['LAT013-083', '与“文坛影响受江山大小制约”重复，且总结性较强。'],
  ['LAT013-084', '个人挫折说明偏处境叙述，思想密度弱于知识人命运与改行谋生条目。'],
  ['LAT013-088', '书房碉堡偏文化人趣评，保留“豪华监狱”作为更凝练的孤独经验条目。'],
  ['LAT013-090', '与“豪华监狱”同属寂寞/牢狱准备，保留后者。'],
  ['LAT013-092', '文化沙漠与仙人掌偏背景铺陈，保留独立杂志与废墟小建筑。'],
  ['LAT013-095', '与“废墟里仍要盖小建筑”重复，校对轮保留更完整段落。'],
]);

const overrides = new Map([
  ['LAT013-001', { title: '刑原可无法无天', keywords: '刑罚,法律,无法无天' }],
  ['LAT013-002', { title: '极权酷刑也科学化', keywords: '极权,酷刑,科学方法' }],
  ['LAT013-003', { title: '废肉刑不等于轻刑', keywords: '肉刑,汉文帝,刑罚' }],
  ['LAT013-004', { title: '刑罚不能由旁人代受', keywords: '犯罪主体,代罚,刑法' }],
  ['LAT013-005', { category: '法权', title: '父权是一种家内权力', keywords: '父权,家庭,支配权' }],
  ['LAT013-007', { title: '族诛的单位不是个人', keywords: '族诛,人权单位,家族' }],
  ['LAT013-008', { title: '人权单位被家族化', keywords: '人权单位,家族,文化' }],
  ['LAT013-009', { title: '人权代位是怪现象', keywords: '人权代位,缇萦,代罚' }],
  ['LAT013-010', { title: '代罚不合现代刑法', keywords: '代罚,犯罪主体,现代刑法' }],
  ['LAT013-011', { title: '人格权不可过户', keywords: '人格权,人身权,法理' }],
  ['LAT013-012', { title: '不可出让权利先于政府法律', keywords: '不可出让权利,政府,法律' }],
  ['LAT013-013', { title: '奴隶是人格大减等', keywords: '奴隶,人格,罗马法' }],
  ['LAT013-015', { title: '中国没有黑奴但有黄奴', keywords: '奴隶,黄奴,文化' }],
  ['LAT013-016', { title: '败国责任转嫁女人', keywords: '杨贵妃,男权,替罪羊' }],

  ['LAT013-018', { title: '老夫子把国文带进死胡同', keywords: '国文,老夫子,写作' }],
  ['LAT013-020', { title: '可以与适足不能混', keywords: '可以,适足,语义' }],
  ['LAT013-021', { title: '倒果为因不通', keywords: '因果,倒果为因,论证' }],
  ['LAT013-022', { title: '归因不能怪逸豫本身', keywords: '逸豫,因果,归因' }],
  ['LAT013-023', { title: '道德迷敌视安逸娱乐', keywords: '道德迷,安逸,娱乐' }],
  ['LAT013-024', { title: '作文命题不能乱引古文', keywords: '作文命题,古文,来龙去脉' }],

  ['LAT013-025', { title: '美不是道德问题', keywords: '美,选美,道德判断' }],
  ['LAT013-026', { title: '美不能政治挂帅', keywords: '美,政治挂帅,统战' }],
  ['LAT013-027', { title: '禁止和开放都可能同样混', keywords: '道德,政治,选美' }],

  ['LAT013-028', { title: '改名学是宣传战', keywords: '改名学,命名学,宣传' }],
  ['LAT013-029', { title: '改名不该追随政治情绪', keywords: '改名,政治情绪,历史' }],

  ['LAT013-030', { title: '敢公开说我的重要', keywords: '重要,勇气,判断' }],
  ['LAT013-032', { title: '不重要的傻事可能最重要', keywords: '巴斯德,贝尔,发现' }],
  ['LAT013-033', { title: '重要性须经舆论检讨', keywords: '重要性,舆论,检讨' }],
  ['LAT013-034', { title: '社会问题一个萝卜一个坑', keywords: '社会问题,个别解决,进化' }],
  ['LAT013-035', { title: '舆论多言即人权民主求真', keywords: '舆论,人权,民主' }],
  ['LAT013-036', { title: '政治家看见不重要的价值', keywords: '政治家,萧何,阿拉斯加' }],

  ['LAT013-037', { title: '善不能只停在动机', keywords: '善,实践,动机' }],
  ['LAT013-038', { title: '诛心造好人不造好事', keywords: '诛心,动机观点,事实' }],
  ['LAT013-039', { title: '法律事件不能道德化', keywords: '法律事件,道德判断,强奸罪' }],
  ['LAT013-040', { title: '诛心到头人人可诛', keywords: '诛心,意淫,人道主义' }],

  ['LAT013-041', { title: '诗无达诂', keywords: '诗经,解释,诗无达诂' }],
  ['LAT013-042', { category: '法权', title: '禁令不能消灭风气', keywords: '禁令,脱衣舞,保守势力' }],
  ['LAT013-044', { title: '真相不能被淫字摆平', keywords: '真相,淫,判断' }],
  ['LAT013-045', { title: '专精化改变行业评价', keywords: '脱衣舞,专业化,艺术' }],

  ['LAT013-046', { title: '现代政治害人会转弯', keywords: '现代政治,陷害,借刀' }],
  ['LAT013-047', { title: '借刀杀人也有文字布局', keywords: '中央日报,借刀杀人,台大' }],
  ['LAT013-049', { category: '政治', title: '不容异己会自损', keywords: '异己,宽忍,恶名' }],
  ['LAT013-051', { title: '不靠权势者权势不能贬', keywords: '权势,名士,烈士' }],
  ['LAT013-052', { title: '肉体不自由不灭精神自由', keywords: '肉体自由,精神自由,迫害' }],
  ['LAT013-053', { title: '公民要求宪法权利', keywords: '公民,宪法,权利' }],
  ['LAT013-054', { title: '改革应和平渐进', keywords: '改革,和平,渐进' }],
  ['LAT013-055', { title: '改革动力在思想变化', keywords: '思想变化,改革,动力' }],
  ['LAT013-056', { title: '政治不能领导一切', keywords: '政治,领导一切,知识分子' }],
  ['LAT013-057', { title: '思想变化可少流血', keywords: '思想变化,流血,非暴力' }],
  ['LAT013-058', { title: '知识分子不该与流氓打天下', keywords: '知识分子,流氓,政治' }],
  ['LAT013-059', { title: '爱国不只争政权', keywords: '爱国,政权,社会改良' }],
  ['LAT013-060', { title: '不合作也是有为方法', keywords: '不合作,降志辱身,知识分子' }],
  ['LAT013-062', { title: '民智人权法律可防极权', keywords: '民情,民智,人权' }],
  ['LAT013-063', { title: '社会改造是政治清明基础', keywords: '社会改造,政治清明,基础' }],

  ['LAT013-066', { title: '契约信义不能破坏', keywords: '契约,信义,商业道德' }],
  ['LAT013-067', { title: '封杀异己还谈公道', keywords: '封杀异己,公道,办报' }],

  ['LAT013-068', { title: '流血自由让双方都亏', keywords: '流血自由,谭嗣同,变法' }],
  ['LAT013-069', { title: '流血自由是最后表白', keywords: '流血自由,抗议,烈士' }],
  ['LAT013-070', { title: '新式统治者偏好暗中除异己', keywords: '统治技术,暗杀,异己' }],
  ['LAT013-071', { title: '公审可以毁掉自辩', keywords: '公审,律师,被告' }],
  ['LAT013-072', { title: '斯大林式统治消灭流血自由', keywords: '斯大林,流血自由,屈辱' }],
  ['LAT013-073', { title: '现代烈士失去悲壮死亡自由', keywords: '烈士,自由,统治技术' }],
  ['LAT013-074', { title: '统治者先毁烈士信用', keywords: '烈士,信用,统治者' }],

  ['LAT013-075', { title: '文人不容于现状便改行', keywords: '文人,知识人,谋生' }],
  ['LAT013-076', { title: '知识人要替被压迫者说话', keywords: '知识人,大众,余光中' }],
  ['LAT013-077', { category: '法权', title: '禁毁使怪杰不能畅言', keywords: '禁毁,出书,言论' }],
  ['LAT013-078', { title: '希望时代跑在书前面', keywords: '时代,书,落伍' }],
  ['LAT013-079', { title: '写作者会失去出书方便', keywords: '写作者,出书,权利' }],
  ['LAT013-080', { title: '成事不必在我', keywords: '才人,播种,信念' }],
  ['LAT013-081', { title: '救世事业折损率最大', keywords: '救国,失败,知识人' }],
  ['LAT013-082', { title: '文坛影响受江山大小制约', keywords: '文坛,环境,影响' }],

  ['LAT013-085', { title: '泛敦厚主义削弱表达', keywords: '泛敦厚主义,表达,批评' }],
  ['LAT013-086', { title: '批评只问内容与指涉点', keywords: '批评,指涉点,方法' }],
  ['LAT013-087', { title: '进步社会靠法治', keywords: '法治,戒讼,礼治' }],

  ['LAT013-089', { title: '孤独生活像豪华监狱', keywords: '孤独,豪华监狱,忍耐' }],

  ['LAT013-091', { title: '不像样杂志靠媚世津贴派销', keywords: '杂志,媚世,津贴' }],
  ['LAT013-093', { title: '独立杂志不随波逐流', keywords: '文风,独立杂志,随波逐流' }],
  ['LAT013-094', { title: '废墟里仍要盖小建筑', keywords: '废墟,希望,未来' }],

  ['LAT013-096', { title: '写全新不是全新拷贝', keywords: '全新,拷贝,作品' }],
  ['LAT013-097', { title: '不能追在台风后论断', keywords: '台风李敖,论断,个性' }],
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

function categoryCounts(records, taxonomy) {
  return taxonomy
    .map((category) => ({
      category,
      count: records.filter((record) => record.category === category).length,
    }))
    .filter((item) => item.count > 0);
}

function writeMarkdown(filePath, payload) {
  const { book, taxonomy, records } = payload;
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：继续使用 7 个原子分类；删除重复、过渡、偏掌故和思想密度较弱的条目。',
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
      lines.push(record.description);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
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

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const originalPayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const taxonomy = originalPayload.taxonomy;
const bookBase = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
};

const originalIds = new Set(originalPayload.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!originalIds.has(id)) {
    throw new Error(`Unknown extraction record id: ${id}`);
  }
}

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const override = overrides.get(record.id) ?? {};

    if (override.category && !taxonomy.includes(override.category)) {
      throw new Error(`Unknown override category for ${record.id}: ${override.category}`);
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
