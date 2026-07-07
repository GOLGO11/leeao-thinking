import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 80;
const bookTitle = '中国艺术新研';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT080-005', '段落主要引出《宣和书谱》材料，真迹稀少已由遍寻无存和举世唯一条目承载。'],
  ['LAT080-008', '段落偏文物形制说明，唯一性和断层价值已由前后条目承载。'],
  ['LAT080-012', '与《周越墨迹研究》序中宋四家断层论证高度重复，校对轮保留更完整版本。'],
  ['LAT080-013', '与序文中前辈书法名家被忽略的论证重复，校对轮保留更完整版本。'],
  ['LAT080-027', '与正史寥寥遮蔽书法大家条目高度重复，校对轮保留原论文中的集中段落。'],
  ['LAT080-042', '段落主要记录问卷结果，审查立场和学术自由问题已由前后条目承载。'],
  ['LAT080-047', '段落是官方删改亲苏史料的单例，亲共改反共和国民党血统改写条目已承载主旨。'],
  ['LAT080-053', '段落偏单一质询条款，博物馆治理问题由法律根据、开放国宝和任期制条目更集中承载。'],
  ['LAT080-071', '段落偏收藏图说中的个别艺术家气度，独立思想密度弱于后续书法方法条目。'],
  ['LAT080-076', '段落偏个别书家条件与成就说明，内府条件与古碑功力的判断不如其他方法条目集中。'],
  ['LAT080-079', '段落偏个别书家对日本影响的材料说明，思想密度弱于书法变法和研究眼光条目。'],
  ['LAT080-096', '段落只是对许地山的短评，许地山论书法的核心已由前面三条承载。'],
]);

const overrides = new Map([
  ['LAT080-001', { title: '同代题跋最能定文物价值' }],
  ['LAT080-002', { title: '避讳细节可辅助文物断代' }],
  ['LAT080-003', { title: '承前启后的墨迹也会毁于兵灾' }],
  ['LAT080-004', { title: '权威想当然会误判文物存亡' }],
  ['LAT080-006', { title: '写得太好也会导致散佚' }],
  ['LAT080-007', { title: '遍寻无存反显真迹唯一' }],
  ['LAT080-009', { title: '乱世浩劫会改变文物流传' }],
  ['LAT080-010', { title: '民间记录可补宫廷著录不足' }],
  ['LAT080-011', { title: '材质研究可旁证文物真伪' }],
  ['LAT080-014', { title: '正史寥寥会遮蔽前辈名家' }],
  ['LAT080-015', { title: '周越影响力可从苏轼诗中见出' }],
  ['LAT080-016', { title: '俗气评价不等于艺术定论' }],
  ['LAT080-017', { title: '流风年代可解释师承影响' }],
  ['LAT080-018', { title: '正史可印证墨迹故事' }],
  ['LAT080-019', { title: '称臣对象可辅助文物断代' }],
  ['LAT080-020', { title: '钤印题诗可证明文物流传' }],
  ['LAT080-021', { title: '真迹重现能补艺术史断层' }],
  ['LAT080-022', { title: '国宝浩劫还有现代新厄' }],
  ['LAT080-023', { title: '一九四九造成国宝断代' }],
  ['LAT080-024', { title: '国宝沉浮需要哲理眼光' }],
  ['LAT080-025', { title: '幸存周跋改写艺术史' }],
  ['LAT080-026', { title: '宋四家不能凭空跳出' }],
  ['LAT080-028', { title: '周越是宋四家的关键衔接者' }],
  ['LAT080-029', { category: '法权', title: '学术发表不能向审查让步' }],
  ['LAT080-030', { title: '后学可纠正老师并扩展考证' }],
  ['LAT080-031', { title: '一件真迹可破解印文公案' }],
  ['LAT080-032', { title: '唯一最早构成文物价值' }],
  ['LAT080-033', { title: '周越墨迹补上书法缺环' }],
  ['LAT080-034', { title: '匿名外审应具名公开' }],
  ['LAT080-035', { title: '不为删文审查委曲自己' }],
  ['LAT080-036', { title: '文物出版胡来不能护航' }],
  ['LAT080-037', { title: '删改原文会制造伪引文' }],
  ['LAT080-038', { title: '官方笑料不是偶发' }],
  ['LAT080-039', { title: '权威人物当然可以批评' }],
  ['LAT080-040', { title: '大学删批评侵犯学术自由' }],
  ['LAT080-041', { title: '可解聘不可封笔' }],
  ['LAT080-043', { title: '官方解释权会败坏学风' }],
  ['LAT080-044', { title: '照片删人也是史料作伪' }],
  ['LAT080-045', { title: '暗杀史实会被曲笔遮掩' }],
  ['LAT080-046', { title: '亲共记录会被改写成反共' }],
  ['LAT080-048', { category: '政治', title: '私德记录也会被政治删改' }],
  ['LAT080-049', { title: '国民党血统会被政治改写' }],
  ['LAT080-050', { title: '特务也会被包装成先烈' }],
  ['LAT080-051', { title: '历史典故不能一典双用' }],
  ['LAT080-052', { title: '台湾故宫是窃国赃物院' }],
  ['LAT080-054', { title: '博物馆展览须有法律根据' }],
  ['LAT080-055', { title: '自家宝物应开放给国人' }],
  ['LAT080-056', { title: '举世唯一真迹不能看都不看' }],
  ['LAT080-057', { title: '避嫌说必须列明收购来源' }],
  ['LAT080-058', { title: '古物主管不应私藏古物' }],
  ['LAT080-059', { title: '机关首长须对贪渎负责' }],
  ['LAT080-060', { title: '长期恋栈应面对任期制' }],
  ['LAT080-061', { title: '博物院长要以学术著作自证' }],
  ['LAT080-062', { title: '出版人名次序须有学术标准' }],
  ['LAT080-063', { title: '白纸黑字的移交不能耍赖' }],
  ['LAT080-064', { title: '亡国遗民的不合作可贵' }],
  ['LAT080-065', { title: '不合作也需要现实本钱' }],
  ['LAT080-066', { title: '男人悼亡写作冒襄第一' }],
  ['LAT080-067', { title: '乱世中仍有寻欢与琴书' }],
  ['LAT080-068', { title: '年龄考订未穷尽生离解释' }],
  ['LAT080-069', { title: '佳人之才同样可观' }],
  ['LAT080-070', { title: '艺术品可使乱世情鸳重逢' }],
  ['LAT080-072', { title: '写字要像用笔打仗' }],
  ['LAT080-073', { title: '有我则无古人' }],
  ['LAT080-074', { title: '看帖不摹才不俗' }],
  ['LAT080-075', { title: '反复临写仍要自成一家' }],
  ['LAT080-077', { title: '刚健之外还要婀娜' }],
  ['LAT080-078', { title: '政治不自由中仍有书法自由' }],
  ['LAT080-080', { title: '临气不临形才有变法' }],
  ['LAT080-081', { category: '方法', title: '研究眼光不该中国本位' }],
  ['LAT080-082', { title: '康有为反动后仍独行其是' }],
  ['LAT080-083', { title: '专制时代也能以草书终生' }],
  ['LAT080-084', { title: '汉奸评价不能一面倒' }],
  ['LAT080-085', { title: '刻意求工会走向做作' }],
  ['LAT080-086', { title: '艺术第一不能抵消人格败德' }],
  ['LAT080-087', { title: '写生能给山水新生命' }],
  ['LAT080-088', { title: '无名实力会被大名埋没' }],
  ['LAT080-089', { title: '党国作伪会套到古人头上' }],
  ['LAT080-090', { title: '现实写生可革命国画' }],
  ['LAT080-091', { title: '无款无印不必是缺点' }],
  ['LAT080-092', { title: '爱男人反而能客观画女人' }],
  ['LAT080-093', { title: '艺术价值在创造不在熟巧' }],
  ['LAT080-094', { title: '求名人字多是社交借重' }],
  ['LAT080-095', { title: '逼青年练字是在浪费生命' }],
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
    'source_id',
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

function fileTitle(fileName) {
  return fileName.replace(/^\d+\./u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’!?.,，。！、：；（）()\s]+/g, '')
    .slice(0, 18);
}

function buildKeywords(record, title, category) {
  const words = [category, cleanKeyword(title), cleanKeyword(fileTitle(record.source_file))].filter(Boolean);
  return [...new Set(words)].join(',');
}

function writeMarkdown(filePath, payload) {
  const lines = [
    `# 《${payload.book.title}》思想索引（${payload.book.round}）`,
    '',
    `- 书号：${payload.book.sequence}`,
    `- 状态：${payload.book.status}`,
    `- 条目数：${payload.records.length}`,
    `- 来源目录：${payload.book.sourceDir}`,
    '',
    '## 分类统计',
    '',
    ...categoryCounts(payload.records).map((item) => `- ${item.category}：${item.count}`),
    '',
  ];

  for (const category of taxonomy) {
    const records = payload.records.filter((record) => record.category === category);
    if (!records.length) continue;
    lines.push(`## ${category}`, '');
    for (const record of records) {
      lines.push(
        `### ${record.id}｜${record.title}`,
        '',
        record.description,
        '',
        `来源：${record.source_file} 第 ${record.source_paragraph} 段；关键词：${record.keywords}`,
        '',
      );
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
    const category = edit.category ?? record.category;
    const title = edit.title ?? record.title;

    return {
      ...record,
      ...edit,
      id: `LAT${String(bookSeq).padStart(3, '0')}-${String(index + 1).padStart(3, '0')}`,
      source_id: record.id,
      round: '校对轮',
      status: '已校对',
      category,
      title,
      keywords: edit.keywords ?? buildKeywords(record, title, category),
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
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除重复的周越断层论证、偏材料铺垫、问卷名单、单例性史料删改、个别收藏图说支流和短评收束；保留艺术史断层、真迹鉴别、故宫治理、官方窜改、学术自由、乱世情爱、书法方法和艺术人格判断。description 未改写。',
    record_count: records.length,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
    category_counts: categoryCounts(records),
  },
  records,
  dropped,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);

fs.writeFileSync(path.join(outputDir, '思想索引.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
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
  `# ${bookTitle}校对说明`,
  '',
  `来源：${path.relative(rootDir, extractionPath).replaceAll(path.sep, '/')}`,
  '',
  `提取轮 ${extraction.records.length} 条；校对轮 ${records.length} 条；删除 ${dropped.length} 条。`,
  '',
  '校对原则：',
  '',
  '- 保留艺术史断层、真迹鉴别、故宫治理、官方窜改、学术自由、乱世情爱、书法方法和艺术人格判断等可独立检索条目。',
  '- 删除重复的周越断层论证、偏材料铺垫、问卷名单、单例性史料删改、个别收藏图说支流和短评收束。',
  '- 只调整取舍、标题和分类；所有 `description` 均沿用提取轮原文段落。',
  '',
  '删除条目：',
  '',
  ...dropped.map((item) => `- ${item.id} ${item.title}：${item.reason}`),
  '',
  '分类统计：',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, '校对说明.md'), note, 'utf8');

console.log(`Proofread ${bookTitle}: ${records.length} records, dropped ${dropped.length}.`);
console.log(categoryCounts(records).map((item) => `${item.category}:${item.count}`).join(' '));
