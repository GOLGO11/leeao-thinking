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
    jsonPath: path.join(outputsDir, '007.李敖风流自传', '思想索引-提取轮.json'),
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
