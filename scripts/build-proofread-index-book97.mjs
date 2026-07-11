import fs from "fs";
import path from "path";

const bookNo = "097";
const bookTitle = "李敖来电集";
const outputDir = path.join("outputs", `${bookNo}.${bookTitle}`);
const inputPath = path.join(outputDir, "思想索引-提取轮.json");

const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const dropGroups = [
  {
    reason: "自我处境、即时回应或背景性表述强，独立思想索引价值较弱",
    ids: [
      "LAT097-002",
      "LAT097-004",
      "LAT097-034",
      "LAT097-052",
      "LAT097-053",
      "LAT097-078",
      "LAT097-095",
      "LAT097-096",
      "LAT097-098",
      "LAT097-137",
    ],
  },
  {
    reason: "女性从政相关段落重复度高，保留更能概括其判断的条目",
    ids: ["LAT097-017", "LAT097-020", "LAT097-022", "LAT097-028"],
  },
  {
    reason: "地产、住户与行政细节过密，保留可形成制度批评或证据方法的条目",
    ids: [
      "LAT097-058",
      "LAT097-060",
      "LAT097-068",
      "LAT097-100",
      "LAT097-102",
      "LAT097-105",
      "LAT097-107",
      "LAT097-109",
      "LAT097-111",
      "LAT097-116",
      "LAT097-123",
      "LAT097-129",
      "LAT097-130",
      "LAT097-131",
      "LAT097-132",
      "LAT097-135",
      "LAT097-136",
    ],
  },
  {
    reason: "历史、法权与政治论证中已有相邻条目承载核心判断",
    ids: [
      "LAT097-081",
      "LAT097-082",
      "LAT097-143",
      "LAT097-144",
      "LAT097-156",
      "LAT097-162",
      "LAT097-164",
      "LAT097-167",
    ],
  },
];

const dropMap = new Map(
  dropGroups.flatMap((group) => group.ids.map((id) => [id, group.reason])),
);

const overrides = {
  "LAT097-001": { title: "被忽略逼出文学界反省" },
  "LAT097-003": { title: "文学评价看整体理想主义" },
  "LAT097-005": { title: "翻译之后不懂责任在读者" },
  "LAT097-006": { title: "真正佛教由出世回到入世" },
  "LAT097-010": { title: "小说前途在思想深广" },
  "LAT097-012": { title: "火爆语言后要有材料" },
  "LAT097-013": { title: "争千秋先要争一时" },
  "LAT097-018": { title: "革命牺牲要问值不值得" },
  "LAT097-021": { title: "中国政治排斥知识分子" },
  "LAT097-024": { title: "脱离信仰也要光荣承认" },
  "LAT097-025": { title: "政治视野狭窄就是陋" },
  "LAT097-029": { title: "不成熟领导人让全民付学费" },
  "LAT097-032": { title: "借古人说自己的话" },
  "LAT097-037": { title: "决策暗变要追文件" },
  "LAT097-041": { title: "错误决策比贪污更可怕" },
  "LAT097-044": { title: "张冠李戴的公文是欺骗" },
  "LAT097-047": { title: "打倒恶党只是第一步" },
  "LAT097-048": { title: "新执政党不能成小国民党" },
  "LAT097-050": { title: "个人胜利不等于政党执政" },
  "LAT097-054": { title: "批评要小心求证" },
  "LAT097-056": { title: "欢迎真理上的匡正" },
  "LAT097-061": { title: "知识分子修法自利更难看" },
  "LAT097-063": { title: "隐瞒兼职已涉伪造" },
  "LAT097-065": { title: "声称同意必须拿证据" },
  "LAT097-070": { title: "第一流人不该虚度小岛政治" },
  "LAT097-073": { title: "高科技关键在善用" },
  "LAT097-075": { title: "虚拟政治没有实力就是逃避" },
  "LAT097-080": { title: "公允不是褒贬各半" },
  "LAT097-083": { title: "复仇可凭证据成为正义" },
  "LAT097-084": { title: "恨敌人也要知己知彼" },
  "LAT097-086": { title: "评传要考证完备叙事明晰" },
  "LAT097-090": { title: "骂人也要遵守求真" },
  "LAT097-091": { title: "报复敌人的方法是研究" },
  "LAT097-092": { title: "结论要经新史料验证" },
  "LAT097-099": { title: "总统豁免卸任后才能追究" },
  "LAT097-101": { title: "总统牌能摆平违法行政" },
  "LAT097-104": { title: "权贵带头会制造财团暴利" },
  "LAT097-106": { title: "国有水利用地变建地是特权" },
  "LAT097-108": { title: "低价让售要查利益输送" },
  "LAT097-110": { title: "行政配合财团会瞒过人民" },
  "LAT097-112": { title: "公证价与市价差异要追" },
  "LAT097-114": { title: "收入核算逼出资金缺口" },
  "LAT097-115": { title: "折扣优惠可能构成官商勾结" },
  "LAT097-119": { title: "低税负暴露社会公平问题" },
  "LAT097-120": { title: "国税局欺善怕恶造成不平" },
  "LAT097-122": { title: "不当低价利益可能是贿赂" },
  "LAT097-124": { title: "财务印信分掌才能防弊" },
  "LAT097-127": { title: "私产收益动用要经同意" },
  "LAT097-128": { title: "会计制衡不能一把抓" },
  "LAT097-133": { title: "四合一管钱不可能秉公" },
  "LAT097-139": { title: "著作卖断后责任转移" },
  "LAT097-142": { title: "连续犯必须同一行为人" },
  "LAT097-146": { title: "媒体错误无需逐一更正" },
  "LAT097-147": { title: "法定职责不能因对象而拒绝" },
  "LAT097-148": { title: "心里想的不能冒充事实" },
  "LAT097-151": { title: "精神痛苦有时不证自明" },
  "LAT097-152": { title: "总统任次不能腰斩法统" },
  "LAT097-154": { title: "中华民国早已亡国" },
  "LAT097-158": { title: "台湾认同须分三层" },
  "LAT097-159": { title: "出生尊严不可践踏" },
  "LAT097-160": { title: "自由主义救中国不是反中国" },
  "LAT097-163": { title: "政见上台十一天就作废无信" },
  "LAT097-165": { title: "执政党会接收旧政权媒体习气" },
  "LAT097-166": { title: "回击美国要熟知美国历史" },
  "LAT097-168": { title: "施暴于人民没有本质差别" },
  "LAT097-171": { title: "指出美国无理不等于替六四辩护" },
};

function categoryCounts(records) {
  const counts = new Map();
  for (const record of records) {
    counts.set(record.category, (counts.get(record.category) || 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => a[0].localeCompare(b[0], "zh-Hans-CN"))
    .map(([category, count]) => ({ category, count }));
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function toCsv(records) {
  const headers = [
    "id",
    "source_id",
    "book_no",
    "book",
    "category",
    "title",
    "description",
    "source_file",
    "source_paragraph",
  ];
  const lines = [headers.join(",")];
  for (const record of records) {
    lines.push(headers.map((header) => csvEscape(record[header])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

function toMarkdown(records) {
  const lines = [
    `# ${bookTitle} 思想索引（校对轮）`,
    "",
    `- 原始条目：${input.records.length}`,
    `- 校对后条目：${records.length}`,
    `- 删除条目：${dropMap.size}`,
    "",
  ];

  let currentCategory = "";
  for (const record of records) {
    if (record.category !== currentCategory) {
      currentCategory = record.category;
      lines.push(`## ${currentCategory}`, "");
    }
    lines.push(`### ${record.id} ${record.title}`);
    lines.push("");
    lines.push(record.description);
    lines.push("");
    lines.push(`出处：${record.source_file}#${record.source_paragraph}`);
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

function toTxt(records) {
  return `${records
    .map(
      (record) =>
        `${record.id}｜${record.category}｜${record.title}\n${record.description}\n出处：${record.source_file}#${record.source_paragraph}`,
    )
    .join("\n\n")}\n`;
}

function normalizeRecords(records) {
  let seq = 1;
  return records
    .filter((record) => !dropMap.has(record.id))
    .map((record) => {
      const override = overrides[record.id] || {};
      return {
        ...record,
        round: "校对轮",
        status: "已校对",
        source_id: record.id,
        id: `LAT097-${String(seq++).padStart(3, "0")}`,
        title: override.title || record.title,
        category: override.category || record.category,
      };
    });
}

const missingDropIds = [...dropMap.keys()].filter(
  (id) => !input.records.some((record) => record.id === id),
);
if (missingDropIds.length) {
  throw new Error(`Drop ids not found: ${missingDropIds.join(", ")}`);
}

const missingOverrideIds = Object.keys(overrides).filter(
  (id) => !input.records.some((record) => record.id === id),
);
if (missingOverrideIds.length) {
  throw new Error(`Override ids not found: ${missingOverrideIds.join(", ")}`);
}

const records = normalizeRecords(input.records);
const counts = categoryCounts(records);
const proofreadSummary =
  "校对轮保留李敖自己的判断、方法、法权观与政治批评；删去自我处境、即时回应、重复判断和过密个案细节。description 字段未重写，仍保留原始文本。";
const book = {
  ...input.book,
  round: "校对轮",
  status: "已校对",
  note: proofreadSummary,
  record_count: records.length,
  source_count: input.records.length,
  dropped_count: dropMap.size,
  category_counts: counts,
};

const payload = {
  ...input,
  book,
  round: "校对轮",
  status: "已校对",
  record_count: records.length,
  source_count: input.records.length,
  dropped_count: dropMap.size,
  category_counts: counts,
  note: proofreadSummary,
  proofread_at: new Date().toISOString(),
  dropped_records: [...dropMap.entries()].map(([id, reason]) => ({
    id,
    reason,
    title: input.records.find((record) => record.id === id)?.title || "",
  })),
  records,
};

fs.writeFileSync(
  path.join(outputDir, "思想索引-校对轮.json"),
  `${JSON.stringify(payload, null, 2)}\n`,
  "utf8",
);
fs.writeFileSync(path.join(outputDir, "思想索引-校对轮.csv"), toCsv(records), "utf8");
fs.writeFileSync(path.join(outputDir, "思想索引-校对轮.md"), toMarkdown(records), "utf8");
fs.writeFileSync(
  path.join(outputDir, "思想索引.json"),
  `${JSON.stringify(payload, null, 2)}\n`,
  "utf8",
);
fs.writeFileSync(path.join(outputDir, "思想索引.csv"), toCsv(records), "utf8");
fs.writeFileSync(path.join(outputDir, "思想索引.txt"), toTxt(records), "utf8");

const proofreadNote = [
  `# ${bookTitle} 校对说明`,
  "",
  `- 输入：思想索引-提取轮.json（${input.records.length} 条）`,
  `- 输出：思想索引-校对轮.json / csv / md（${records.length} 条）`,
  `- 同步：思想索引.json / csv / txt 已更新为校对轮版本`,
  "",
  "## 删除原则",
  "",
  ...dropGroups.flatMap((group) => [
    `- ${group.reason}：${group.ids.join("、")}`,
  ]),
  "",
  "## 保留原则",
  "",
  "- 保留李敖自己的判断、论证方法、法权意识、政治批评、文化与写作观。",
  "- 对同一地产、诉讼、住户个案中的重复证据链作收敛处理。",
  "- 标题只做压缩和辨识度修订，description 不改写原文。",
  "",
].join("\n");

fs.writeFileSync(path.join(outputDir, "校对说明.md"), proofreadNote, "utf8");

console.log(
  JSON.stringify(
    {
      book: `${bookNo}.${bookTitle}`,
      source: input.records.length,
      dropped: dropMap.size,
      retained: records.length,
      categories: payload.category_counts,
    },
    null,
    2,
  ),
);
