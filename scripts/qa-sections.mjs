// Screenshots por seção em escala legível.
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const candidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];
const executablePath = candidates.find((p) => existsSync(p));
const browser = await puppeteer.launch({ executablePath, headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
await page.addStyleTag({
  content:
    ".cv-auto{content-visibility:visible!important} .js .reveal{opacity:1!important;transform:none!important}",
});
await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));

const ids = process.argv[2]
  ? process.argv[2].split(",")
  : ["como-atuamos", "como-funciona", "perguntas-frequentes", "localizacao"];

for (const id of ids) {
  await page.evaluate((i) => {
    document.getElementById(i).scrollIntoView();
  }, id);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `qa-sec-${id}.png` });
  console.log(`qa-sec-${id}.png`);
}
await browser.close();
