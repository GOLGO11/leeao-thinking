import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '052.李敖随写录后集');
const extractionPath = path.join(outputDir, '思想索引-提取轮.json');
const extraction = JSON.parse(fs.readFileSync(extractionPath, 'utf8'));

const taxonomy = ['写作', '方法', '知识', '人格', '文化', '政治', '法权', '情爱'];

const dropReasons = new Map([
  ['LAT052-003', '二分法批评偏局部文学论争，且同段以人事讥评为主，校对轮删除。'],
  ['LAT052-009', '唐诗运动短评过短，主要是单一新闻机锋，文化主题已有更稳定条目。'],
  ['LAT052-014', '陈翰珍段落引文占比过高，李敖判断偏人事讥评，法权索引性不足。'],
  ['LAT052-028', '牛仔裤洋名包装一条偏日常消费见闻，思想容量较窄。'],
  ['LAT052-033', '坟头奴相短评偏人物骂评，独立检索价值不足。'],
  ['LAT052-034', '刘海粟条目过短，主要是单一人物标签，文化主题已有更强条目。'],
  ['LAT052-040', '牧师慈善短评偏单一宗教人物讥评，校对轮不单列。'],
  ['LAT052-051', '卧游转梦游偏个人梦境和趣味机锋，方法索引性不足。'],
  ['LAT052-054', '老同学勤学段落偏人事记述，思想判断较弱。'],
  ['LAT052-056', '“真正台独”偏一句自况机锋，政治主题已有更完整条目。'],
  ['LAT052-062', '施性忠评价偏单一政治人物判断，独立思想容量不足。'],
  ['LAT052-067', '耻列文人偏个人排位和讥评，写作/人格主题已有更稳定条目。'],
  ['LAT052-068', '不受邀为荣偏自况机锋，思想索引性弱于其他人格条目。'],
  ['LAT052-071', '胡基峻段落以朋友近况为主，新闻耗时判断较窄。'],
  ['LAT052-076', '做票条目主要是他人转述，李敖自己的判断未展开。'],
  ['LAT052-078', '金兰大厦程序条目偏住户事务，方法意义不如其他条目稳定。'],
  ['LAT052-090', '台湾资历偏一句身份机锋，校对轮删除。'],
  ['LAT052-094', '金兰俗务尾声偏个人摆脱俗务经验，思想索引性不足。'],
]);

const overrides = new Map([
  ['LAT052-001', { title: '主动筹划', keywords: '邓维桢,求新求变,掌握主动' }],
  ['LAT052-002', { title: '失败守信', keywords: '沈登恩,出版,信任' }],
  ['LAT052-004', { title: '买书质量', keywords: '读书风气,怪力乱神,严肃书籍' }],
  ['LAT052-005', { title: '中立伤人', keywords: '李远哲,学术中立,知识分子' }],
  ['LAT052-006', { title: '捐赠手续', keywords: '死刑,器官捐赠,程序' }],
  ['LAT052-007', { title: '民主迷信', keywords: '选举,风水,民主文化' }],
  ['LAT052-008', { title: '刺蒋台独', keywords: '郑自才,党外,台湾共和国' }],
  ['LAT052-010', { title: '真理优先', keywords: '真理,台湾人,原则' }],
  ['LAT052-011', { title: '学术滥格', keywords: '大学,教授,学术标准' }],
  ['LAT052-012', { title: '制度儿戏', keywords: '民进党,总统制,政治策略' }],
  ['LAT052-013', { category: '政治', title: '为民不为权', keywords: '杨西崑,政权服务,中国人' }],
  ['LAT052-015', { title: '老代不拒', keywords: '老国代,黑金,政治伦理' }],
  ['LAT052-016', { title: '非法代表', keywords: '老国代,合法性,宪政' }],
  ['LAT052-017', { title: '恶法自豪', keywords: '老国代,人权恶法,禁书' }],
  ['LAT052-018', { title: '神权霹雳', keywords: '西藏,神权,共产党' }],
  ['LAT052-019', { title: '奇男滥称', keywords: '国民党,名词,历史判断' }],
  ['LAT052-020', { title: '六十著述', keywords: '写作计划,六十岁,自我规划' }],
  ['LAT052-021', { title: '每日千字', keywords: '写作,字数,著作计划' }],
  ['LAT052-022', { title: '两相对照', keywords: '林洋港,辞职,人格批评' }],
  ['LAT052-023', { title: '违法裁定', keywords: '少年法庭,法官,违法裁定' }],
  ['LAT052-024', { title: '正学伪词', keywords: '李登辉,正学,政治语言' }],
  ['LAT052-025', { title: '黑钱无例外', keywords: '立委,黑金,政党' }],
  ['LAT052-026', { title: '骂人自领', keywords: '增额立委,政治无耻,薪水' }],
  ['LAT052-027', { category: '政治', title: '义士扭曲', keywords: '国民党,烈士,历史改造' }],
  ['LAT052-029', { title: '返台史实', keywords: '蒋经国,历史事实,杨西崑' }],
  ['LAT052-030', { title: '大陆外化', keywords: '民进党,大陆人民,外国人' }],
  ['LAT052-031', { title: '变化气质', keywords: '蒋经国,李焕,青年气质' }],
  ['LAT052-032', { title: '教授怯懦', keywords: '知识分子,教授,言论道路' }],
  ['LAT052-035', { title: '颂蒋奴相', keywords: '林洋港,蒋介石,群众' }],
  ['LAT052-036', { title: '法官程度', keywords: '刘世源,法官,司法水平' }],
  ['LAT052-037', { title: '自诉制度', keywords: '许阿桂,自诉制度,检察官' }],
  ['LAT052-038', { title: '执法非修法', keywords: '检察官,诉讼技巧,执法' }],
  ['LAT052-039', { title: '司法英雄倒置', keywords: '许阿桂,司法英雄,正义' }],
  ['LAT052-041', { title: '写出咒骂', keywords: '写作,咒骂,胆识' }],
  ['LAT052-042', { title: '精神病院', keywords: '精神病院,荣民,关押' }],
  ['LAT052-043', { title: '铁窗政治', keywords: '林洋港,治安,国民党' }],
  ['LAT052-044', { title: '胡适被修', keywords: '胡适,日记,知识审查' }],
  ['LAT052-045', { title: '公道选择', keywords: '包公,道德冲突,选择' }],
  ['LAT052-046', { title: '反暴内爆', keywords: '民进党,派系,暴力' }],
  ['LAT052-047', { title: '骂亦有学', keywords: '章太炎,骂人,学问' }],
  ['LAT052-048', { title: '标点见学', keywords: '章太炎,标点,史书' }],
  ['LAT052-049', { title: '学术尸位', keywords: '近史所,袁世凯,学术进步' }],
  ['LAT052-050', { title: '抄袭研究', keywords: '刘凤翰,抄袭,学术伦理' }],
  ['LAT052-052', { title: '只宜揭发', keywords: '傅正,王晓波,揭发策略' }],
  ['LAT052-053', { title: '洋主早餐', keywords: '国民党,美国,祈祷早餐' }],
  ['LAT052-055', { title: '复兴失守', keywords: '文化保存,古迹,地方政府' }],
  ['LAT052-057', { category: '方法', title: '读书效率', keywords: '读书,录像带,知识效率' }],
  ['LAT052-058', { title: '金玉误义', keywords: '蔡万霖,金玉满堂,经典' }],
  ['LAT052-059', { title: '傅正真相', keywords: '傅正,自由中国,历史真相' }],
  ['LAT052-060', { title: '视野死角', keywords: '自知,知识死角,方法' }],
  ['LAT052-061', { title: '戒之在失', keywords: '老年,失落,人生感受' }],
  ['LAT052-063', { title: '囚工双标', keywords: '美国,囚犯劳动,人权标准' }],
  ['LAT052-064', { title: '奴工失声', keywords: '美国,媒体,政治人物' }],
  ['LAT052-065', { title: '军头皈依', keywords: '警备总司令,佛教,迷信' }],
  ['LAT052-066', { title: '用短之戒', keywords: '叶菊兰,批评,忠言' }],
  ['LAT052-069', { title: '满脑肥肠', keywords: '辜濂松,还愿,台湾市侩' }],
  ['LAT052-070', { title: '人权鱼目', keywords: '中国人权协会,国民党,人权' }],
  ['LAT052-072', { title: '小说性灵', keywords: '小说,性灵,写作主力' }],
  ['LAT052-073', { title: '思想笨功', keywords: '思想史,学术,笨功夫' }],
  ['LAT052-074', { title: '雷震被扭', keywords: '雷震,傅正,民进党' }],
  ['LAT052-075', { title: '战史异说', keywords: '张灵甫,国民党宣传,史料' }],
  ['LAT052-077', { title: '开明沦落', keywords: '开明书店,书店,文化衰败' }],
  ['LAT052-079', { title: '本土纠偏', keywords: '台大,二二八,本土思想' }],
  ['LAT052-080', { title: '人权三重', keywords: '美国,人权,国际法庭' }],
  ['LAT052-081', { title: '档案谎话', keywords: '二二八,总统府档案,法定手续' }],
  ['LAT052-082', { title: '夜读分类', keywords: '夜读,分类,读书方法' }],
  ['LAT052-083', { title: '陈仪论影响', keywords: '陈仪,二二八,历史论断' }],
  ['LAT052-084', { title: '死后改稿', keywords: '胡适,批评文章,一致性' }],
  ['LAT052-085', { title: '爱国无救', keywords: '爱国者,战争,妇女' }],
  ['LAT052-086', { title: '文化误读', keywords: '郭为藩,孟子,文化水准' }],
  ['LAT052-087', { title: '利用风险', keywords: '彭明敏,民主发展,被利用' }],
  ['LAT052-088', { title: '贿选自白', keywords: '国民党,贿选,政治风气' }],
  ['LAT052-089', { title: '真小说', keywords: '北京法源寺,小说,文学家' }],
  ['LAT052-091', { title: '走出阴影', keywords: '戒严遗毒,政治案件,平反' }],
  ['LAT052-092', { title: '二二八乘虚', keywords: '二二八,国民党,台独' }],
  ['LAT052-093', { title: '悲情小视野', keywords: '二二八,台湾知识分子,见识' }],
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
      id: `LAT052-${String(index + 1).padStart(3, '0')}`,
      round: '校对轮',
      status: '已校对',
      source_id: record.id,
    };
  });

for (const record of records) {
  if (!taxonomy.includes(record.category)) {
    throw new Error(`Unknown category ${record.category} in ${record.source_id}`);
  }
}

const payload = {
  generated_at: new Date().toISOString(),
  book: {
    ...extraction.book,
    round: '校对轮',
    status: '已校对',
    note:
      '校对轮删除局部人事讥评、同篇弱项、纯事件机锋、外部转述占比过高和检索独立性不足的条目，保留写作、方法、知识、人格、文化、政治和法权七类中能独立呈现李敖判断的段落；description 未改写。',
    source_round: extraction.book.round,
    source_count: extraction.records.length,
    dropped_count: dropped.length,
  },
  taxonomy,
  records,
  proofreading: {
    principles: [
      '只处理条目取舍、标题、分类和关键词，不改写 description。',
      '删除局部人事讥评、同篇弱项、纯事件机锋、外部转述占比过高和检索独立性不足的条目。',
      '保留能独立呈现李敖判断的写作取舍、行动方法、知识辨误、人格尺度、文化批评、台湾政治和司法法权材料。',
      '标题继续压缩为检索用语，分类仍使用 8 个原子分类。',
    ],
    dropped,
  },
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputDir, '思想索引-校对轮.csv'), records);
writeMarkdown(path.join(outputDir, '思想索引-校对轮.md'), payload);

const noteLines = [
  '# 《李敖随写录后集》思想索引校对说明',
  '',
  `- 提取轮条目：${extraction.records.length}`,
  `- 校对轮条目：${records.length}`,
  `- 删除条目：${dropped.length}`,
  `- 来源目录：${payload.book.sourceDir}`,
  '',
  '## 分类统计',
  '',
  ...categoryCounts(records).map((item) => `- ${item.category}：${item.count}`),
  '',
  '## 删除条目',
  '',
  ...dropped.map((item) => `- ${item.id}｜${item.title}：${item.reason}`),
  '',
  '## 校对说明',
  '',
  '本轮从提取轮 94 条中保留 76 条。校对重点是把《李敖随写录后集》从剪报短评、来信资料和日常随写中收束出可检索的思想骨干：写作计划、行动方法、知识辨误、人格尺度、文化批评、台湾政治、司法法权等。',
  '',
  '删除项主要是局部人事讥评、同篇弱项、纯事件机锋、外部转述占比过高、过短自况，以及脱离上下文后检索独立性不足的条目。',
  '',
  '`description` 字段全部沿用提取轮中的源文本原段落，未做改写。',
  '',
];
fs.writeFileSync(path.join(outputDir, '校对说明.md'), `${noteLines.join('\n')}\n`, 'utf8');

console.log(
  `Proofread ${payload.book.sequence}.${payload.book.title}: ${records.length} records. ` +
    `Dropped: ${dropped.length}.`,
);
for (const { category, count } of categoryCounts(records)) {
  console.log(`${category}: ${count}`);
}
