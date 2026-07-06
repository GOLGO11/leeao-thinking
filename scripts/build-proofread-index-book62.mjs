import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '062.李敖书札集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT062-001', '警察申诉流程偏操作性，后续“公务员能改错”更能形成稳定法权入口，校对轮删除。'],
  ['LAT062-008', '青年党“政治杂碎”段落偏即时辱骂式结论，统战对象与党外老化两条已承载同一政治判断，校对轮删除。'],
  ['LAT062-015', '影子政权代表空话与“不配存在的政权”同题，后者更完整，校对轮删除。'],
  ['LAT062-029', '批评党外的条件与前文“党外也须可批”及后文“骂自己人才有资格”重复，校对轮删除。'],
  ['LAT062-040', '澄清示范偏写作场景感受，思想入口不如“新闻须亲见”和“真理所在不饶人”稳定，校对轮删除。'],
  ['LAT062-052', '水准测量与“君子爱人以德”“真话不是偏激”同题，校对轮删除。'],
  ['LAT062-058', '惭愧不够偏对王晓波个人的连续质问，“站在第一线”更能概括人格判断，校对轮删除。'],
  ['LAT062-061', '文明法律观念是责任分担条目的补充提醒，独立思想密度较低，校对轮删除。'],
  ['LAT062-066', '催生成书偏人情与序文邀约，“原作不应掺水”更能呈现出版写作原则，校对轮删除。'],
  ['LAT062-069', '抗暴活证与“受难者走完最后十里”同题，后者更完整承载群众需要与行动方向，校对轮删除。'],
  ['LAT062-073', '查扣成本段落结尾接诗，单段作为 description 略不完整，且预抢制两条已承载出版压迫，校对轮删除。'],
  ['LAT062-077', '抢书无文来自附录新闻段落，虽有事实价值但非李敖直接论述，校对轮删除。'],
  ['LAT062-079', '命令滞后短段与预抢制、快半拍事实同题，思想入口不够稳定，校对轮删除。'],
  ['LAT062-085', '反共猪鬃是三通困境的谐趣附记，独立思想性弱于前两条三通判断，校对轮删除。'],
  ['LAT062-088', '哀矜老康偏人物场景，君子之爱已在前文形成更稳定索引入口，校对轮删除。'],
]);

const overrides = new Map([
  ['LAT062-002', { title: '公务员能改错', keywords: '公务员,纠错,警察' }],
  ['LAT062-003', { title: '思想家的婚姻风险', keywords: '思想家,婚姻,遗稿' }],
  ['LAT062-004', { title: '遗孀阻断思想', keywords: '思想流传,遗孀,遗作' }],
  ['LAT062-005', { title: '遗稿必须保存', keywords: '思想家,遗稿,纪念馆' }],
  ['LAT062-006', { category: '写作', title: '出版必须见全貌', keywords: '传记,纪念集,思想全貌' }],
  ['LAT062-007', { title: '统战须择对象', keywords: '统一战线,青年党,党外' }],
  ['LAT062-009', { title: '协商可能老化', keywords: '青年党,协商,党外' }],
  ['LAT062-010', { title: '明星退化成画皮', keywords: '明星,真实,虚假' }],
  ['LAT062-011', { title: '掌声制造虚假', keywords: '明星,政客,虚假' }],
  ['LAT062-012', { title: '书信落实思考', keywords: '写信,思考,成果' }],
  ['LAT062-013', { title: '党外也须可批', keywords: '党外,自我批评,自由' }],
  ['LAT062-014', { title: '不配存在的政权', keywords: '政权,存在,思维' }],
  ['LAT062-016', { title: '公产不可私占', keywords: '公帑,公产,学者' }],
  ['LAT062-017', { category: '人格', title: '读书人须分公私', keywords: '读书人,公私,仁义道德' }],
  ['LAT062-018', { title: '善管反成罪', keywords: '侵占,背信,保全权益' }],
  ['LAT062-019', { title: '侵占须看要件', keywords: '侵占罪,法理,常识' }],
  ['LAT062-020', { title: '媒体斗臭异己', keywords: '报纸垄断,平反,丑化' }],
  ['LAT062-021', { title: '不凭借既成势力', keywords: '已成势力,理想,委曲求全' }],
  ['LAT062-022', { title: '退出文化统战', keywords: '文化统战,主动,自立' }],
  ['LAT062-023', { title: '回忆录揭内幕', keywords: '报阀,儒林,内幕' }],
  ['LAT062-024', { title: '报纸本该是我们的', keywords: '报禁,青年,气魄' }],
  ['LAT062-025', { title: '全集依靠私人', keywords: '胡适全集,私人机构,公家' }],
  ['LAT062-026', { title: '史料杂志有功过', keywords: '传记文学,宣传,伪证' }],
  ['LAT062-027', { title: '专栏须扩展自由', keywords: '专栏,言论自由,失职' }],
  ['LAT062-028', { title: '假自由来自留皮', keywords: '言论尺度,画皮,自由假象' }],
  ['LAT062-030', { title: '骂自己人才有资格', keywords: '自由民主,党外,秦始皇' }],
  ['LAT062-031', { title: '办杂志要有骨头', keywords: '文责,杂志,勇气' }],
  ['LAT062-032', { title: '报禁于法无据', keywords: '报禁,宪法,法治' }],
  ['LAT062-033', { title: '禁令不能私换理由', keywords: '行政手续,报禁,理由' }],
  ['LAT062-034', { title: '写出真实血泪', keywords: '乱世,文学,历史' }],
  ['LAT062-035', { title: '新生代不可圆滑', keywords: '新生代,圆滑,政治' }],
  ['LAT062-036', { title: '警政奖章遮羞', keywords: '娼妓政策,警政,奖章' }],
  ['LAT062-037', { title: '证据不是借口', keywords: '证据,警察,不作为' }],
  ['LAT062-038', { category: '法权', title: '卖淫责任在媒孽', keywords: '卖淫,皮条,内政' }],
  ['LAT062-039', { category: '方法', title: '新闻须亲见', keywords: '新闻,报导,事实' }],
  ['LAT062-041', { title: '真理所在不饶人', keywords: '真理,乡愿,认真' }],
  ['LAT062-042', { title: '逐件检定战斗', keywords: '政治人物,战斗,检定' }],
  ['LAT062-043', { title: '相信不如成绩', keywords: '相信,成绩,空头支票' }],
  ['LAT062-044', { title: '政论不能离开常识', keywords: '反对党,坐牢,常识' }],
  ['LAT062-045', { title: '君子爱人以德', keywords: '原则,大义,姑息' }],
  ['LAT062-046', { category: '方法', title: '批人是取样板', keywords: '康宁祥,样板,批评' }],
  ['LAT062-047', { title: '山头不是原罪', keywords: '山头,后援团,政治组织' }],
  ['LAT062-048', { title: '党外需要思想棒喝', keywords: '党外,思想家,政客' }],
  ['LAT062-049', { title: '专栏可代编者立言', keywords: '编辑权,特区,共识' }],
  ['LAT062-050', { title: '真话不是偏激', keywords: '真话,乡愿,偏激' }],
  ['LAT062-051', { title: '稳健也会堵塞是非', keywords: '稳健分子,道德,真理' }],
  ['LAT062-053', { category: '知识', title: '知识分子无人发声', keywords: '知识分子,政治迫害,公开发声' }],
  ['LAT062-054', { title: '相信不是证据', keywords: '证据,相信,恩人' }],
  ['LAT062-055', { title: '同名当时须分辨', keywords: '辩论,语境,事实' }],
  ['LAT062-056', { title: '当事人更该写', keywords: '当事人,发表,护航' }],
  ['LAT062-057', { title: '立言必须重事实', keywords: '知识分子,事实,见解' }],
  ['LAT062-059', { title: '站在第一线', keywords: '立身,战斗,光明' }],
  ['LAT062-060', { title: '出版责任须分担', keywords: '出版法,新闻自由,大众利益' }],
  ['LAT062-062', { title: '查禁不应族诛', keywords: '查禁,延伸解释,陪斩' }],
  ['LAT062-063', { title: '查禁只能限当文', keywords: '装订厂,查扣,恶政' }],
  ['LAT062-064', { title: '抽毁保留活路', keywords: '禁书,专制,抽毁' }],
  ['LAT062-065', { title: '原作不应掺水', keywords: '千秋评论,原作,读者' }],
  ['LAT062-067', { title: '役男特权出境', keywords: '兵役,出境,平等' }],
  ['LAT062-068', { title: '忧患须靠战斗', keywords: '忧患,逃避,解脱' }],
  ['LAT062-070', { title: '受难者走完最后十里', keywords: '自由民主,群众,榜样' }],
  ['LAT062-071', { title: '追惩不能预抢', keywords: '查扣,追惩制,出版自由' }],
  ['LAT062-072', { title: '预抢制逼人放弃', keywords: '言论自由,预审,预抢' }],
  ['LAT062-074', { title: '党外提名也会垄断', keywords: '后援会,提名,苏秋镇' }],
  ['LAT062-075', { title: '党外也要清理', keywords: '党外,后患,清理' }],
  ['LAT062-076', { title: '病中做工才有意义', keywords: '工作,意义,疲累' }],
  ['LAT062-078', { title: '个人恩怨可放', keywords: '是非,原谅,殷海光' }],
  ['LAT062-080', { title: '委蛇不能失身份', keywords: '委蛇,立场,身份' }],
  ['LAT062-081', { title: '清白记录来自不合作', keywords: '阿登纳,清白,合作' }],
  ['LAT062-082', { title: '政治要朝远看', keywords: '春秋,千秋,委屈' }],
  ['LAT062-083', { title: '政治对立不该殃民', keywords: '三通,老百姓,虐政' }],
  ['LAT062-084', { title: '双重标准破坏平等', keywords: '三通,法律平等,双重标准' }],
  ['LAT062-086', { title: '政治失败源于昧实情', keywords: '政治人物,基层,失败' }],
  ['LAT062-087', { title: '批评促成新生', keywords: '新生代,选举,批评' }],
  ['LAT062-089', { title: '重建先靠是非', keywords: '党外清议,是非,重建' }],
  ['LAT062-090', { title: '不感喟只战斗', keywords: '感喟,工作,战斗' }],
  ['LAT062-091', { title: '做事者值得拥护', keywords: '事业,牺牲,风凉话' }],
  ['LAT062-092', { title: '成绩才是标准', keywords: '成绩,检定,理由' }],
  ['LAT062-093', { title: '趁早写下真人真事', keywords: '年谱,家信,真人真事' }],
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
    'source_id',
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

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引：${payload.book.round}`,
    '',
    `- 书目序号：${payload.book.sequence}`,
    `- 来源目录：${payload.book.sourceDir}`,
    `- 条目数：${payload.records.length}`,
    `- 状态：${payload.book.status}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`);
    lines.push('');
    for (const record of records) {
      lines.push(`### ${record.id}｜${record.title}`);
      lines.push('');
      lines.push(record.description);
      lines.push('');
      lines.push(
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
      );
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

const extractionIds = new Set(extraction.records.map((record) => record.id));
for (const id of [...dropReasons.keys(), ...overrides.keys()]) {
  if (!extractionIds.has(id)) {
    throw new Error(`Unknown extraction id: ${id}`);
  }
}

const dropped = extraction.records
  .filter((record) => dropReasons.has(record.id))
  .map((record) => ({
    id: record.id,
    title: record.title,
    reason: dropReasons.get(record.id),
  }));

const records = extraction.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const edit = overrides.get(record.id) ?? {};
    return {
      ...record,
      ...edit,
      id: `LAT062-${String(index + 1).padStart(3, '0')}`,
      source_id: record.id,
      round: '校对轮',
      status: '已校对',
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} for ${record.id}`);
  }
  const source = extraction.records.find((item) => item.id === record.source_id);
  if (!source) {
    throw new Error(`Missing source record for ${record.id}`);
  }
  if (record.description !== source.description) {
    throw new Error(`Description changed for ${record.id}`);
  }
}

const payload = {
  ...extraction,
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    note:
      '校对轮删除本地警务流程、同题重复、外部剪报段、过短查禁段、私人化场景和人物依赖过强的条目；保留能独立呈现李敖法权意识、证据方法、出版伦理、党外路线、政治判断、人格伦理、知识分子批评、写作方法与情爱思想的原文段落。description 未改写。',
  },
  records,
  dropped,
};

const jsonPath = path.join(outputDir, '思想索引-校对轮.json');
const csvPath = path.join(outputDir, '思想索引-校对轮.csv');
const mdPath = path.join(outputDir, '思想索引-校对轮.md');
const notePath = path.join(outputDir, '校对说明.md');

fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
writeCsv(csvPath, records);
writeMarkdown(mdPath, payload);

const noteLines = [
  '# 《李敖书札集》思想索引校对说明',
  '',
  `- 校对输入：${path.relative(rootDir, extractionPath)}`,
  `- 校对输出：${path.relative(rootDir, jsonPath)}`,
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 校对原则',
  '',
  '- description 只沿用原书段落，不做转述和改写。',
  '- 删除本地警务流程、同题重复、外部剪报段、过短查禁段、私人化场景和人物依赖过强的条目。',
  '- 法律、查禁、出版迫害、兵役特权、警政不作为等材料优先按“法权”归类；党外路线、政治组织、权力结构和政治人物批判按“政治”归类。',
  '- 新闻报导、举证、检定成绩、当事写作等材料按“方法”或“写作”区分；人格条目只保留可脱离具体人事复用的判断。',
  '- 情爱条目只保留思想家婚姻风险与遗孀阻断思想两类主旨明确的段落。',
  '',
];

if (dropped.length) {
  noteLines.push('## 删除条目', '');
  for (const item of dropped) {
    noteLines.push(`- ${item.id} ${item.title}：${item.reason}`);
  }
  noteLines.push('');
}

fs.writeFileSync(notePath, `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Proofread 062.李敖书札集: ${records.length} records. ` +
    `Dropped: ${dropped.length}. Source records: ${extraction.records.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
