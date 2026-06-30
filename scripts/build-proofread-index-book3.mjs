import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '003.我最难忘的事和人');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT003-004', '木雕段落偏物件象征，弱小民族主题已由 LAT003-003 承载。'],
  ['LAT003-006', '两代陈璧君段落更偏个人联想和人物叙事，保留方法意识更清晰的 LAT003-005。'],
  ['LAT003-008', '湖滨宇宙观与中兴湖地理/白鹅境界主题相近，校对轮保留更有辨识度的两条。'],
  ['LAT003-013', '恶法枷锁段落偏收束性抒情，独立索引价值低于前面恶法批判段落。'],
  ['LAT003-016', '交名单给国际特赦偏事件经过，国际人权主题已由 LAT003-014、LAT003-015 承载。'],
  ['LAT003-019', '开明书店三楼寻访偏场景叙事，流亡书店的精神判断已由 LAT003-018 承载。'],
  ['LAT003-026', '楼上历史家与楼下当事人偏场景化回忆，思想方法价值不如其他史学条目集中。'],
  ['LAT003-028', '郑南榕交情段落偏私人义气，校对轮保留言论自由和真实理念两条。'],
  ['LAT003-047', '爱情条件段落主要为邱铭笙原文自述，距离李敖思想索引主轴稍远。'],
  ['LAT003-056', '文献发表意义与 LAT003-054 高度相近，保留后者作为更完整判断。'],
]);

const overrides = new Map([
  ['LAT003-001', {
    title: '政治松绑不等于人心解禁',
    keywords: '旧作重定,政治松绑,人心解禁',
  }],
  ['LAT003-002', {
    title: '读书为写作服务',
    keywords: '读书,写作,工作伦理',
  }],
  ['LAT003-003', {
    title: '弱小民族衰亡与读书人历史感',
    keywords: '高山族,弱小民族,历史感',
  }],
  ['LAT003-005', {
    title: '对比让历史获得生命',
    keywords: '历史感,吉朋,时间对比',
  }],
  ['LAT003-007', {
    title: '以地质时间观看中国分合',
    keywords: '中兴湖,中国地图,地质时间',
  }],
  ['LAT003-009', {
    title: '白鹅境界使人类自惭',
    keywords: '白鹅,天人合一,自然境界',
  }],
  ['LAT003-010', {
    title: '恶法下十年已属宽大',
    keywords: '惩治叛乱条例,恶法,政治犯',
  }],
  ['LAT003-011', {
    title: '废止恶法不是权力败退',
    keywords: '惩治叛乱条例,国民党,刑法',
  }],
  ['LAT003-012', {
    title: '恶法易废反证长期坐视',
    keywords: '立法委员,恶法,废止',
  }],
  ['LAT003-014', {
    title: '良心犯与国际特赦运动',
    keywords: '国际特赦,良心犯,人权',
  }],
  ['LAT003-015', {
    title: '牢墙不能隔绝施暴罪行',
    keywords: '国际特赦,良心犯,人权',
  }],
  ['LAT003-017', {
    title: '作者名字消失于查禁体制',
    keywords: '开明书店,查禁,作者',
  }],
  ['LAT003-018', {
    title: '流亡书店失去精神连锁',
    keywords: '开明书店,流亡,精神中断',
  }],
  ['LAT003-020', {
    title: '制式学校斲丧性灵',
    keywords: '学校教育,知识傲慢,自由精神',
  }],
  ['LAT003-021', {
    title: '考试匠不等于有学问',
    keywords: '考试,学问,施启扬',
  }],
  ['LAT003-022', {
    title: '政府没有给异议者余地',
    keywords: '政府,言论自由,法令',
  }],
  ['LAT003-023', {
    title: '法学不能只做干禄工具',
    keywords: '知识分子,法学,良知',
  }],
  ['LAT003-024', {
    category: '教育与知识分子',
    title: '知识分子做官后的自我作践',
    keywords: '施启扬,做官,知识分子',
  }],
  ['LAT003-025', {
    title: '压抑言论会酿成爆发',
    keywords: '言论自由,压抑,大学生',
  }],
  ['LAT003-027', {
    title: '万年立委四十年一纸空白',
    keywords: '立法委员,万年国会,裴存藩',
  }],
  ['LAT003-029', {
    title: '郑南榕功绩在百分百言论自由',
    keywords: '郑南榕,言论自由,台独',
  }],
  ['LAT003-030', {
    title: '为真实理念而死',
    keywords: '郑南榕,真实理念,信仰',
  }],
  ['LAT003-031', {
    title: '个案追索作为真相证词',
    keywords: '真相,证词,打抱不平',
  }],
  ['LAT003-032', {
    title: '高压出版须承担政治和经济代价',
    keywords: '出版,台湾,政治风险',
  }],
  ['LAT003-033', {
    title: '完整通信可成为信史材料',
    keywords: '宋希濂,出版,信史',
  }],
  ['LAT003-034', {
    category: '人格与自我',
    title: '鹰犬也有国家境界',
    keywords: '宋希濂,国家民族,鹰犬将军',
  }],
  ['LAT003-035', {
    title: '反攻口号下的强制服役',
    keywords: '老兵,反攻大陆,强迫服役',
  }],
  ['LAT003-036', {
    title: '浪费子弹也是低层抵抗',
    keywords: '军队,子弹,老兵',
  }],
  ['LAT003-037', {
    title: '赤身归回的老兵彻悟',
    keywords: '张永亭,人生彻悟,老兵',
  }],
  ['LAT003-038', {
    title: '感念师长不等于师承',
    keywords: '钱穆,师承,思想定型',
  }],
  ['LAT003-039', {
    title: '历史家不可温情先行',
    keywords: '钱穆,史学,温情敬意',
  }],
  ['LAT003-040', {
    title: '曲学阿世让大儒失格',
    keywords: '钱穆,蒋介石,曲学阿世',
  }],
  ['LAT003-041', {
    title: '义利之辨要落到自身',
    keywords: '钱穆,素书楼,义利之辨',
  }],
  ['LAT003-042', {
    title: '逃世之后的领奖失格',
    keywords: '台静农,鲁迅,国家文艺奖',
  }],
  ['LAT003-043', {
    title: '学格人格不能靠声名补足',
    keywords: '台静农,学术,人格',
  }],
  ['LAT003-044', {
    title: '投奔自由后因言获罪',
    keywords: '反共义士,言论,交付感化',
  }],
  ['LAT003-045', {
    title: '小人物争私权的尊严',
    keywords: '曲军成,公道,小人物',
  }],
  ['LAT003-046', {
    title: '黑暗遭际中的心理健康',
    keywords: '邱铭笙,残障,心理健康',
  }],
  ['LAT003-048', {
    title: '反迷信须以实例和证据拆穿',
    keywords: '反迷信,证据,脚注',
  }],
  ['LAT003-049', {
    title: '强人是在精神上胜过自己',
    keywords: '自胜者强,邱铭笙,精神',
  }],
  ['LAT003-050', {
    title: '未审未判的特务黑牢',
    keywords: '乔家才,黑牢,军法',
  }],
  ['LAT003-051', {
    title: '个别错误不废史料价值',
    keywords: '史学方法,沈醉,史料',
  }],
  ['LAT003-052', {
    title: '信史须书美也不隐恶',
    keywords: '章太炎,信史,史学方法',
  }],
  ['LAT003-053', {
    title: '愚忠把权力罪责移给自己',
    keywords: '乔家才,愚忠,蒋介石',
  }],
  ['LAT003-054', {
    title: '黑狱史越不便越要发表',
    keywords: '乔家才入狱记,文献,发表',
  }],
  ['LAT003-055', {
    title: '九字御批暴露最高权力',
    keywords: '蒋介石,乔家才,草菅人命',
  }],
  ['LAT003-057', {
    title: '人格不能向邪恶低头',
    keywords: '乔家才,人格,邪恶',
  }],
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

function writeMarkdown(filePath, payload) {
  const { book, taxonomy, records } = payload;
  const lines = [
    `# 《${book.title}》思想索引（${book.round}）`,
    '',
    `- 状态：${book.status}`,
    `- 条目数：${records.length}`,
    '- 分类策略：校对轮继续使用宽口径分类，删除偏场景、铺垫、重复判断的条目。',
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
      lines.push('原文：');
      lines.push('');
      lines.push(`> ${record.description}`);
      lines.push('');
    }
  }

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

function writeSummary(filePath, payload, originalRecords) {
  const { book, taxonomy, records } = payload;
  const categoryCounts = taxonomy
    .map((category) => [category, records.filter((record) => record.category === category).length])
    .filter(([, count]) => count > 0);

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
    ...categoryCounts.map(([category, count]) => `- ${category}：${count}`),
    '',
    '## 输出文件',
    '',
    '- 思想索引-校对轮.csv',
    '- 思想索引-校对轮.json',
    '- 思想索引-校对轮.md',
  ];

  fs.writeFileSync(filePath, `\uFEFF${lines.join('\n')}\n`, 'utf8');
}

const originalPayload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const book = {
  ...originalPayload.book,
  round: '校对轮',
  status: '已校对',
};

const records = originalPayload.records
  .filter((record) => !dropReasons.has(record.id))
  .map((record, index) => {
    const override = overrides.get(record.id);
    if (!override) {
      throw new Error(`Missing proofreading override for ${record.id}`);
    }

    return {
      ...record,
      ...override,
      id: `LAT${book.sequence}-${String(index + 1).padStart(3, '0')}`,
      book: book.title,
      round: book.round,
      status: book.status,
      proofread_from: record.id,
    };
  });

const payload = {
  book,
  taxonomy: originalPayload.taxonomy,
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
