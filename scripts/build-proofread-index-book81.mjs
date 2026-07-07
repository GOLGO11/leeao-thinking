import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const bookSeq = 81;
const bookTitle = '李敖笑傲江湖';
const outputDir = path.join(rootDir, 'outputs', `${String(bookSeq).padStart(3, '0')}.${bookTitle}`);
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));
const taxonomy = extraction.taxonomy;

const dropReasons = new Map([
  ['LAT081-001', '段落主要铺陈吕安妮事件录音证据的取得过程，方法判断不够独立，校对轮不保留。'],
  ['LAT081-019', '段落重心是朱婉清与连方瑀的人事嘲讽和履历材料，思想密度低于同书其他写作批评条目。'],
  ['LAT081-020', '段落偏节目周年闲谈和个人衣食住行习惯，较适合人物资料，不宜作为思想索引。'],
  ['LAT081-059', '段落多为柏杨婚姻与诗文细节的旧账攻击，真相辨析主题已由其他更集中的条目承载。'],
  ['LAT081-069', '段落主要转述《红楼梦》红豆词文本和诗句内容，缺少李敖自己的判断层。'],
  ['LAT081-080', '段落集中罗列警备总部副司令及其关系网络，独立思想判断不够清楚。'],
  ['LAT081-137', '段落偏来宾访谈后的节目收束，核心判断多由谷正文材料引出，李敖自有论点较薄。'],
  ['LAT081-140', '段落主要借许历农、媒体副刊人事作当场评论，与既有政工批判条目重复，校对轮从严删除。'],
]);

const overrides = new Map([
  ['LAT081-002', { title: '贞操观念锁住的是头部' }],
  ['LAT081-003', { title: '台湾财富有援助大陆的历史责任' }],
  ['LAT081-004', { title: '私生遮丑不能越过杀人底线' }],
  ['LAT081-006', { title: '三国史可破除正统执念' }],
  ['LAT081-008', { title: '标点细节能暴露经典误读' }],
  ['LAT081-010', { title: '钱学森反美是国家立场问题' }],
  ['LAT081-012', { title: '出家人并非欲望最少' }],
  ['LAT081-013', { title: '语言称谓也能改变制度关系' }],
  ['LAT081-015', { title: '知识教育之外还要人格教育' }],
  ['LAT081-017', { title: '逃避现实的文章不足取' }],
  ['LAT081-021', { title: '党报失效暴露宣传破产' }],
  ['LAT081-022', { title: '个案话术会遮蔽制度责任' }],
  ['LAT081-023', { title: '政治解严后还会有思想戒严' }],
  ['LAT081-026', { title: '出版法不该扩张压制言论' }],
  ['LAT081-029', { title: '男子汉办事不必悲情化' }],
  ['LAT081-033', { title: '反对党不该复制国民党组织' }],
  ['LAT081-036', { category: '写作', title: '粗话也可成为表达方法' }],
  ['LAT081-038', { title: '新闻教育可能继承政工系统' }],
  ['LAT081-040', { title: '照片细节可读出权力关系' }],
  ['LAT081-041', { title: '外来政权批判者也可能执行其政策' }],
  ['LAT081-042', { title: '群众不要求诚信才是大问题' }],
  ['LAT081-045', { title: '言论自由要靠更多自由医治' }],
  ['LAT081-048', { title: '民主目的应落在法治' }],
  ['LAT081-053', { title: '政治说法必须经得起史实' }],
  ['LAT081-055', { title: '台独愿望不能代替可行方法' }],
  ['LAT081-058', { category: '政治', title: '国家利益应高于党利' }],
  ['LAT081-060', { title: '凭记忆批评必须谨慎' }],
  ['LAT081-064', { title: '白色恐怖不能被民主口号遮蔽' }],
  ['LAT081-067', { title: '商誉压力可迫使公司负责' }],
  ['LAT081-068', { category: '方法', title: '贴左派标签可以抹杀批评' }],
  ['LAT081-070', { title: '政治迫害也伤及身体欲望' }],
  ['LAT081-071', { category: '法权', title: '学术争端不该借刑事置人死地' }],
  ['LAT081-076', { title: '刚直人物也会曲学阿世' }],
  ['LAT081-078', { title: '政治斗争不该挪用地方历史' }],
  ['LAT081-081', { title: '只讲汉贼不两立会忘记不偏安' }],
  ['LAT081-082', { title: '求知始于知之为知之' }],
  ['LAT081-083', { title: '回忆录真假须靠文物史料判断' }],
  ['LAT081-084', { title: '监狱改革不能离开监狱经验' }],
  ['LAT081-085', { title: '长期囚禁会驯化生存状态' }],
  ['LAT081-088', { title: '专家身份不能替代史实判断' }],
  ['LAT081-089', { category: '方法', title: '历史类比不能乱套台湾独立' }],
  ['LAT081-090', { title: '争人格要付诸实际行动' }],
  ['LAT081-091', { title: '宣传扭曲会制造历史幻觉' }],
  ['LAT081-093', { title: '回忆宣传会制造光荣妄想' }],
  ['LAT081-094', { title: '党国文风会污染文学' }],
  ['LAT081-096', { title: '无趣教材会消灭主动学习' }],
  ['LAT081-097', { title: '道德标准不能随党变色' }],
  ['LAT081-099', { title: '知识分子入党未必能改变党' }],
  ['LAT081-100', { title: '敌意外交会制造更多风险' }],
  ['LAT081-102', { title: '合葬选择折射婚姻伦理' }],
  ['LAT081-103', { title: '入党以后难谈独立清望' }],
  ['LAT081-105', { title: '软禁同样是剥夺自由' }],
  ['LAT081-106', { title: '拿不出原件就是证据问题' }],
  ['LAT081-107', { title: '报纸执照制度垄断言论' }],
  ['LAT081-108', { title: '蒋介石并非伟大政治家' }],
  ['LAT081-109', { title: '新文化反对处女情结' }],
  ['LAT081-110', { title: '国际政治靠拳头不是道德' }],
  ['LAT081-111', { title: '党史会抹掉不利人物' }],
  ['LAT081-112', { title: '字源考据可破除日常误读' }],
  ['LAT081-114', { title: '回忆录不实要立即反驳' }],
  ['LAT081-115', { title: '男人责任不能推给组织' }],
  ['LAT081-117', { title: '变造史料须靠证据追究' }],
  ['LAT081-118', { title: '辞典条目也会替杀人者美容' }],
  ['LAT081-119', { category: '法权', title: '遗体处理首先是家属权利' }],
  ['LAT081-120', { title: '战败不能全推给外援掣肘' }],
  ['LAT081-121', { title: '尸谏不能替被谏者开脱' }],
  ['LAT081-123', { title: '俘虏获释后的返台权利不该被拒' }],
  ['LAT081-125', { title: '好比喻能压缩复杂批评' }],
  ['LAT081-126', { category: '政治', title: '政治污染会侵入文化场域' }],
  ['LAT081-127', { title: '宗教人士也受男女问题困扰' }],
  ['LAT081-128', { title: '炒陈饭是用历史理解现在' }],
  ['LAT081-129', { title: '医术好不等于会办大学' }],
  ['LAT081-130', { title: '思想闭塞会误解民主' }],
  ['LAT081-131', { title: '政治关怀不应舍近求远' }],
  ['LAT081-132', { title: '演艺人员依赖掌声生存' }],
  ['LAT081-133', { title: '恩怨分明也可带有玩世心' }],
  ['LAT081-135', { title: '洗脑也是政治犯控制流程' }],
  ['LAT081-136', { title: '变节要区分觉悟与投降' }],
  ['LAT081-138', { title: '台独不能只靠教授话语' }],
  ['LAT081-139', { title: '解严后仍会换法禁书' }],
  ['LAT081-141', { title: '章法命名可显示学问' }],
  ['LAT081-143', { title: '写作让人生变得细腻' }],
  ['LAT081-144', { title: '不出户也能通向知识世界' }],
  ['LAT081-146', { title: '封锁姓名也是迫害' }],
  ['LAT081-147', { title: '入联主张必须先过国际法' }],
  ['LAT081-148', { category: '文化', title: '台湾自由主义谱系会被篡夺' }],
  ['LAT081-150', { title: '网络传播会扩大监督力量' }],
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
    .replace(/[《》“”‘’"?!.,，。！？、：；（）()\s]+/g, '')
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
      '校对轮删除个案铺陈、私人聊天、纯文本转述、来宾收束和重复性政工评论；保留政治批判、法权主张、历史方法、知识考据、人格标准、文化判断、写作观和情爱观等可独立检索条目。部分标题与分类已收紧，description 未改写。',
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
  '- 保留政治批判、法权主张、历史方法、知识考据、人格标准、文化判断、写作观和情爱观等可独立检索条目。',
  '- 删除个案铺陈、私人聊天、纯文本转述、来宾收束和重复性政工评论。',
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
