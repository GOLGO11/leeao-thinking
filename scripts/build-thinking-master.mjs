import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputsDir = path.join(rootDir, 'outputs');

const currentBookFiles = [
  {
    sequence: '001',
    jsonPath: path.join(outputsDir, '001.李敖自传与回忆', '思想索引-校对轮.json'),
  },
  {
    sequence: '002',
    jsonPath: path.join(outputsDir, '002.李敖自传与回忆续集', '思想索引-校对轮.json'),
  },
  {
    sequence: '003',
    jsonPath: path.join(outputsDir, '003.我最难忘的事和人', '思想索引-校对轮.json'),
  },
  {
    sequence: '004',
    jsonPath: path.join(outputsDir, '004.李敖回忆录', '思想索引-校对轮.json'),
  },
  {
    sequence: '005',
    jsonPath: path.join(outputsDir, '005.李敖快意恩仇录', '思想索引-校对轮.json'),
  },
  {
    sequence: '006',
    jsonPath: path.join(outputsDir, '006.李敖议坛哀思录', '思想索引-校对轮.json'),
  },
  {
    sequence: '007',
    jsonPath: path.join(outputsDir, '007.李敖风流自传', '思想索引-校对轮.json'),
  },
  {
    sequence: '008',
    jsonPath: path.join(outputsDir, '008.李敖相关', '思想索引-校对轮.json'),
  },
  {
    sequence: '009',
    jsonPath: path.join(outputsDir, '009.传统下的独白', '思想索引-校对轮.json'),
  },
  {
    sequence: '010',
    jsonPath: path.join(outputsDir, '010.传统下的再白', '思想索引-校对轮.json'),
  },
  {
    sequence: '011',
    jsonPath: path.join(outputsDir, '011.独白下的传统', '思想索引-校对轮.json'),
  },
  {
    sequence: '012',
    jsonPath: path.join(outputsDir, '012.李敖文存', '思想索引-校对轮.json'),
  },
  {
    sequence: '013',
    jsonPath: path.join(outputsDir, '013.李敖文存二集', '思想索引-校对轮.json'),
  },
  {
    sequence: '014',
    jsonPath: path.join(outputsDir, '014.波波颂', '思想索引-校对轮.json'),
  },
  {
    sequence: '015',
    jsonPath: path.join(outputsDir, '015.李敖全集', '思想索引-校对轮.json'),
  },
  {
    sequence: '016',
    jsonPath: path.join(outputsDir, '016.教育与脸谱', '思想索引-校对轮.json'),
  },
  {
    sequence: '017',
    jsonPath: path.join(outputsDir, '017.文化论战丹火录', '思想索引-校对轮.json'),
  },
  {
    sequence: '018',
    jsonPath: path.join(outputsDir, '018.为中国思想趋向求答案', '思想索引-校对轮.json'),
  },
  {
    sequence: '019',
    jsonPath: path.join(outputsDir, '019.上下古今谈', '思想索引-校对轮.json'),
  },
  {
    sequence: '020',
    jsonPath: path.join(outputsDir, '020.世论新语', '思想索引-校对轮.json'),
  },
  {
    sequence: '021',
    jsonPath: path.join(outputsDir, '021.求是新语', '思想索引-校对轮.json'),
  },
  {
    sequence: '022',
    jsonPath: path.join(outputsDir, '022.我是天安门', '思想索引-校对轮.json'),
  },
  {
    sequence: '023',
    jsonPath: path.join(outputsDir, '023.你是景福门', '思想索引-校对轮.json'),
  },
  {
    sequence: '024',
    jsonPath: path.join(outputsDir, '024.为自由招魂', '思想索引-校对轮.json'),
  },
  {
    sequence: '025',
    jsonPath: path.join(outputsDir, '025.你笨蛋，你笨蛋', '思想索引-校对轮.json'),
  },
  {
    sequence: '026',
    jsonPath: path.join(outputsDir, '026.我梦碎，所以我梦醒', '思想索引-校对轮.json'),
  },
  {
    sequence: '027',
    jsonPath: path.join(outputsDir, '027.李敖新刊', '思想索引-校对轮.json'),
  },
  {
    sequence: '028',
    jsonPath: path.join(outputsDir, '028.千秋万岁乌鸦求是合集', '思想索引-校对轮.json'),
  },
  {
    sequence: '029',
    jsonPath: path.join(outputsDir, '029.李敖杂文集', '思想索引-校对轮.json'),
  },
  {
    sequence: '030',
    jsonPath: path.join(outputsDir, '030.千秋万岁编外集', '思想索引-校对轮.json'),
  },
  {
    sequence: '031',
    jsonPath: path.join(outputsDir, '031.北京法源寺', '思想索引-校对轮.json'),
  },
  {
    sequence: '032',
    jsonPath: path.join(outputsDir, '032.上山·上山·爱', '思想索引-校对轮.json'),
  },
  {
    sequence: '033',
    jsonPath: path.join(outputsDir, '033.红色11', '思想索引-校对轮.json'),
  },
  {
    sequence: '034',
    jsonPath: path.join(outputsDir, '034.虚拟的十七岁', '思想索引-校对轮.json'),
  },
  {
    sequence: '035',
    jsonPath: path.join(outputsDir, '035.阳痿美国', '思想索引-校对轮.json'),
  },
  {
    sequence: '036',
    jsonPath: path.join(outputsDir, '036.第73烈士', '思想索引-校对轮.json'),
  },
  {
    sequence: '037',
    jsonPath: path.join(outputsDir, '037.爱情的秘密', '思想索引-校对轮.json'),
  },
  {
    sequence: '038',
    jsonPath: path.join(outputsDir, '038.李敖的情诗', '思想索引-校对轮.json'),
  },
  {
    sequence: '039',
    jsonPath: path.join(outputsDir, '039.李语录', '思想索引-校对轮.json'),
  },
  {
    sequence: '040',
    jsonPath: path.join(outputsDir, '040.李敖语录', '思想索引-校对轮.json'),
  },
  {
    sequence: '041',
    jsonPath: path.join(outputsDir, '041.虽千万人，李敖往矣', '思想索引-校对轮.json'),
  },
  {
    sequence: '042',
    jsonPath: path.join(outputsDir, '042.挑战李敖——敖语录', '思想索引-校对轮.json'),
  },
  {
    sequence: '043',
    jsonPath: path.join(outputsDir, '043.大学札记', '思想索引-校对轮.json'),
  },
  {
    sequence: '044',
    jsonPath: path.join(outputsDir, '044.早年日记', '思想索引-校对轮.json'),
  },
  {
    sequence: '045',
    jsonPath: path.join(outputsDir, '045.大学后期日记甲集', '思想索引-校对轮.json'),
  },
  {
    sequence: '046',
    jsonPath: path.join(outputsDir, '046.大学后期日记乙集', '思想索引-校对轮.json'),
  },
  {
    sequence: '047',
    jsonPath: path.join(outputsDir, '047.一个预备军官的日记', '思想索引-校对轮.json'),
  },
  {
    sequence: '048',
    jsonPath: path.join(outputsDir, '048.李敖秘藏日记', '思想索引-校对轮.json'),
  },
  {
    sequence: '049',
    jsonPath: path.join(outputsDir, '049.李敖札记', '思想索引-校对轮.json'),
  },
  {
    sequence: '050',
    jsonPath: path.join(outputsDir, '050.李敖五五日记', '思想索引-校对轮.json'),
  },
  {
    sequence: '051',
    jsonPath: path.join(outputsDir, '051.李敖随写录前集', '思想索引-校对轮.json'),
  },
  {
    sequence: '052',
    jsonPath: path.join(outputsDir, '052.李敖随写录后集', '思想索引-校对轮.json'),
  },
  {
    sequence: '053',
    jsonPath: path.join(outputsDir, '053.李敖报刊集', '思想索引-校对轮.json'),
  },
  {
    sequence: '054',
    jsonPath: path.join(outputsDir, '054.李敖书序集', '思想索引-校对轮.json'),
  },
  {
    sequence: '055',
    jsonPath: path.join(outputsDir, '055.李敖书序集续集', '思想索引-校对轮.json'),
  },
  {
    sequence: '056',
    jsonPath: path.join(outputsDir, '056.李敖对话录', '思想索引-校对轮.json'),
  },
  {
    sequence: '057',
    jsonPath: path.join(outputsDir, '057.李敖访谈录1990-2018', '思想索引-校对轮.json'),
  },
  {
    sequence: '058',
    jsonPath: path.join(outputsDir, '058.李敖情书集', '思想索引-校对轮.json'),
  },
  {
    sequence: '059',
    jsonPath: path.join(outputsDir, '059.李敖书信集', '思想索引-校对轮.json'),
  },
  {
    sequence: '060',
    jsonPath: path.join(outputsDir, '060.李敖书翰集', '思想索引-校对轮.json'),
  },
  {
    sequence: '061',
    jsonPath: path.join(outputsDir, '061.李敖书简集', '思想索引-提取轮.json'),
  },
];

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

const payloads = currentBookFiles.map(({ jsonPath }) => {
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Missing current book index: ${jsonPath}`);
  }
  return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
});

const taxonomy = [...new Set(payloads.flatMap((payload) => payload.taxonomy ?? []))];
const records = payloads.flatMap((payload) => payload.records ?? []);
const books = payloads.map((payload, index) => {
  const bookRecords = payload.records ?? [];
  return {
    ...payload.book,
    sequence: payload.book?.sequence ?? currentBookFiles[index].sequence,
    record_count: bookRecords.length,
    category_counts: categoryCounts(bookRecords, taxonomy),
  };
});

const master = {
  generated_at: new Date().toISOString(),
  books,
  taxonomy,
  records,
};

fs.writeFileSync(
  path.join(outputsDir, '思想索引总表.json'),
  `${JSON.stringify(master, null, 2)}\n`,
  'utf8',
);
writeCsv(path.join(outputsDir, '思想索引总表.csv'), records);

console.log(`Built master index: ${books.length} books, ${records.length} records.`);
