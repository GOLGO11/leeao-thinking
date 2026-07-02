import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'outputs', '021.求是新语');
const sourcePath = path.join(outputDir, '思想索引-提取轮.json');

const dropReasons = new Map([
  ['LAT021-007', '私信直言自列履历偏个人攻防，言论自由受难者记忆已由相邻条目承载。'],
  ['LAT021-011', '竞选大会诉诸天谴偏时事场景，政治迷信主题已由“受过教育者不该政治迷信”和“科学也可能改良迷信”承载。'],
  ['LAT021-012', '“爱心”必须落实为行动更接近人生智慧，且同篇政府责任条目更适合思想索引。'],
  ['LAT021-019', '郭倍宏个案人事色彩较重，政治投机与人格判断已由更通用条目承载。'],
  ['LAT021-020', '国民党员支持民进党偏党籍伦理个案，和“同流可以合污不可”等人格原则重复。'],
  ['LAT021-021', '还钱方式厚道明理偏私人往来伦理，索引价值弱于同书公共责任条目。'],
  ['LAT021-022', '民代表功压榨小民偏单一民代轶事，政治权力扰民主题由“小权力也会演成政治扰民”承载。'],
  ['LAT021-023', '因私利改投政党偏时事人事，政党选择与政治投机已有更强条目。'],
  ['LAT021-049', '不靠消遣生活的境界更像人生智慧，和本书政治文化主线距离较远。'],
  ['LAT021-055', '假装归隐偏官场人物姿态列举，校对轮保留更具结构性的权力与官位条目。'],
  ['LAT021-067', '说话算话偏许信良个人评价，程序权利和政治承诺已有更具制度性的条目。'],
  ['LAT021-070', '劫贫济富的记忆与前文国民党劫贫济富条目重复，保留先出现且更集中者。'],
  ['LAT021-092', '故宫清点主持人人品偏秦孝仪个案，公共机构与党国文化已有其他条目覆盖。'],
  ['LAT021-097', '宣传过量倒胃口偏具体宣传事件，政治符号和事实论述已有更稳条目。'],
  ['LAT021-099', '蒋氏父子像油画化偏个别议场布置批评，史料图像与偶像崇拜主题在总表中已有更通用条目。'],
]);

const overrides = new Map([
  ['LAT021-001', { title: '短论也可形成文体', keywords: '新语,世说新语,短论,文体' }],
  ['LAT021-002', { title: '言论自由高于版面格调', keywords: '言论自由,世界论坛报,报纸格调,专栏' }],
  ['LAT021-003', { title: '奴才教育会丢掉权利意识', keywords: '奴才教育,尊严,权利,教育' }],
  ['LAT021-004', { title: '混蛋教育逃避现实政治', keywords: '混蛋教育,现实,政治教育,台湾' }],
  ['LAT021-005', { title: '小中见大才有文章', keywords: '写作,小事,新意见,以小见大' }],
  ['LAT021-006', { title: '言论自由受难者不该被遗忘', keywords: '言论自由,文字狱,记忆,李氏父子' }],
  ['LAT021-008', { title: '文字知识错误会败坏文章', keywords: '文字,知识错误,文章,伽冠哥戴' }],
  ['LAT021-009', { title: '知识分子作秀也是帮闲', keywords: '知识分子,作秀,帮闲,花蝴蝶' }],
  ['LAT021-010', { title: '知识分子先要自立风骨', keywords: '知识分子,风骨,吴大猷,无耻' }],
  ['LAT021-013', { title: '善心不能替政府卸责', keywords: '善心,政府责任,救济,公共责任' }],
  ['LAT021-014', { title: '帮闲知识分子会使天下更浊', keywords: '知识分子,帮闲,澄社,天下更浊' }],
  ['LAT021-015', { title: '受过教育更不该政治迷信', keywords: '政治迷信,教育,神明,知识分子' }],
  ['LAT021-016', { title: '政治判断先过常识关', keywords: '政治判断,常识,现实,迷梦' }],
  ['LAT021-017', { title: '是非真理要六亲不认', keywords: '是非,真理,六亲不认,人格' }],
  ['LAT021-018', { title: '反国民党也不能复制坏宪制', keywords: '反国民党,宪政,监察院,制度' }],
  ['LAT021-024', { title: '知识分子要守格调尊严', keywords: '知识分子,格调,尊严,诛盗' }],
  ['LAT021-025', { title: '国民党劫贫济富的结构', keywords: '国民党,劫贫济富,陈重光,黄金' }],
  ['LAT021-026', { title: '司法不能双重使用', keywords: '司法,双重标准,国民党法院,法治' }],
  ['LAT021-027', { title: '户半开民主只是外院戏', keywords: '民主,户半开,外院,选举' }],
  ['LAT021-028', { title: '选举会成为统治迷魂阵', keywords: '选举,统治,民主假象,迷魂阵' }],
  ['LAT021-030', { title: '小权力也会演成政治扰民', keywords: '政治人物,权力,扰民,剪彩' }],
  ['LAT021-031', { title: '反对党可能只是小国民党', keywords: '反对党,小国民党,民进党,政治复制' }],
  ['LAT021-033', { title: '选民判断依赖记忆', keywords: '选民,判断力,记忆力,土城事件' }],
  ['LAT021-034', { title: '民主运动需要民主气质', keywords: '民主运动,气质,从政,老大' }],
  ['LAT021-035', { title: '在野治权会被制度围困', keywords: '治权,在野,制度,县市长' }],
  ['LAT021-036', { title: '刀笔批判必须有证据', keywords: '写作,证据,黑函,批判' }],
  ['LAT021-037', { title: '选举会使民主本身落败', keywords: '选举,民主,民进党,失败' }],
  ['LAT021-039', { title: '政治法律经济不可错位解决', keywords: '国民党,法律问题,政治解决,本位' }],
  ['LAT021-040', { title: '两党合谋会毁掉法律', keywords: '法律,国民党,民进党,政治解决' }],
  ['LAT021-041', { title: '民主风度不能靠鼓噪', keywords: '民主,风度,鼓噪,闹场' }],
  ['LAT021-042', { title: '时代变化不等于可以无知', keywords: '时代变化,无知,胡适,知识' }],
  ['LAT021-043', { title: '好古必须敏求事实', keywords: '好古,敏求,文昌,文化' }],
  ['LAT021-044', { title: '知识分子不可做官方门面', keywords: '知识分子,官方,门面,刘宾雁' }],
  ['LAT021-045', { title: '艺术家可以抵制不人道国家', keywords: '艺术家,抵制,不人道,卡萨尔斯' }],
  ['LAT021-046', { title: '总统实权膨胀就是违宪', keywords: '总统,实权,违宪,宪政' }],
  ['LAT021-047', { title: '政府违宪会带坏人民思路', keywords: '政府违宪,人民,宪法,思路' }],
  ['LAT021-048', { title: '制度选择要接近人道', keywords: '制度,人道,资本主义,选择' }],
  ['LAT021-050', { title: '小贼接老贼会误掉民主', keywords: '老贼,小贼,民主,国民党' }],
  ['LAT021-051', { title: '监督权先于组织形式', keywords: '监督,设会,民意机构,政治' }],
  ['LAT021-052', { title: '社会主义理想会卷入奴役', keywords: '社会主义,理想,奴役,腐败' }],
  ['LAT021-053', { title: '傲骨不必露成骄气', keywords: '傲骨,骄气,人格,风度' }],
  ['LAT021-054', { title: '民进党仍从国民党胎里来', keywords: '民进党,国民党,政治来源,反对党' }],
  ['LAT021-056', { title: '才人入官场可能自毁', keywords: '才人,官位,知识分子,自毁' }],
  ['LAT021-057', { title: '小岛格局会养成小人国心态', keywords: '小人国,格局,台湾,方法' }],
  ['LAT021-058', { title: '报阀独立常是假象', keywords: '报阀,独立,媒体,筹码' }],
  ['LAT021-059', { title: '政治平衡也有唇齿关系', keywords: '政治平衡,唇亡齿寒,宋楚瑜,权力' }],
  ['LAT021-060', { title: '脱离宗教不该换一种皈依', keywords: '宗教,皈依,马克思,信仰' }],
  ['LAT021-061', { title: '美国人权话术也有伪善', keywords: '美国,人权,伪君子,黑名单' }],
  ['LAT021-062', { title: '民主进步不能托付民进党', keywords: '民主,进步,民进党,反对党' }],
  ['LAT021-063', { title: '错事勇敢对事胆怯是病态', keywords: '勇敢,胆怯,社会病态,人格' }],
  ['LAT021-064', { title: '增额立委也是违宪共犯', keywords: '增额立委,违宪,私生立委,宪政' }],
  ['LAT021-065', { title: '历史批判要证明不能只骂', keywords: '历史批判,证明,蒋经国,写作' }],
  ['LAT021-066', { title: '独裁可以连假戏都省掉', keywords: '独裁,假戏,专政,民主假象' }],
  ['LAT021-068', { title: '民主政党不该复制独裁训练', keywords: '民主政党,党员训练班,独裁,民进党' }],
  ['LAT021-069', { title: '强势知识分子要能独来独往', keywords: '知识分子,独来独往,中社,强势' }],
  ['LAT021-071', { title: '蒋经国没有部署民主宪政', keywords: '蒋经国,民主宪政,马屁,部署' }],
  ['LAT021-072', { title: '色情标签不能遮蔽作品复杂性', keywords: '色情,作品,复杂性,出版' }],
  ['LAT021-073', { title: '文章可以剥开政治假相', keywords: '文章,政治假相,吃饭,写作' }],
  ['LAT021-074', { title: '道德不该只剩单面标准', keywords: '道德,单面标准,王天竞,王滔夫' }],
  ['LAT021-075', { title: '堵死声色管道会生低级替代', keywords: '成人电影,声色,低级替代,文化政策' }],
  ['LAT021-076', { title: '仁慈可能反成残忍', keywords: '仁慈,残忍,人格,道德' }],
  ['LAT021-077', { title: '作诗是个人创作', keywords: '作诗,个人,创作,诗歌' }],
  ['LAT021-078', { title: '公共机构不该替宗教布施', keywords: '公共机构,宗教,布施,台中市' }],
  ['LAT021-079', { title: '法律免责不等于道德免责', keywords: '法律免责,道德免责,马克吐温,人格' }],
  ['LAT021-080', { title: '程序权利不能被双簧消耗', keywords: '程序权利,上诉,双簧,法权' }],
  ['LAT021-081', { title: '新闻管理因人而异就是坏法治', keywords: '新闻管理,选择执法,法治,邵玉铭' }],
  ['LAT021-082', { title: '共产主义理想不同于共产党', keywords: '共产主义,共产党,理想,知识' }],
  ['LAT021-083', { title: '政治冤案是政权耻辱', keywords: '政治冤案,王实味,平反,政权' }],
  ['LAT021-084', { title: '金钱有时能赎回国家自由', keywords: '金钱,国家自由,赎回,政治' }],
  ['LAT021-085', { title: '裸体也可以进入美感判断', keywords: '裸体,美感,广告,文化' }],
  ['LAT021-086', { title: '科学也可能改良迷信', keywords: '科学,迷信,妈祖,文化' }],
  ['LAT021-087', { title: '爱国不能只在嘴上', keywords: '爱国,口号,行动,文化' }],
  ['LAT021-088', { title: '主权论述不能自我梦呓', keywords: '主权,李登辉,台湾,逻辑' }],
  ['LAT021-089', { title: '知识分子不能先勇后怯', keywords: '知识分子,傅正,勇气,风骨' }],
  ['LAT021-090', { title: '研究不能用附会代替史料', keywords: '研究,史料,附会,孙中山' }],
  ['LAT021-091', { title: '明知可执法却视若无睹', keywords: '执法,色情广告,邵玉铭,法治' }],
  ['LAT021-093', { title: '党库通国库仍把利益归党', keywords: '党库,国库,国民党,党产' }],
  ['LAT021-094', { title: '黑名单照出自由伪善', keywords: '黑名单,自由,美国,伪善' }],
  ['LAT021-095', { title: '政策论述要实事求是', keywords: '政策,实事求是,科学,关中' }],
  ['LAT021-096', { title: '金权会取代政党政治', keywords: '金权,政党政治,郁慕明,选举' }],
  ['LAT021-098', { title: '台湾省称谓未必是矮化', keywords: '台湾省,海基会,矮化,称谓' }],
  ['LAT021-100', { title: '改称谓不能改变事实', keywords: '称谓,事实,舞女,名词' }],
  ['LAT021-101', { title: '做人成功不等于作文成功', keywords: '做人,作文,写作,笨鸟' }],
  ['LAT021-102', { title: '查禁思想会使书只剩罪证', keywords: '查禁,思想,书,罪证' }],
  ['LAT021-103', { title: '市场改革难与党控并存', keywords: '市场改革,党控,李光耀,大陆' }],
  ['LAT021-104', { title: '国民党民进党抱负同构', keywords: '国民党,民进党,李登辉,许信良' }],
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
    '- 分类策略：继续使用 7 个原子分类；删除重复、铺垫、个案性过强和偏人生智慧的条目。',
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
if (keptOriginalRecords.length !== 89) {
  throw new Error(`Expected 89 proofread records, got ${keptOriginalRecords.length}.`);
}

const records = keptOriginalRecords.map((record, index) => {
  const override = overrides.get(record.id) ?? {};
  return {
    ...record,
    ...override,
    id: `LAT021-${String(index + 1).padStart(3, '0')}`,
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
