import fs from 'node:fs';
import path from 'node:path';

const bookNo = '098';
const bookTitle = '李敖通电集';
const outputDir = path.join('outputs', `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, '思想索引-提取轮.json');

const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const dropGroups = [
  {
    reason: '即时处境、细节操作或自我辩护较强，独立思想索引价值较弱',
    ids: [
      'LAT098-001',
      'LAT098-048',
      'LAT098-064',
      'LAT098-065',
      'LAT098-077',
      'LAT098-087',
      'LAT098-090',
      'LAT098-092',
      'LAT098-100',
      'LAT098-114',
      'LAT098-123',
      'LAT098-126',
      'LAT098-127',
      'LAT098-139',
      'LAT098-161',
    ],
  },
  {
    reason: '与相邻公司法、行政责任、组织扩权或补件论证重复，保留更能承载核心判断的条目',
    ids: [
      'LAT098-009',
      'LAT098-012',
      'LAT098-019',
      'LAT098-021',
      'LAT098-025',
      'LAT098-028',
      'LAT098-041',
      'LAT098-054',
      'LAT098-061',
      'LAT098-071',
      'LAT098-102',
      'LAT098-109',
      'LAT098-116',
      'LAT098-129',
      'LAT098-133',
      'LAT098-134',
      'LAT098-143',
      'LAT098-153',
    ],
  },
];

const dropMap = new Map(
  dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])),
);

const overrides = {
  'LAT098-002': { title: '政治气候会改变承诺答案' },
  'LAT098-004': { title: '维权可并用法律与舆论', category: '方法' },
  'LAT098-005': { title: '未定著作收益不等于主持报酬' },
  'LAT098-006': { title: '书籍可与媒体交换价值' },
  'LAT098-010': { title: '监察人调查而不经营' },
  'LAT098-011': { title: '背信须有职务损害因果' },
  'LAT098-013': { title: '还债方式可见做人高下' },
  'LAT098-016': { title: '患难最能检验夫妻情义' },
  'LAT098-018': { title: '理解文字要顾全上下文' },
  'LAT098-020': { title: '募资承诺的股权应归投资人' },
  'LAT098-022': { title: '集体诉讼可追回股东权益' },
  'LAT098-026': { title: '官方报告略去处就是疑点' },
  'LAT098-027': { title: '冲突记录要与甲等考绩对照' },
  'LAT098-029': { title: '调查范围不该排除行政责任' },
  'LAT098-030': { title: '陈情转回被控单位使监察失效' },
  'LAT098-031': { title: '时间精力有限不能包揽一切' },
  'LAT098-032': { title: '替人卸责的调查不叫独立' },
  'LAT098-035': { title: '道歉常由持续追责逼出' },
  'LAT098-037': { title: '爱国方式随环境而变' },
  'LAT098-038': { title: '威权败退是抗争结果' },
  'LAT098-039': { title: '行政职位检验知识分子风骨' },
  'LAT098-043': { title: '高薪补差不该玩文字花样' },
  'LAT098-044': { title: '浪费公帑有时比贪污可怕' },
  'LAT098-046': { title: '学者先要做到自己宣示的中立' },
  'LAT098-047': { title: '监督社会前先管好本机构' },
  'LAT098-049': { title: '连任不能证明施政能力' },
  'LAT098-050': { title: '个案求证使政治批评具体' },
  'LAT098-052': { title: '诉愿有结果仍可能被拖延' },
  'LAT098-055': { title: '政党轮替可能放大旧错' },
  'LAT098-056': { title: '漂亮话不等于漂亮事' },
  'LAT098-060': { title: '补足美国薪资差额是在规避限制' },
  'LAT098-062': { title: '受益人不应为自肥文件盖印' },
  'LAT098-066': { title: '一人会议不能裁撤法定机构' },
  'LAT098-068': { title: '扩编容易变成有官大家做' },
  'LAT098-069': { title: '学术机构不应插手国家方针' },
  'LAT098-070': { title: '人才培育职能不应重复' },
  'LAT098-072': { title: '院长连任制会引入请托逼迎' },
  'LAT098-074': { title: '有官等职位应由适格者担任' },
  'LAT098-075': { title: '研究人员普遍兼行政会破坏体制' },
  'LAT098-076': { title: '个人杂志应与创办人及身而绝' },
  'LAT098-078': { title: '编成全集仍要靠私人机构' },
  'LAT098-079': { title: '渐老更该做别人做不成的事' },
  'LAT098-080': { title: '史料杂志的功过要一并追问' },
  'LAT098-082': { title: '言论阵地有扩宽自由的责任' },
  'LAT098-083': { title: '言论尺度扩展未必因统治者从良' },
  'LAT098-084': { title: '生存妥协造成不同文化路线' },
  'LAT098-085': { title: '把辞职偷换成请假是欺骗' },
  'LAT098-086': { title: '未图私利也要遵守行政程序' },
  'LAT098-088': { title: '权势使人以神自居' },
  'LAT098-091': { title: '专家自我膨胀会以为无所不知' },
  'LAT098-093': { title: '拆除造神先看原始证据' },
  'LAT098-094': { title: '老照片结合题注可保存家史' },
  'LAT098-096': { title: '资源集中于关系机构必须追问' },
  'LAT098-097': { title: '违法不是看法不同' },
  'LAT098-099': { title: '八行书真诚与否要看后续' },
  'LAT098-101': { title: '皇民化包含语言教育祖先认同' },
  'LAT098-103': { title: '行政机关不得在母法之外创设义务' },
  'LAT098-105': { title: '法条并列结构可判断适用对象' },
  'LAT098-107': { title: '历史旁证显出命令扩权路径' },
  'LAT098-108': { title: '军事限制不能扩张到男女问题' },
  'LAT098-110': { title: '不明确罚则不能靠部函补出' },
  'LAT098-112': { title: '候选人财产公开波及家人隐私' },
  'LAT098-113': { title: '以身试法可厘清法律矛盾' },
  'LAT098-115': { title: '现场承认与事后答辩要对照' },
  'LAT098-117': { title: '校勘要恢复被删尾段' },
  'LAT098-118': { title: '批判机构先做功能定性' },
  'LAT098-119': { title: '高道德监督会使人自封圣者' },
  'LAT098-120': { title: '监督者也应把自己送检' },
  'LAT098-121': { title: '辨邪也要检验自认的正法' },
  'LAT098-122': { title: '科学视角下的灵异陈述仍属巫术' },
  'LAT098-124': { title: '先公布可召唤后续史料' },
  'LAT098-125': { title: '语气极端不等于问题无可讨论' },
  'LAT098-130': { title: '良知与专业不能向上级让步' },
  'LAT098-131': { title: '领导先定方向会压缩部属判断' },
  'LAT098-132': { title: '政务官基本气质是人格一贯' },
  'LAT098-135': { title: '晚年应退回写作基本面' },
  'LAT098-136': { title: '公布双方信件是为保存史料' },
  'LAT098-137': { title: '往返文件应对照阅读' },
  'LAT098-138': { title: '被窃与伪件说法不能并立' },
  'LAT098-140': { title: '程式瑕疵不影响要件就应受理' },
  'LAT098-141': { title: '要求人民补正的机关也要补正自己' },
  'LAT098-142': { title: '革命常以新劣币驱逐良币收场' },
  'LAT098-144': { title: '政党头衔比民选职位更易取巧' },
  'LAT098-145': { title: '器量狭小的派系加速政党死亡' },
  'LAT098-146': { title: '公平不能拒绝衰病老人优先' },
  'LAT098-147': { title: '催人民补件的机关自己却慢吞吞' },
  'LAT098-148': { title: '额外文件可成为拖刀计' },
  'LAT098-149': { title: '未列入规定的文件不应临时追要' },
  'LAT098-151': { title: '切结源自对夷狄罪犯的不信任' },
  'LAT098-152': { title: '要求申明属实隐含有罪推定' },
  'LAT098-154': { title: '法律责任不因切结增减' },
  'LAT098-155': { title: '已有追责规定不必叠床架屋' },
  'LAT098-156': { title: '户籍原档比身分证更有证明力' },
  'LAT098-157': { title: '事后追加清单不应转嫁责任' },
  'LAT098-159': { title: '迁就受众会迫使媒体谈琐事' },
  'LAT098-160': { title: '没有收入也可换回时间自由' },
  'LAT098-162': { title: '合作终止也要有始有终' },
  'LAT098-163': { title: '责任在对方仍可表达感谢' },
};

function categoryCounts(records) {
  const counts = new Map();
  for (const record of records) {
    counts.set(record.category, (counts.get(record.category) || 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => a[0].localeCompare(b[0], 'zh-Hans-CN'))
    .map(([category, count]) => ({ category, count }));
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function toCsv(records) {
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
  const lines = [headers.join(',')];
  for (const record of records) {
    lines.push(headers.map((header) => {
      const value = Array.isArray(record[header]) ? record[header].join(';') : record[header];
      return csvEscape(value);
    }).join(','));
  }
  return `${lines.join('\n')}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`,
    '',
    `- 原始条目：${input.records.length}`,
    `- 校对后条目：${records.length}`,
    `- 删除条目：${dropMap.size}`,
    '',
  ];

  let currentCategory = '';
  for (const record of records) {
    if (record.category !== currentCategory) {
      currentCategory = record.category;
      lines.push(`## ${currentCategory}`, '');
    }
    lines.push(`### ${record.id} ${record.title}`);
    lines.push('');
    lines.push(record.description);
    lines.push('');
    lines.push(`出处：${record.source_file}#${record.source_paragraph}`);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function toTxt(records) {
  return `${records.map((record) => (
    `${record.id}｜${record.category}｜${record.title}\n${record.description}\n出处：${record.source_file}#${record.source_paragraph}`
  )).join('\n\n')}\n`;
}

function normalizeRecords(records) {
  let sequence = 1;
  return records
    .filter((record) => !dropMap.has(record.id))
    .map((record) => {
      const override = overrides[record.id] || {};
      return {
        ...record,
        round: '校对轮',
        status: '已校对',
        source_id: record.id,
        id: `LAT098-${String(sequence++).padStart(3, '0')}`,
        title: override.title || record.title,
        category: override.category || record.category,
      };
    });
}

const inputIds = new Set(input.records.map((record) => record.id));
const missingDropIds = [...dropMap.keys()].filter((id) => !inputIds.has(id));
if (missingDropIds.length) {
  throw new Error(`Drop ids not found: ${missingDropIds.join(', ')}`);
}

const missingOverrideIds = Object.keys(overrides).filter((id) => !inputIds.has(id));
if (missingOverrideIds.length) {
  throw new Error(`Override ids not found: ${missingOverrideIds.join(', ')}`);
}

const records = normalizeRecords(input.records);
const counts = categoryCounts(records);
const proofreadSummary = '校对轮保留李敖本人可独立检索的法权原则、证据方法、政治批判、知识分子人格观与写作观；删去重复法理、过密个案步骤和即时性辩护。description 字段未改写，仍保留提取轮原文。';
const book = {
  ...input.book,
  round: '校对轮',
  status: '已校对',
  note: proofreadSummary,
  record_count: records.length,
  source_count: input.records.length,
  dropped_count: dropMap.size,
  category_counts: counts,
};

const payload = {
  ...input,
  book,
  round: '校对轮',
  status: '已校对',
  record_count: records.length,
  source_count: input.records.length,
  dropped_count: dropMap.size,
  category_counts: counts,
  note: proofreadSummary,
  proofread_at: new Date().toISOString(),
  dropped_records: [...dropMap.entries()].map(([id, reason]) => ({
    id,
    reason,
    title: input.records.find((record) => record.id === id)?.title || '',
  })),
  records,
};

fs.writeFileSync(
  path.join(outputDir, '思想索引-校对轮.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.csv'), toCsv(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引-校对轮.md'), toMarkdown(records), 'utf8');
fs.writeFileSync(
  path.join(outputDir, '思想索引.json'),
  `${JSON.stringify(payload, null, 2)}\n`,
  'utf8',
);
fs.writeFileSync(path.join(outputDir, '思想索引.csv'), toCsv(records), 'utf8');
fs.writeFileSync(path.join(outputDir, '思想索引.txt'), toTxt(records), 'utf8');

const proofreadNote = [
  `# ${bookTitle} 校对说明`,
  '',
  `- 输入：思想索引-提取轮.json（${input.records.length} 条）`,
  `- 输出：思想索引-校对轮.json / csv / md（${records.length} 条）`,
  `- 删除：${dropMap.size} 条`,
  '- 同步：思想索引.json / csv / txt 已更新为校对轮版本',
  '',
  '## 删除原则',
  '',
  ...dropGroups.map((group) => `- ${group.reason}：${group.ids.join('、')}`),
  '',
  '## 保留原则',
  '',
  '- 保留李敖本人的法权原则、证据方法、政治批判、知识分子人格观、文化观与写作观。',
  '- 对公司法、中研院组织法、候选人财产申报和白色恐怖补件的连续论证做收敛处理。',
  '- 标题只做压缩和辨识度修订；description 不改写原文。',
  '',
  '## 分类统计',
  '',
  ...counts.map((item) => `- ${item.category}：${item.count}`),
  '',
].join('\n');

fs.writeFileSync(path.join(outputDir, '校对说明.md'), proofreadNote, 'utf8');

console.log(JSON.stringify({
  book: `${bookNo}.${bookTitle}`,
  source: input.records.length,
  dropped: dropMap.size,
  retained: records.length,
  categories: counts,
}, null, 2));
