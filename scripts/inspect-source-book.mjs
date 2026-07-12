import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const [sourceDir, ...tokens] = process.argv.slice(2);
if (!sourceDir || tokens.length === 0) {
  throw new Error('Usage: node scripts/inspect-source-book.mjs <source-dir> <file-token> [...]');
}

const decoder = new TextDecoder('gb18030');
const files = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt'));

for (const tokenWithRange of tokens) {
  const [, token, startText, endText] = tokenWithRange.match(/^([^:]+)(?::(\d+)(?:-(\d+))?)?$/) || [];
  if (!token) throw new Error(`Invalid token: ${tokenWithRange}`);
  const matches = files.filter((name) => (
    name.startsWith(`${token}.`) || name.includes(token)
  ));
  if (matches.length !== 1) {
    throw new Error(`Cannot resolve ${token}: ${matches.join(', ')}`);
  }

  const fileName = matches[0];
  const paragraphs = decoder.decode(fs.readFileSync(path.join(sourceDir, fileName)))
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((value) => value.trim())
    .filter(Boolean);

  const start = startText ? Number(startText) : 1;
  const end = endText ? Number(endText) : paragraphs.length;
  console.log(`\n### ${fileName} (${start}-${Math.min(end, paragraphs.length)})`);
  paragraphs.slice(start - 1, end).forEach((paragraph, offset) => {
    const index = start - 1 + offset;
    const preview = paragraph.replace(/\s+/g, ' ').slice(0, 190);
    console.log(`${String(index + 1).padStart(3, '0')} ${preview}`);
  });
}
