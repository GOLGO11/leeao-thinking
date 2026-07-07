import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 75;
const bookTitle = '中国命研究';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT075-006', '段落是王充天道观的引文前导，后续“故”“偶”与总评条已承载核心判断。'],
  ['LAT075-009', '段落主要是王充原文长引，李敖自己的概括已由相邻条目承载。'],
  ['LAT075-018', '段落以发誓套话例证罗列为主，方法意义由后续解释与总结条承载。'],
  ['LAT075-031', '段落主要罗列春秋诸侯称天例证，神权随政权扩张已由相邻条目承载。'],
  ['LAT075-034', '段落过短，董仲舒比附的政治意义已由后续条目承载。'],
  ['LAT075-045', '段落只是封禅迷信的承接句，泰山生死信仰由后续组条目承载。'],
  ['LAT075-052', '段落过短，只是泰山地狱化转折，具体机制由下一条承载。'],
  ['LAT075-059', '段落为刘继庄语录脚注，偏材料摘录，校对轮保留李敖对其生死天下意义的判断。'],
  ['LAT075-063', '段落主要转录胡适论父母无恩，李敖的汇编判断由专题结论条承载。'],
  ['LAT075-066', '段落偏个案感叹，复兴中国文化和现代观念两条更能独立承载思想。'],
  ['LAT075-070', '段落以孟子引文触发感想为主，敌我关系模型由下一条完整承载。'],
  ['LAT075-072', '段落是统治者人神位置的铺垫，董仲舒与天怒政治条目更集中。'],
  ['LAT075-074', '段落重复“天怒胜过人怨”判断，校对轮保留前一条。'],
  ['LAT075-075', '段落偏灾异说细部机制，和本书主索引的政治判断距离较远。'],
  ['LAT075-080', '段落重复灾异制衡空洞的判断，已由董仲舒制衡说与专制帮凶条承载。'],
  ['LAT075-081', '段落是引出董仲舒立论的前导句，后续五行效忠条更完整。'],
  ['LAT075-086', '段落主要铺陈崇祯门神轶事，特务政治判断由前一条承载。'],
  ['LAT075-090', '段落主要是陈后主诏书长引，法权判断由相邻说明条承载。'],
  ['LAT075-093', '段落偏旧臣送饭轶事，思想索引增量有限。'],
  ['LAT075-095', '段落为辛弃疾处境说明，山河片段看兴亡的写作判断已由前一条承载。'],
  ['LAT075-096', '段落偏景物式收束，独立思想密度不足。'],
  ['LAT075-097', '段落偏个人经历与无名信故事，离本书命与历史政治主线较远。'],
  ['LAT075-099', '段落是李翰祥引文前导，历史剧现实意义由后续条目承载。'],
  ['LAT075-103', '段落继续罗列慈禧破坏制度例证，核心判断已由前两条承载。'],
  ['LAT075-104', '段落与历史剧美化慈禧问题重复，校对轮保留更直接的评价条。'],
  ['LAT075-116', '段落主要铺陈阿提拉死法故事，校对轮保留结论句即可。'],
  ['LAT075-122', '段落偏诉讼技术陈述，作为思想索引的独立价值较弱。'],
  ['LAT075-131', '段落只是从长寿到难老的过渡，长生愿望和不死分类已由其他条目承载。'],
  ['LAT075-132', '段落只是从难老到不死的过渡，思想增量有限。'],
  ['LAT075-138', '段落重复形骸与灵魂两分，校对轮保留更清楚的儒道对比条。'],
  ['LAT075-151', '段落偏奏折称谓改字细节，奴才制度的政治意义已由密折与等级条承载。'],
  ['LAT075-162', '段落主要说明《尉缭子》出土地位，刑求自白主题由后续条目承载。'],
  ['LAT075-167', '段落是《狱中杂记》全文前导，独立判断不足。'],
  ['LAT075-168', '段落过短，缺少独立展开。'],
  ['LAT075-169', '段落主要是方苞原文/今译判断，李敖对黑牢的今古对照更能代表本书思想。'],
  ['LAT075-170', '段落过短，且为单句赞叹。'],
  ['LAT075-178', '段落主要罗列昭雪案例，时间因素的判断由前后条目承载。'],
  ['LAT075-180', '段落是典故综合后的列表前导，后续殉道判断更完整。'],
  ['LAT075-209', '段落主要是乾隆长文引录，李敖对敌人出版的判断由前后条目承载。'],
]);

const overrides = new Map([
  ['LAT075-003', { title: '王充在儒家一统中表示异议' }],
  ['LAT075-019', { category: '方法', title: '有如白水须按发誓语读' }],
  ['LAT075-025', { title: '中国天帝观念不是耶和华' }],
  ['LAT075-027', { title: '中国群神也有人格与人性' }],
  ['LAT075-039', { category: '文化', title: '孔子是有神论式不可知论者' }],
  ['LAT075-046', { category: '文化', title: '古代眼界限制泰山地位' }],
  ['LAT075-057', { title: '地下活动会使学者疏远' }],
  ['LAT075-062', { category: '情爱', title: '生子关系可由情欲解释' }],
  ['LAT075-064', { title: '孝顺信条不能无条件化' }],
  ['LAT075-071', { title: '敌我关系可能走向同归于尽' }],
  ['LAT075-077', { title: '董仲舒制衡说不可高估' }],
  ['LAT075-078', { title: '春秋大一统推动君权专制' }],
  ['LAT075-083', { category: '人格', title: '知识分子可沦为统治鹰犬' }],
  ['LAT075-089', { category: '法权', title: '昏君也可有司法清明之举' }],
  ['LAT075-098', { title: '国民党迫害会逼走人才' }],
  ['LAT075-100', { title: '美化慈禧会伤害历史剧意义' }],
  ['LAT075-105', { title: '慈禧是传统黑暗统治样板' }],
  ['LAT075-106', { title: '电影可表达历史现实意义' }],
  ['LAT075-109', { title: '台湾岛失去是非大义' }],
  ['LAT075-110', { title: '亡天下是道德沦亡' }],
  ['LAT075-118', { title: '封面文字也可反击查禁' }],
  ['LAT075-119', { title: '戏谑关系可转成报复写作' }],
  ['LAT075-121', { title: '思想家职责不等于亲自从政' }],
  ['LAT075-124', { title: '文星变质在背弃理想' }],
  ['LAT075-126', { title: '文星复刊若背弃精神即成伪作' }],
  ['LAT075-127', { title: '文星从挑战统治走向拍马' }],
  ['LAT075-128', { title: '党报广告反应显示文星变质' }],
  ['LAT075-129', { title: '文星只能死一次' }],
  ['LAT075-130', { title: '死亡无保障催生长寿愿望' }],
  ['LAT075-134', { title: '不死思想分为形骸与灵魂' }],
  ['LAT075-144', { title: '小字眼也能见中国大问题' }],
  ['LAT075-145', { title: '万岁应从皇家抢回民间' }],
  ['LAT075-148', { title: '密折制度区分公事与私情' }],
  ['LAT075-150', { title: '汉人不得称奴才也是等级政治' }],
  ['LAT075-153', { title: '奴才自称使人格沦落' }],
  ['LAT075-154', { title: '奴才阶层内部仍分上下' }],
  ['LAT075-155', { title: '假官审讯会使被告不敢翻供' }],
  ['LAT075-157', { title: '以取供方法为准是祸源' }],
  ['LAT075-161', { title: '自白证据能力须釜底抽薪' }],
  ['LAT075-163', { title: '刑求造假案战国前已普遍' }],
  ['LAT075-165', { title: '招了再说是一种求生策略' }],
  ['LAT075-176', { title: '善恶判断不能草率二分' }],
  ['LAT075-177', { title: '辨冤白须加入时间因素' }],
  ['LAT075-179', { title: '冤屈者须活过敌人' }],
  ['LAT075-181', { title: '谭嗣同以佛学歌咏并殉道' }],
  ['LAT075-189', { category: '法权', title: '国家刑责不是君主私权' }],
  ['LAT075-191', { title: '儒家骂墨家暴露伪君子' }],
  ['LAT075-193', { title: '地藏精神是先救众生' }],
  ['LAT075-195', { title: '具体成绩才检定真实愿力' }],
  ['LAT075-197', { title: '真菩萨行不靠体制承认' }],
  ['LAT075-198', { title: '救多数人于永久才是目标' }],
  ['LAT075-199', { title: '国民党只是现代化路障' }],
  ['LAT075-200', { title: '挡住成正觉者只好被打倒' }],
  ['LAT075-201', { title: '敌人也分入流不入流' }],
  ['LAT075-202', { title: '与敌人也应公平竞争' }],
  ['LAT075-203', { title: '现代敌人失去江湖情调' }],
  ['LAT075-205', { title: '割地赔款和亲也是退敌法' }],
  ['LAT075-207', { title: '中正真人显示退敌学古不如今' }],
  ['LAT075-208', { title: '头号政敌也可替敌人表心' }],
  ['LAT075-210', { title: '褒显敌臣可伸正气' }],
  ['LAT075-213', { title: '惩小人也要用正义法律' }],
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
  return fileName.replace(/^\d+\./u, '').replace(/^《中国命研究》/u, '').replace(/\.txt$/u, '');
}

function cleanKeyword(text) {
  return String(text)
    .replace(/[《》“”‘’"!?.,，。！？、：；（）()\s]+/g, '')
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
      '校对轮删除纯长引文、引文前导句、上下文残句、资料清单、重复例证、过渡段和偏轶事材料；保留可独立检索的命定论批评、天神考辨、泰山生死信仰、亡国殉国判断、慈禧与制度、万岁与奴才、刑求自白、白鸭顶罪、人格节义、敌友方法和经典考据。description 未改写。',
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
  '- 保留可独立检索的命定论批评、天神考辨、泰山生死信仰、亡国殉国判断、慈禧与制度、万岁与奴才、刑求自白、白鸭顶罪、人格节义、敌友方法和经典考据。',
  '- 删除纯长引文、引文前导句、上下文残句、资料清单、重复例证、过渡段和偏轶事材料。',
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
