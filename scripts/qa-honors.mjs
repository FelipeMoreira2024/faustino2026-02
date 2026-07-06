// Screenshot do carrossel de honrarias em desktop e mobile.
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const candidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const executablePath = candidates.find((p) => existsSync(p));
const browser = await puppeteer.launch({ executablePath, headless: "new" });

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

for (const { name, width, height } of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.goto(process.env.QA_URL ?? "http://localhost:3000", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.addStyleTag({
    content:
      ".cv-auto{content-visibility:visible!important} .js .reveal{opacity:1!important;transform:none!important}",
  });
  await page.evaluate(
    () => (document.documentElement.style.scrollBehavior = "auto")
  );
  await page.evaluate(() => {
    document
      .querySelector('[aria-label="Galeria de reconhecimentos"]')
      .scrollIntoView({ block: "center" });
  });
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: `qa-honors-${name}.png` });
  console.log(`qa-honors-${name}.png`);
  await page.close();
}
await browser.close();
