import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '034.虚拟的十七岁');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT034-001', '发禁解除一条偏开场偶发观察，未构成本书“虚拟、科技、写作、情爱”主轴中的独立思想索引。'],
  ['LAT034-007', '自然人机器化一条过短，核心已由人工智慧、人脑交融和非生物科技吞噬人类等条目承载。'],
  ['LAT034-008', '中文工具等待电脑条件一条偏技术史旁枝，独立检索价值弱于后文科技与知识方法条目。'],
  ['LAT034-014', '一年时间改变死局一条偏故事机锋，未充分进入本书核心思想线。'],
  ['LAT034-016', '十七年轮回观看衰老偏人物年龄感怀，校对轮不单独保留。'],
  ['LAT034-030', '现实爱情不如文学完整与“爱情非永恒”“爱情真相被拆穿”等条目重复，校对轮保留更完整者。'],
  ['LAT034-041', '名牌钢笔服务写作与前一条“名牌要有文化水平”重复，校对轮保留覆盖面更大的前一条。'],
  ['LAT034-058', '虚拟需要适度科技一条过短，定义力度弱于“模拟就是对模特儿的虚拟”等条目。'],
  ['LAT034-072', '美国啦啦队式文化偏末尾场景观察，和本书核心思想线关系较松。'],
]);

const overrides = new Map([
  ['LAT034-002', { title: '道在低贱处' }],
  ['LAT034-003', { title: '修炼化会制造祸源' }],
  ['LAT034-004', { title: '不能写作就是浪费生命' }],
  ['LAT034-005', { title: '科技噩梦超出文学想象' }],
  ['LAT034-006', { title: '记忆与器官可能被控制' }],
  ['LAT034-009', { title: '从老大哥到机器人都要救人' }],
  ['LAT034-010', { title: '现代科技补强演化理解' }],
  ['LAT034-011', { title: '人工智慧须与人脑交融' }],
  ['LAT034-012', { title: '记忆拷贝制造虚拟身体' }],
  ['LAT034-013', { title: '活体实验必须经同意' }],
  ['LAT034-015', { title: '青涩死亡也可自我圆满' }],
  ['LAT034-017', { title: '写作要理解十七岁' }],
  ['LAT034-018', { title: '模特儿不是静止被动' }],
  ['LAT034-019', { title: '年龄差也是智慧底层' }],
  ['LAT034-020', { title: '科技统治就是1984恐怖' }],
  ['LAT034-021', { title: '科技放大五色五音' }],
  ['LAT034-022', { title: '虚有其表只是皮囊' }],
  ['LAT034-023', { title: '文明创造依靠人脑' }],
  ['LAT034-024', { title: '非生物科技会吞噬人类' }],
  ['LAT034-025', { title: '数字记录不等于主体存在' }],
  ['LAT034-026', { title: '资讯要通向解释想象' }],
  ['LAT034-027', { title: '电脑学习语言反其道' }],
  ['LAT034-028', { title: '电脑不懂语言歧义' }],
  ['LAT034-029', { title: '爱情非永恒须面对变心' }],
  ['LAT034-031', { title: '爱情真相会被拆穿' }],
  ['LAT034-032', { title: '莎士比亚可被不断转用' }],
  ['LAT034-033', { title: '知识可反击文化傲慢' }],
  ['LAT034-034', { title: '可爱和值得爱难合一' }],
  ['LAT034-035', { title: '文物漂泊暴露文明掠夺' }],
  ['LAT034-036', { title: '国际公约保护文化财产' }],
  ['LAT034-037', { title: '神童也可超电脑' }],
  ['LAT034-038', { title: '追随者会窃取领导大脑' }],
  ['LAT034-039', { title: '太上忘情不是无情' }],
  ['LAT034-040', { title: '名牌要有文化水平' }],
  ['LAT034-042', { title: '古典爱情太耗损' }],
  ['LAT034-043', { title: '年龄差不只在身体' }],
  ['LAT034-044', { title: '成熟眼光不取浅薄同龄' }],
  ['LAT034-045', { title: '爱情远见在知道结局' }],
  ['LAT034-046', { title: '现代境界要随知识推移' }],
  ['LAT034-047', { title: '古代想象由科技实现' }],
  ['LAT034-048', { title: '现代科技补强视野' }],
  ['LAT034-049', { title: '时空在移动中互证' }],
  ['LAT034-050', { title: '沙漏让时间可感' }],
  ['LAT034-051', { title: '时间可突维成经验' }],
  ['LAT034-052', { title: '沙漏让时间具体消逝' }],
  ['LAT034-053', { title: '模拟是对模特儿的虚拟' }],
  ['LAT034-054', { title: '青春思想也会衰老' }],
  ['LAT034-055', { title: '青春与实力难结合' }],
  ['LAT034-056', { title: '格物致知要借现代科技' }],
  ['LAT034-057', { title: '虚拟偶像解决衰老' }],
  ['LAT034-059', { title: '资讯爆炸制造焦虑' }],
  ['LAT034-060', { title: '人类应有免于资讯自由' }],
  ['LAT034-061', { title: '资讯关键在过滤融会' }],
  ['LAT034-062', { title: '神童现象有轨迹范围' }],
  ['LAT034-063', { title: '识破真相带来悲怜' }],
  ['LAT034-064', { title: '真实人生应减少哀愁' }],
  ['LAT034-065', { title: '青春美丽需要思想' }],
  ['LAT034-066', { title: '思想高于心眼' }],
  ['LAT034-067', { title: '文学模特儿需要演出' }],
  ['LAT034-068', { title: '负面化爱情是不懂快乐' }],
  ['LAT034-069', { title: '思想三寸金莲也要扬弃' }],
  ['LAT034-070', { title: '荒谬也能作为计算支点' }],
  ['LAT034-071', { title: '一念之转救赎人生' }],
  ['LAT034-073', { title: '年轻身体与年深头脑并置' }],
  ['LAT034-074', { title: '朱仑现象抵抗科技疯狂' }],
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
    `# 《${book.title}》思想索引：${book.round}`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：沿用 8 个原子分类；校对轮收紧科技、虚拟、资讯自由、写作方法和抽象情爱判断，删除偏旁枝和重复承载。',
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
    '校对动作只涉及条目取舍、标题压缩、关键词微调和编号重排；所有保留条目的 `description` 继续使用源文本原文段落。',
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
const book = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
  note:
    '本轮由提取轮进入校对轮，删除偏开场偶发、过短科技旁枝、重复爱情/名牌判断和偏人物年龄感怀的弱条目，保留本书关于虚拟、科技、人工智慧、资讯自由、真相、文学写法、文化财产权、时间意识、年龄关系和抽象情爱观的核心索引。description 仍逐条保留源文本原文段落。',
};

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const override = overrides.get(record.id) ?? {};
    return {
      ...record,
      ...override,
      id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
      round: book.round,
      status: book.status,
      proofread_from: record.id,
    };
  });

const payload = {
  generated_at: new Date().toISOString(),
  book,
  taxonomy,
  records,
  proofread: {
    from_round: originalPayload.book.round,
    original_count: originalPayload.records.length,
    retained_count: records.length,
    dropped_count: dropReasons.size,
    dropped: [...dropReasons.entries()].map(([id, reason]) => ({ id, reason })),
  },
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);
writeSummary(path.join(outputDir, '校对说明.md'), payload, originalPayload.records);

console.log(`Built ${book.title} ${book.round}: ${records.length} records.`);
console.log(categoryCounts(records, taxonomy).map((item) => `${item.category}:${item.count}`).join(' '));
