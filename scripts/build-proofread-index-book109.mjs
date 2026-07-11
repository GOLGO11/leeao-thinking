import fs from 'node:fs';
import path from 'node:path';

const bookNo = '109';
const bookTitle = '你不知道的彭明敏';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '与同书保留的文本比对、朋友伦理、知识分子不从政、先行者被遗忘或政治行动论证重复，或已被相邻段落完整覆盖',
    ids: [
      'LAT109-005', 'LAT109-006', 'LAT109-010', 'LAT109-017', 'LAT109-020',
      'LAT109-023', 'LAT109-025', 'LAT109-029', 'LAT109-039', 'LAT109-063',
      'LAT109-070', 'LAT109-071', 'LAT109-075', 'LAT109-078', 'LAT109-090',
      'LAT109-103', 'LAT109-106', 'LAT109-123',
    ],
  },
  {
    reason: '主要是下一段论证的材料铺垫、个人经历、自我评价、人物轶事或单一案情细节，脱离上下文后不足以独立构成思想索引',
    ids: [
      'LAT109-019', 'LAT109-022', 'LAT109-055', 'LAT109-056', 'LAT109-093',
      'LAT109-102', 'LAT109-107', 'LAT109-108', 'LAT109-111', 'LAT109-112',
      'LAT109-114', 'LAT109-121',
    ],
  },
];

const dropMap = new Map(dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])));

const overrides = {
  'LAT109-001': { title: '历史记录应在社会热潮中保留另一面' },
  'LAT109-003': { title: '批评人物仍可保留其光明面' },
  'LAT109-004': { title: '原刊对照可以发现书本删改' },
  'LAT109-008': { title: '历史事件也受偶然因素推动' },
  'LAT109-009': { title: '私生活涉及公益时便不再只是私德' },
  'LAT109-011': { title: '革命者应承担行动后果' },
  'LAT109-012': { title: '以屈辱换取的宽大只会加深仇恨' },
  'LAT109-013': { title: '回忆录必须接受同时代证据检验' },
  'LAT109-014': { title: '政治被告应借公开审判表达信念' },
  'LAT109-015': { title: '当事人自述可用于核验审讯事实' },
  'LAT109-016': { title: '预先否认可能暴露预期指控' },
  'LAT109-018': { title: '判决书可能只呈现部分办案事实' },
  'LAT109-021': { title: '刊登攻击也要给当事人答辩机会' },
  'LAT109-024': { title: '伤害者也可能同时展开救援' },
  'LAT109-026': { title: '权势形成后才出现的拥护未必真诚' },
  'LAT109-027': { title: '政治先行者应获得始终如一的感怀' },
  'LAT109-028': { title: '不予评论也能模糊既存事实' },
  'LAT109-030': { title: '知识分子应以思想批判政治', category: '人格' },
  'LAT109-031': { title: '独立成功仍无法回避强邻问题' },
  'LAT109-032': { title: '权力尚未到手也可能先使人忘友' },
  'LAT109-034': { title: '删改文字就是变造历史真相' },
  'LAT109-035': { title: '公共人物应以历史评价约束权欲' },
  'LAT109-036': { title: '总统实权必须受宪政结构限制' },
  'LAT109-037': { title: '极权会用动听牺牲口号强迫服从' },
  'LAT109-040': { title: '解严后必须兑现戒严法承诺的上诉权' },
  'LAT109-041': { title: '思想不能被直接认定为犯罪知识' },
  'LAT109-042': { title: '公开交往不能被认定为秘密联络' },
  'LAT109-043': { title: '不知内容的密封信件不能构成犯罪' },
  'LAT109-044': { title: '阅读历史文件不等于参加政治组织' },
  'LAT109-045': { title: '向人权组织公布政治犯名单不构成犯罪' },
  'LAT109-046': { title: '对立双方可能因各自利益共同做大案件' },
  'LAT109-047': { title: '案发时形成的原始文件证据力更强' },
  'LAT109-048': { title: '制度会因自身利益拒绝纠正已知冤案' },
  'LAT109-049': { title: '强迫取得的自白必须有补强证据' },
  'LAT109-050': { title: '由被控机关自查刑求只是表演' },
  'LAT109-051': { title: '法律开脱不能抹去道德上的历史责任' },
  'LAT109-052': { title: '刑求者会借被迫自白完成自我欺骗' },
  'LAT109-053': { title: '特别法和宪法保障应优先于普通法限制' },
  'LAT109-057': { title: '反对者返乡可能造成政权招安的观感' },
  'LAT109-058': { title: '政治行动方式应配合个人所长' },
  'LAT109-059': { title: '反威权可以超越统独分歧' },
  'LAT109-060': { title: '出版使命可以置于营利之上' },
  'LAT109-061': { title: '版权授权不得超出契约地域范围' },
  'LAT109-062': { title: '选书应看作品质量而非私人关系' },
  'LAT109-064': { title: '禁书损失应归责于查禁者' },
  'LAT109-067': { title: '批评政权者也应检验自己的制度依赖' },
  'LAT109-068': { title: '迫使政权依自身法律行事也是斗争' },
  'LAT109-072': { title: '对绝交者仍说公道话才见政治气度' },
  'LAT109-073': { title: '核心指控消失后附属罪名便失去基础' },
  'LAT109-076': { title: '政治挂帅会使知识分子丧失所守' },
  'LAT109-077': { title: '可以利用任职反证法律自相矛盾' },
  'LAT109-081': { title: '反抗言论管制可以利用管辖边界' },
  'LAT109-082': { title: '交易凭证可以揭穿查禁说法' },
  'LAT109-083': { title: '暂不追究违法有时更有利于读者' },
  'LAT109-085': { title: '出版处分超过法定期限便失效' },
  'LAT109-088': { title: '公开信函必须保留全文并呈现原件' },
  'LAT109-089': { title: '发表私人书信应由发表者独自负责' },
  'LAT109-092': { title: '为他人争取救济比只求自身更可贵' },
  'LAT109-094': { title: '有限篇幅可以换取长期实际效果' },
  'LAT109-095': { title: '认真的前辈会坦白纠正微小错误' },
  'LAT109-097': { title: '威权开放也可能用于吸纳反对者' },
  'LAT109-110': { title: '政治通缉可能只是权力需要的具文' },
  'LAT109-113': { title: '内部措辞可以反推文件来源' },
  'LAT109-115': { title: '秘密政策文件会暴露未公开的统治措施' },
  'LAT109-117': { title: '提拔地方精英也可能服务政治控制' },
  'LAT109-118': { title: '国家教育和金钱可以被用于制造忠诚' },
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
      id: `LAT109-${String(sequence++).padStart(3, '0')}`,
      title: override.title || record.title,
      category: override.category || record.category,
    };
  });

const inputIds = new Set(input.records.map((record) => record.id));
for (const id of [...dropMap.keys(), ...Object.keys(overrides)]) {
  if (!inputIds.has(id)) throw new Error(`Unknown extraction id: ${id}`);
}
if (records.length !== 96) throw new Error(`Expected 96 retained records, found ${records.length}`);
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
const proofreadSummary = '校对轮保留李敖本人可独立检索的历史记录方法、版本核验、朋友伦理、知识分子角色、政治判断、法权主张、威权治理和出版原则；删去同义复现、材料铺垫、个人轶事、自我评价及只对单一案情成立的细节。description 字段未改写，仍保留提取轮原文。';
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
  '- 保留李敖本人可独立检索的历史记录方法、版本核验、朋友伦理、知识分子角色、政治判断、法权主张、威权治理和出版原则。',
  '- 彭明敏、吕佳真、谢聪敏及匿名投书作者的独立观点仍不转列为李敖思想；新闻、司法文书和秘密档案仍只作为论证材料。',
  '- 朋友伦理区分“不为政治牺牲朋友”和“友情不能包庇大是大非错误”两个相反方向的原则，其余同义复现予以删除。',
  '- 知识分子角色保留思想批判、政治挂帅、权力是非和集体依附四个不同层次，不保留个人拒绝任职的短篇轶事。',
  '- 政治先行者被遗忘与政治行动必须落实，各只保留论证最完整的一条。',
  '- 提取轮确认的八条跨册整段重复继续保持零重复入选。',
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
