/*
 * README용 화면 캡쳐 스크립트.
 *
 * 사용법:
 *   1) npm run start  (다른 터미널에서 개발 서버 실행)
 *   2) npx playwright install chromium
 *   3) node scripts/screenshot.js [출력경로]
 *
 * API 서버(http://222.251.129.150)를 붙이지 않고 목 응답으로 화면을 채운다.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2] || path.join(__dirname, '..', 'docs', 'screenshots');
const BASE = 'http://localhost:3000';
const DUMMY = fs.readFileSync(path.join(__dirname, '..', 'public', 'dummy', '22.png'));

const TITLES = ['푸른 호수의 아침', '여름 정물 드로잉', '캔버스 위의 도시', '무제 03', '수채 스케치북', '아크릴 물감 세트'];
const products = TITLES.map((title, i) => ({
  _id: `mock-${i}`,
  title,
  price: (12000 + i * 3500),
  likeCount: 12 + i * 4,
  views: 130 + i * 27,
  locationName: ['홍익대학교', '국민대학교', '서울대학교'][i % 3],
  pieces: [{ fileUrl: '/dummy/22.png' }],
}));

const user = {
  userName: '김따미',
  userId: 'ddami_kim',
  major: '회화과',
  likeField: ['드로잉', '아크릴화'],
  imageUrl: '/dummy/22.png',
  follow: false,
  followerCount: 128,
  myPieces: products.map((p, i) => ({ _id: `piece-${i}`, fileUrl: ['/dummy/22.png'] })),
};

const PAGES = [
  ['main', '/'],
  ['login', '/login'],
  ['join', '/join'],
  ['search', '/search'],
  ['shop', '/shop/pieces'],
  ['workplace', '/workplace/my'],
  ['write', '/workplace/write'],
  ['like', '/like'],
  ['purchase', '/purchase'],
  ['subscribe', '/subscribe'],
  ['setting', '/setting'],
];

const json = (route, body) =>
  route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  // The API host (http://222.251.129.150) is unreachable from here, so serve
  // local mock payloads shaped like the real endpoints.
  await ctx.route('**://222.251.129.150/**', (route) => {
    const url = route.request().url();
    if (/\/uploads\//.test(url)) {
      return route.fulfill({ status: 200, contentType: 'image/png', body: DUMMY });
    }
    if (/\/shop\/search\/(product|material)/.test(url)) return json(route, { count: products.length, products });
    if (/\/shop\/detail\//.test(url)) return json(route, { product: products[0] });
    if (/\/user\/(myInfo|detail)/.test(url)) return json(route, { user });
    if (/\/piece\/detail\//.test(url)) return json(route, { piece: products[0] });
    if (/\/api\/(search|author\/search)/.test(url)) return json(route, { pieces: products, authors: [] });
    return json(route, {});
  });

  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message.split('\n')[0]));

  for (const [name, route] of PAGES) {
    errors.length = 0;
    try {
      await page.goto(BASE + route, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
      const size = await page.evaluate(() => document.documentElement.scrollHeight);
      console.log(`OK   ${name.padEnd(11)} ${route.padEnd(20)} h=${size}${errors.length ? '  ERR: ' + errors[0] : ''}`);
    } catch (e) {
      console.log(`FAIL ${name.padEnd(11)} ${route.padEnd(20)} ${e.message.split('\n')[0]}`);
    }
  }
  await browser.close();
})();
