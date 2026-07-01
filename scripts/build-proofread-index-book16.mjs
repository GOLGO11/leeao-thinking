import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '016.教育与脸谱');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT016-027', '与“一封没寄出的信”中的 faculty 批评条目高度重复，校对轮保留后者更直接的自我说明。'],
  ['LAT016-029', '“待遇菲薄论是遮羞术”与后一条“偷换学术责任”重复，后一条概括性更强。'],
  ['LAT016-035', '与青年工作权条目重复，且表述更偏修辞性控诉。'],
  ['LAT016-040', '与“给后继者机会”和“不能用待遇薄自欺”相近，独立检索价值较弱。'],
  ['LAT016-044', '段落为沈刚伯引文，属于讨论材料，不作为李敖思想索引单列。'],
  ['LAT016-045', '段落为外部来稿/学生文字，不是李敖自己的论述。'],
  ['LAT016-046', '段落为外部来稿/学生文字，思想主旨已由师道与学生批评条目覆盖。'],
  ['LAT016-071', '“新朴学开倒车”与乾嘉余孽、公款资助开倒车两条重复，校对轮不再单列。'],
  ['LAT016-085', '段落出自附录作者陆啸钊的文章，不是李敖正文。'],
  ['LAT016-086', '段落出自附录作者陆啸钊的文章，不是李敖正文。'],
  ['LAT016-087', '段落出自附录作者陆啸钊的文章，不是李敖正文。'],
  ['LAT016-105', '胡佛救灾事迹偏人物材料，思想抽象度弱于“没有人有权利退休”。'],
  ['LAT016-106', '公共服务不取私利偏人物德行材料，校对轮避免与人生智慧项目重叠过多。'],
  ['LAT016-108', '人格历史段落偏传记收束，独立思想索引密度不足。'],
]);

const overrides = new Map([
  ['LAT016-009', { category: '政治', title: '教育革新牵动政治革新', keywords: '教育革新,政治革新,思想变化' }],
  ['LAT016-010', { title: '教育界也该受监督制衡', keywords: '教育界,监督,制衡' }],
  ['LAT016-012', { title: '为原则可以掼纱帽', keywords: '原则,辞职,风骨' }],
  ['LAT016-013', { title: '是非高于师道', keywords: '师道,是非,真理' }],
  ['LAT016-015', { title: '当仁不让不因老师例外', keywords: '当仁不让,老师,真理' }],
  ['LAT016-018', { title: '压倒真理的师道无直道', keywords: '师道,真理,直道' }],
  ['LAT016-024', { title: '学生批评老师是在维护师道', keywords: '学生批评,师道,真理' }],
  ['LAT016-026', { title: '身教也可接受公共批评', keywords: '身教,公共批评,老师' }],
  ['LAT016-030', { title: '待遇菲薄论偷换学术责任', keywords: '待遇,学术责任,偷换' }],
  ['LAT016-031', { title: '学院不是养老院救济院', keywords: '学院,养老院,学术' }],
  ['LAT016-032', { title: '学院没有养教授到死的义务', keywords: '学院,教授,义务' }],
  ['LAT016-034', { title: '老教授堵住青年工作权', keywords: '青年,工作权,机会' }],
  ['LAT016-038', { category: '人格', title: '干不好就该引咎辞职', keywords: '引咎辞职,把持,领导' }],
  ['LAT016-039', { title: '教出后继者就该给机会', keywords: '后继者,退休,机会' }],
  ['LAT016-041', { title: '不能用待遇薄亏欠学术', keywords: '待遇,学术,青年' }],
  ['LAT016-042', { category: '法权', title: '民主社会要让人站到亮处说话', keywords: '民主,言论,亮处' }],
  ['LAT016-043', { title: '批评制度要落到事实与人事', keywords: '事实,人事,制度' }],
  ['LAT016-047', { title: '批评团体不是私人恩怨', keywords: 'faculty,团体,私怨' }],
  ['LAT016-048', { title: '知识分子不要离开战场', keywords: '知识分子,战场,书斋' }],
  ['LAT016-050', { title: '不能在酱缸里酱成老学者', keywords: '酱缸,老学者,知识分子' }],
  ['LAT016-051', { title: '爱国要靠自由的学术研究', keywords: '学术研究,爱国,自由' }],
  ['LAT016-053', { title: '古史研究要到长城以北找资料', keywords: '古史,资料,长城' }],
  ['LAT016-054', { title: '学术要有博大远景', keywords: '学术研究,远景,李济' }],
  ['LAT016-055', { title: '推进科学先反省传统文化', keywords: '科学思想,传统文化,反省' }],
  ['LAT016-057', { title: '读书主义会关闭思想活动', keywords: '读书,思想活动,教育' }],
  ['LAT016-058', { title: '对子训练不是理性训练', keywords: '对子,逻辑,理性' }],
  ['LAT016-059', { title: '文字迷信使人离开实物', keywords: '文字迷信,实物,实验' }],
  ['LAT016-060', { title: '传统文化轻视知识即力量', keywords: '知识,力量,传统文化' }],
  ['LAT016-064', { title: '李济浓缩了教育学术悲剧', keywords: '李济,教育,学术悲剧' }],
  ['LAT016-067', { title: '学术资料不能变成私人财产', keywords: '学术资料,国家财产,公器' }],
  ['LAT016-068', { title: '学术公器应向公众开放', keywords: '资料开放,国家财产,民主' }],
  ['LAT016-069', { title: '封锁资料制造权威幻觉', keywords: '资料封锁,权威,学者' }],
  ['LAT016-070', { title: '乾嘉余孽不是现代科学史学', keywords: '乾嘉,科学史学,现代' }],
  ['LAT016-072', { title: '公款不该资助学术开倒车', keywords: '公款,科学,学术' }],
  ['LAT016-074', { title: '独裁型学术领导制造作伪空气', keywords: '学术领导,独裁,作伪' }],
  ['LAT016-075', { title: '不适任领导会成为时代逆流', keywords: '领导,逆流,李济' }],
  ['LAT016-076', { title: '研究机关死症是把持资料', keywords: '研究机关,资料,把持' }],
  ['LAT016-077', { title: '制度问题不能脱离掌权者', keywords: '制度,人,良法' }],
  ['LAT016-078', { title: '不交棒者常说青年不够', keywords: '交棒,青年,把持' }],
  ['LAT016-079', { title: '考试法是抡才根本标准', keywords: '考试法,抡才,标准' }],
  ['LAT016-080', { title: '踢开考试法就是法治笑话', keywords: '考试院,考试法,法治' }],
  ['LAT016-081', { title: '妾妇心态会放弃根本法', keywords: '妾妇之道,考试法,权利' }],
  ['LAT016-082', { title: '考试院不能变检核院', keywords: '检核,考试院,宪法' }],
  ['LAT016-083', { title: '徒法不足以自行', keywords: '考试权,良法,执行' }],
  ['LAT016-084', { title: '清高职位也该新陈代谢', keywords: '考试院,新陈代谢,下台' }],
  ['LAT016-088', { title: '知识分子入官场常得不偿失', keywords: '知识分子,官场,学术' }],
  ['LAT016-089', { title: '研究外交史要直触原料', keywords: '外交史,原料,史料' }],
  ['LAT016-090', { title: '从政可能断送学术', keywords: '从政,学术,近代史' }],
  ['LAT016-091', { title: '避谤不是有血气的哲学', keywords: '避谤,人格,血气' }],
  ['LAT016-092', { title: '防共治本在建设更好社会', keywords: '反共,社会,治本' }],
  ['LAT016-093', { title: '极左极右都通向极权', keywords: '极权,国社党,共产党' }],
  ['LAT016-094', { title: '理智爱国不喊空话', keywords: '爱国,理智,空话' }],
  ['LAT016-095', { title: '高调会误国', keywords: '高调,误国,现代化' }],
  ['LAT016-096', { title: '现代化是国家生存条件', keywords: '现代化,民族,生存' }],
  ['LAT016-097', { title: '建设是创造改造新秩序', keywords: '建设,制度,现代化' }],
  ['LAT016-098', { title: '依赖外援难成独立势力', keywords: '建设,外援,独立' }],
  ['LAT016-099', { title: '政治也要从基本事实做起', keywords: '实事求是,基本事实,政治' }],
  ['LAT016-100', { title: '求知先看原物件与事实', keywords: '事实,原文件,求知' }],
  ['LAT016-101', { title: '只靠书本会写政治八股', keywords: '书本,事实,八股' }],
  ['LAT016-102', { title: '知识分子不能对政治袖手', keywords: '知识分子,政治,责任' }],
  ['LAT016-103', { title: '做事比做官重要', keywords: '做事,事业,官场' }],
  ['LAT016-104', { title: '政治关系着知识分子的命运', keywords: '知识分子,政治,社会' }],
  ['LAT016-107', { title: '没有人有权利退休', keywords: '退休,工作,胡佛' }],
  ['LAT016-109', { title: '文星是口诛笔伐的空间', keywords: '文星,口诛笔伐,是非' }],
  ['LAT016-110', { title: '女作家也要深入社会', keywords: '女作家,社会,闺秀派' }],
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
    '- 分类策略：继续使用 7 个原子分类；删除重复、过渡、偏材料和外部引文条目。',
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

const keptOriginalRecords = originalPayload.records.filter((record) => !dropReasons.has(record.id));
if (keptOriginalRecords.length !== 96) {
  throw new Error(`Expected 96 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT016-${String(index + 1).padStart(3, '0')}`,
    book: bookBase.title,
    round: bookBase.round,
    status: bookBase.status,
    proofread_from: record.id,
  };
});

const allowedCategories = new Set(taxonomy);
for (const record of records) {
  if (!allowedCategories.has(record.category)) {
    throw new Error(`Unexpected category for ${record.id}: ${record.category}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...bookBase,
    record_count: records.length,
    category_counts: categoryCounts(records, taxonomy),
  },
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

console.log(`Built ${payload.book.title} proofread index: ${records.length} records.`);
