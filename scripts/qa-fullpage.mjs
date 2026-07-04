// Screenshots de página inteira (mobile 390 e desktop 1440) para revisão visual.
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
const page = await browser.newPage();

async function shoot(width, height, name) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  // O screenshot fullPage renderiza fora da viewport sem disparar o
  // IntersectionObserver nem pintar content-visibility:auto — força o estado final.
  await page.addStyleTag({
    content:
      ".cv-auto{content-visibility:visible!important} .js .reveal{opacity:1!important;transform:none!important}",
  });
  // Força todos os reveals a aparecer
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: name, fullPage: true });
  console.log("salvo:", name);
}

await shoot(390, 844, "qa-full-mobile.png");
await shoot(1440, 900, "qa-full-desktop.png");
await browser.close();
