import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '064.李敖书牍集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT064-002', '同篇“复刊须有自由精神”更能承载《文星》复刊批判，本条偏李敖存在感与即时反讽，校对轮删除。'],
  ['LAT064-004', '同篇“人生路要直线前进”更能形成方法入口，本条偏人生感慨铺陈，校对轮删除。'],
  ['LAT064-007', '查扣须书面属于过细程序点，同篇国家赔偿与宪法权利条目更完整，校对轮删除。'],
  ['LAT064-013', '短促结语与前两条查禁标准同题，独立思想密度较低，校对轮删除。'],
  ['LAT064-020', '口头命令与书面文件的史料折扣偏具体史证细节，同篇历史写作原则已有更稳定条目承载，校对轮删除。'],
  ['LAT064-030', '“报恩不能怕提名”偏个案尾声与感叹，前文“不提李敖”现象已由三条承载，校对轮删除。'],
  ['LAT064-039', '律师对垒的具体案情较细，后条“律师须拒不义案件”原则性更强，校对轮删除。'],
  ['LAT064-041', '惠安乡风与“头皮”故事偏附带趣语，写作使命已由“揭黑要个案详追”“沉默也是姑息”承载，校对轮删除。'],
  ['LAT064-044', '四百天拖案偏数字细节，同篇“司法延宕不能当传言”“不惩拖案即坐实”更概括，校对轮删除。'],
  ['LAT064-048', '郑南榕案对比偏问案背景，后条“判决会改写言论尺度”更能独立呈现法权判断，校对轮删除。'],
  ['LAT064-050', '杂志执照被害的背景铺陈较长，同篇法院函文与同案标准条目更能承载法权思想，校对轮删除。'],
  ['LAT064-056', '树敌验朋友是同篇引入，后两条“战斗君子”“真理旁”更集中，校对轮删除。'],
  ['LAT064-062', '“将来”条款解释偏契约细部，同组保留人格、记忆与责任三条即可，校对轮删除。'],
  ['LAT064-063', '让步不等于无异议偏事实辩正，同组“选择性记忆不可信”更具方法入口，校对轮删除。'],
  ['LAT064-069', '蒋家王朝本纪是“牢狱生成清算史”的延伸劝勉，独立思想入口较窄，校对轮删除。'],
  ['LAT064-080', '专家玄虚吓唬青年与“神秘化会助长马克思主义”同题，后者概括更稳，校对轮删除。'],
  ['LAT064-082', '“用马克思主义反共不通”是一句式重复，已由“不能以正统反异端”和结论条承载，校对轮删除。'],
]);

const overrides = new Map([
  ['LAT064-001', { title: '知识分子拒绝召见', keywords: '知识分子,尊严,召见' }],
  ['LAT064-003', { title: '复刊须有自由精神', keywords: '文星,自由,复刊' }],
  ['LAT064-005', { title: '人生路要直线前进', keywords: '人生路,方向,直线' }],
  ['LAT064-006', { title: '走动也要带任务', keywords: '时间管理,资料分类,行动' }],
  ['LAT064-008', { title: '赔偿承诺不能赖账', keywords: '国家赔偿,查扣,政府信用' }],
  ['LAT064-009', { title: '权利受害可求赔偿', keywords: '宪法,国家赔偿,公务员责任' }],
  ['LAT064-010', { title: '出版也是抗议', keywords: '出版,蒋介石研究,抗议' }],
  ['LAT064-011', { title: '查禁标准被选择使用', keywords: '鲁迅,查禁,国民党' }],
  ['LAT064-012', { title: '问题在只禁李敖', keywords: '查禁,左书,李敖' }],
  ['LAT064-014', { title: '晚清式宪改秀', keywords: '五大臣,宪政,国民党' }],
  ['LAT064-015', { title: '理想常被政客接收', keywords: '党外,理想,权力' }],
  ['LAT064-016', { title: '邮检造成双重损失', keywords: '邮政,查禁,订户' }],
  ['LAT064-017', { title: '理想主义被权力排挤', keywords: '党外,理想主义,政客' }],
  ['LAT064-018', { title: '君子不因小人改道', keywords: '天行,君子,自守' }],
  ['LAT064-019', { title: '近侍须写无讳史', keywords: '回忆录,蒋介石,历史' }],
  ['LAT064-021', { title: '只写善会损害可信', keywords: '传记,史实,可信' }],
  ['LAT064-022', { title: '爱人以德不隐恶', keywords: '君子,忠诚,隐恶' }],
  ['LAT064-023', { title: '自传贵在无讳', keywords: '自传,禁忌,史料' }],
  ['LAT064-024', { title: '自立先于环境', keywords: '封杀,写作,自立' }],
  ['LAT064-025', { title: '正义不是挑拨', keywords: '正义,友情,是非' }],
  ['LAT064-026', { title: '卖友不是君子', keywords: '朋友,人格,道德' }],
  ['LAT064-027', { title: '感谢也不敢提名', keywords: '知识分子,封锁,名字' }],
  ['LAT064-028', { title: '高层也怕提名', keywords: '知识分子,恐惧,沉默' }],
  ['LAT064-029', { title: '文化索引也能封杀', keywords: '文化索引,李敖,封杀' }],
  ['LAT064-031', { title: '登记不得转让', keywords: '出版登记,法律,转让' }],
  ['LAT064-032', { title: '查禁显露政治用途', keywords: '查禁,党外,政府目的' }],
  ['LAT064-033', { category: '法权', title: '报纸须对广告负责', keywords: '报纸,广告,责任' }],
  ['LAT064-034', { title: '害人广告应拒登', keywords: '广告,法律,伤害' }],
  ['LAT064-035', { title: '独立报也会同路', keywords: '自立晚报,国民党,同路' }],
  ['LAT064-036', { title: '党外不是诽谤特权', keywords: '诽谤,党外,人告人' }],
  ['LAT064-037', { title: '揭黑要个案详追', keywords: '黑狱,个案,写作' }],
  ['LAT064-038', { title: '沉默也是姑息', keywords: '冤狱,写作,清算' }],
  ['LAT064-040', { title: '律师须拒不义案件', keywords: '林肯,律师,正义' }],
  ['LAT064-042', { title: '停审须有法定原因', keywords: '法院,停审,审判' }],
  ['LAT064-043', { title: '司法延宕不能当传言', keywords: '司法,延宕,监督' }],
  ['LAT064-045', { title: '不惩拖案即坐实', keywords: '案件延宕,司法,事实' }],
  ['LAT064-046', { title: '赔偿替代割肉', keywords: '赔偿,文明,诉讼' }],
  ['LAT064-047', { title: '旧友仍可争理', keywords: '友情,道义,争理' }],
  ['LAT064-049', { title: '判决会改写言论尺度', keywords: '法院,媒体,尺度' }],
  ['LAT064-051', { title: '法院函文配合封杀', keywords: '文星,法院,市府' }],
  ['LAT064-052', { title: '同案标准不能变', keywords: '文星,查扣,法律' }],
  ['LAT064-053', { title: '警察不能越权裁断', keywords: '警察,内政部,权限' }],
  ['LAT064-054', { title: '查报不能避重就轻', keywords: '警察,法令,查报' }],
  ['LAT064-055', { title: '执行快慢显出厚薄', keywords: '法院,执行,标准' }],
  ['LAT064-057', { title: '朋友要做战斗君子', keywords: '朋友,是非,乡愿' }],
  ['LAT064-058', { title: '真朋友站在真理旁', keywords: '朋友,真理,距离' }],
  ['LAT064-059', { title: '答复必须正面回应', keywords: '市府,法院,文星' }],
  ['LAT064-060', { title: '行政处罚要比较同案', keywords: '行政处罚,标准,文星' }],
  ['LAT064-061', { title: '一书二卖伤人格', keywords: '出版,契约,人格' }],
  ['LAT064-064', { title: '选择性记忆不可信', keywords: '记忆,证据,责任' }],
  ['LAT064-065', { title: '责任不能外包', keywords: '著作权,诈欺,责任' }],
  ['LAT064-066', { title: '同受迫害仍有类别', keywords: '国民党,政治犯,异端' }],
  ['LAT064-067', { title: '干部政策只是谎话', keywords: '蒋经国,干部,迫害' }],
  ['LAT064-068', { title: '牢狱生成清算史', keywords: '司马迁,史记,牢狱' }],
  ['LAT064-070', { title: '政治行动要表里一致', keywords: '政治行动,表里一致,演戏' }],
  ['LAT064-071', { title: '政治人物像在做秀', keywords: '政治人物,表演,不信任' }],
  ['LAT064-072', { title: '入体制须解释转向', keywords: '民意机关,党外,国民议会' }],
  ['LAT064-073', { title: '以旧法反问旧政权', keywords: '戒严法,国民党,法权' }],
  ['LAT064-074', { title: '知识分子要看大节', keywords: '知识分子,陈独秀,不妥协' }],
  ['LAT064-075', { title: '大节高于私交', keywords: '知识分子,判断,原则' }],
  ['LAT064-076', { title: '夹缝求生仍有底线', keywords: '知识分子,政工,底线' }],
  ['LAT064-077', { title: '正统马克思不能反共', keywords: '马克思主义,反共,考茨基' }],
  ['LAT064-078', { title: '钦定专家免于怀疑', keywords: '匪情专家,国民党,双重标准' }],
  ['LAT064-079', { title: '神秘化会助长马克思主义', keywords: '马克思主义,神秘化,青年' }],
  ['LAT064-081', { title: '不能以正统反异端', keywords: '方法学,以矛攻盾,反共' }],
  ['LAT064-083', { title: '关怀不能放弃批判', keywords: '方法学,关怀,批判' }],
  ['LAT064-084', { title: '非法搜查造就盗贼政府', keywords: '搜查,国民党,政府' }],
  ['LAT064-085', { title: '特权岛也逃不过标准', keywords: '纽约时报,诽谤,责任' }],
  ['LAT064-086', { title: '反击要言出必行', keywords: '广告,反击,法院' }],
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
    `# 《${payload.book.title}》思想索引（${payload.book.round}）`,
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
      id: `LAT064-${String(index + 1).padStart(3, '0')}`,
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
      '校对轮删除同篇同题重复、短促反讽、过细程序点、私人化窄场景和重复论证结论；保留能独立呈现李敖法权意识、历史写作、人格伦理、党外政治判断、知识分子尺度、出版抵抗和理论辨析的原文段落。description 未改写。',
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
  '# 《李敖书牍集》思想索引校对说明',
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
  '- 删除同篇同题重复、短促反讽、过细程序点、私人化窄场景和重复论证结论。',
  '- 法律程序、国家赔偿、出版登记、邮检、司法延宕、媒体责任和公共执法等材料优先按“法权”归类。',
  '- 党外路线、政治组织、政客批判和国民党权力结构按“政治”归类。',
  '- 历史写作、出版抵抗、冤案揭露和反击行动按“写作”归类；知识分子尺度与马克思主义理论辨析按“知识”或“方法”归类。',
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
  `Proofread 064.李敖书牍集: ${records.length} records. ` +
    `Dropped: ${dropped.length}. Source records: ${extraction.records.length}.`,
);
for (const item of categoryCounts(records)) {
  console.log(`${item.category}: ${item.count}`);
}
