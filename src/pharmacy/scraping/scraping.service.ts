import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import prefectures from './prefectureCodes.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mkdirRecursiveSync = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const download = async (url, filename) => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(__dirname + '/data/' + filename, buffer);
  } catch (error) {
    console.error(`Download error: ${error.message}`);
  }
};

const getFilenameFromUrl = (excelUrl) => {
  const urlDirArr = excelUrl.split('/');
  const filenameWithExt = urlDirArr.slice(-1);
  const filename = filenameWithExt[0].slice(0, -5);
  return filename;
};

const main = async () => {
  const mhlwPharmacyUrl = 'https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku.html';

  const dom = await JSDOM.fromURL(mhlwPharmacyUrl);
  const document = dom.window.document;
  const domList = document.body.querySelectorAll<HTMLAnchorElement>(
    'li a[data-icon="excel"]',
  );

  domList.forEach((dom, index) => {
    prefectures[index].url = dom.href;
  });

  mkdirRecursiveSync(__dirname + '/data/');

  for await (const prefecture of prefectures) {
    const originalFilename = getFilenameFromUrl(prefecture.url);
    const exportFilename =
      prefecture.code +
      '-' +
      prefecture.name +
      '-' +
      originalFilename +
      '.xlsx';
    download(prefecture.url, exportFilename);
  }
};

@Injectable()
export class ScrapingService {
  execJob(_cloudEvent): void {
    console.log('source:', _cloudEvent.source);
    main();
  }
}
