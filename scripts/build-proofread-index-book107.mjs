import fs from 'node:fs';
import path from 'node:path';

const bookNo = '107';
const bookTitle = '陈水扁的真面目';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与相邻的民主规范、目的与手段、政见核验、政治自传、亲属上诉或二二八证据论证重复，已由同一论证链中更完整的段落承载',
    ids: [
      'LAT107-005', 'LAT107-011', 'LAT107-013', 'LAT107-018', 'LAT107-020',
      'LAT107-021', 'LAT107-030', 'LAT107-035', 'LAT107-038', 'LAT107-040',
      'LAT107-041', 'LAT107-050', 'LAT107-051', 'LAT107-058', 'LAT107-059',
      'LAT107-063', 'LAT107-064', 'LAT107-066', 'LAT107-072', 'LAT107-076',
      'LAT107-078', 'LAT107-082',
    ],
  },
  {
    reason: '主要是导言修辞、竞选攻讦、人物褒贬、自我表彰或上下文依赖过强的个案判断，脱离章节后的独立思想价值不足',
    ids: [
      'LAT107-001', 'LAT107-003', 'LAT107-023', 'LAT107-024', 'LAT107-034',
      'LAT107-055', 'LAT107-056',
    ],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT107-002': { title: '有限选项会迫使选民选择较小危害' },
  'LAT107-004': { title: '反对党也会复制破坏议会规范的坏习惯' },
  'LAT107-006': { title: '掌权者会任意改写民主一词的含义' },
  'LAT107-007': { title: '民主首先是一种生活教养和风度' },
  'LAT107-008': { title: '反对威权不等于自身已经民主' },
  'LAT107-009': { title: '粗暴抗争可能先摧毁民主' },
  'LAT107-010': { title: '民主规范也依靠不成文的法律精神' },
  'LAT107-012': { title: '没有明文禁止不等于可以破坏规范' },
  'LAT107-014': { title: '政治人物应兼具犀利和从容' },
  'LAT107-015': { title: '敌人不正当不能替自己的不择手段辩护' },
  'LAT107-016': { title: '不择手段是政治悲剧的根源' },
  'LAT107-017': { title: '目的正当不保证手段正当' },
  'LAT107-019': { title: '不正当手段会反过来污染正当目的' },
  'LAT107-022': { title: '政治胜利也必须堂堂正正' },
  'LAT107-025': { title: '国家领导者不应以籍贯缩小认同' },
  'LAT107-026': { title: '打击敌人也不能歪曲真相' },
  'LAT107-027': { title: '是非判断不应随族群立场改变' },
  'LAT107-028': { title: '公共纪念不能选择性抹去不利史实' },
  'LAT107-029': { title: '和平交权必须等到事实发生后才能确认' },
  'LAT107-031': { title: '不了解亲历历史会使后人改写它' },
  'LAT107-032': { title: '政治命令修改教科书会扭曲历史' },
  'LAT107-033': { title: '政治需要会重新塑造人物籍贯' },
  'LAT107-036': { title: '政治团结口号可能暗含族群排除' },
  'LAT107-037': { title: '无族群承诺必须用实际言论检验' },
  'LAT107-039': { title: '崇高自由口号也可能被卖给财阀' },
  'LAT107-042': { title: '政见来源必须接受旧资料核验' },
  'LAT107-043': { title: '政策白皮书应先核查现行法律' },
  'LAT107-044': { title: '剪彩不能冒充长期建设的功劳' },
  'LAT107-045': { title: '官商结合会在民主中制造新贵族' },
  'LAT107-046': { title: '政党会随身份翻转辩论标准' },
  'LAT107-047': { title: '民主辩论不能分贵族和平民' },
  'LAT107-048': { title: '政治受难身份不能靠自传包装' },
  'LAT107-049': { title: '公开笔录可以检验逼供叙述' },
  'LAT107-052': { title: '政治犯身份必须符合案件性质' },
  'LAT107-053': { title: '刑期矛盾可以揭穿政治自传' },
  'LAT107-054': { title: '公开拒绝上诉不能与秘密上诉并存' },
  'LAT107-057': { title: '配偶独立上诉不应违背自由被告的明示意志' },
  'LAT107-060': { title: '判断行动必须看它实际符合谁的利益' },
  'LAT107-061': { title: '形式上保护被告的程序可能实际有利政权' },
  'LAT107-062': { title: '真正的原则之爱不能姑息错误' },
  'LAT107-065': { title: '政治道德不能止于善而要追求至善' },
  'LAT107-067': { title: '朋友利益与人民利益冲突时必须选择人民' },
  'LAT107-068': { title: '政治反对运动常混淆小义和大义' },
  'LAT107-069': { title: '单向利益共享必须以互易为前提' },
  'LAT107-070': { title: '政策来源必须追溯更早资料' },
  'LAT107-071': { title: '政策条件会随力量变化而失效' },
  'LAT107-073': { title: '受害情感不能授权人背离历史真相' },
  'LAT107-074': { title: '纪念展示不能用伪造录音充当证据' },
  'LAT107-075': { title: '历史纪念不能选择性书写族群暴力' },
  'LAT107-077': { title: '报告正文和附录必须遵守同一证据标准' },
  'LAT107-079': { title: '政府不能故意歪曲法令保护特权' },
  'LAT107-080': { title: '勇敢形象必须接受行动记录检验' },
  'LAT107-081': { title: '公开拒绝上诉又秘密上诉不能算勇敢' },
  'LAT107-083': { title: '错失政治时机暴露判断不足' },
};

function categoryCounts(records) {
  const counts = new Map();
  for (const record of records) counts.set(record.category, (counts.get(record.category) || 0) + 1);
  return Array.from(counts.entries())
    .sort((a, b) => a[0].localeCompare(b[0], 'zh-Hans-CN'))
    .map(([category, count]) => ({ category, count }));
}

function csvEscape(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(records) {
  const headers = ['id', 'source_id', 'book', 'round', 'status', 'category', 'title', 'description', 'source_file', 'source_paragraph', 'source_path', 'keywords'];
  return `${[
    headers.join(','),
    ...records.map((record) => headers.map((header) => csvEscape(
      Array.isArray(record[header]) ? record[header].join(';') : record[header],
    )).join(',')),
  ].join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`, '',
    `- 原始条目：${input.records.length}`,
    `- 校对后条目：${records.length}`,
    `- 删除条目：${dropMap.size}`, '',
  ];
  let currentCategory = '';
  for (const record of records) {
    if (record.category !== currentCategory) {
      currentCategory = record.category;
      lines.push(`## ${currentCategory}`, '');
    }
    lines.push(`### ${record.id} ${record.title}`, '', record.description, '', `出处：${record.source_file}#${record.source_paragraph}`, '');
  }
  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => (
    `${record.id}｜${record.category}｜${record.title}\n${record.description}\n出处：${record.source_file}#${record.source_paragraph}`
  )).join('\n\n')}\n`;
}

let sequence = 1;
const records = input.records
  .filter((record) => !dropMap.has(record.id))
  .map((record) => {
    const override = overrides[record.id] || {};
    return {
      ...record,
      round: '校对轮',
      status: '已校对',
      source_id: record.id,
      id: `LAT107-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

const inputIds = new Set(input.records.map((record) => record.id));
for (const id of [...dropMap.keys(), ...Object.keys(overrides)]) {
  if (!inputIds.has(id)) throw new Error(`Unknown extraction id: ${id}`);
}
if (records.length !== 54) throw new Error(`Expected 54 retained records, found ${records.length}`);
for (const key of ['title', 'description', 'source_id']) {
  const values = records.map((record) => record[key]);
  if (new Set(values).size !== values.length) throw new Error(`Duplicate ${key}`);
}
const sourceById = new Map(input.records.map((record) => [record.id, record]));
for (const record of records) {
  if (record.description !== sourceById.get(record.source_id)?.description) {
    throw new Error(`Description changed for ${record.source_id}`);
  }
}

const counts = categoryCounts(records);
const proofreadSummary = '校对轮保留李敖本人可独立检索的民主规范、目的与手段、政治伦理、历史方法、政策核验、司法程序和公共记忆判断；删去同一论证链中的重复台阶、竞选攻讦、人物褒贬、自我表彰及上下文依赖过强的个案判断。description 字段未改写，仍保留提取轮原文。';
const book = {
  ...input.book,
  round: '校对轮',
  status: '已校对',
  note: proofreadSummary,
  record_count: records.length,
  source_count: input.records.length,
  dropped_count: dropMap.size,
  category_counts: counts,
};
const payload = {
  ...input,
  book,
  round: '校对轮',
  status: '已校对',
  record_count: records.length,
  source_count: input.records.length,
  dropped_count: dropMap.size,
  category_counts: counts,
  note: proofreadSummary,
  proofread_at: new Date().toISOString(),
  dropped_records: [...dropMap.entries()].map(([id, reason]) => ({
    id,
    reason,
    title: input.records.find((record) => record.id === id)?.title || '',
  })),
  records,
};

fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.csv'), toCsv(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.md'), toMarkdown(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引.csv'), toCsv(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引.txt'), toTxt(records), 'utf8');

const proofreadNote = [
  `# ${bookTitle} 校对说明`, '',
  `- 输入：思想索引-提取轮.json（${input.records.length} 条）`,
  `- 输出：思想索引-校对轮.json / csv / md（${records.length} 条）`,
  `- 删除：${dropMap.size} 条`,
  '- 同步：思想索引.json / csv / txt 已更新为校对轮版本', '',
  '## 删除原则', '',
  ...dropGroups.map((group) => `- ${group.reason}：${group.ids.join('、')}`), '',
  '## 保留原则', '',
  '- 保留李敖本人可独立检索的民主规范、目的与手段、政治伦理、历史方法、政策核验、司法程序和公共记忆判断。',
  '- 陈水扁自传、庭审笔录、上诉书、二二八报告、纪念馆材料和相关人物文章，仍只在李敖明确评价、反驳或归纳的完整段落中随文保留。',
  '- “目的与手段”四连段压缩为不择手段的政治后果、目的与手段的逻辑区别、手段反过来污染目的三个层次。',
  '- 苗栗演讲中的政策举证保留资料核验、现行法律、官商关系和辩论标准等不同判断，不逐项保留竞选攻讦。',
  '- 蓬莱岛案和二二八相关文章保留程序、史料、证据标准与公共记忆原则，删去相邻重复举证。',
  '- 提取轮确认的十二条跨册整段重复继续保持零重复入选。',
  '- 分类继续固定为八个原子分类，没有为本书增加复合分类。',
  '- 标题只做压缩、纠偏和辨识度修订；description 不改写原文。', '',
  '## 分类统计', '',
  ...counts.map(({ category, count }) => `- ${category}：${count}`), '',
].join('\n');
fs.writeFileSync(path.join(outputDir, '校对说明.md'), proofreadNote, 'utf8');

console.log(JSON.stringify({
  book: `${bookNo}.${bookTitle}`,
  source: input.records.length,
  dropped: dropMap.size,
  retained: records.length,
  categories: counts,
}, null, 2));
