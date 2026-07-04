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

const report = await page.evaluate(() => {
  const reveals = [...document.querySelectorAll(".reveal")];
  return {
    total: reveals.length,
    visible: reveals.filter((r) => r.classList.contains("is-visible")).length,
    htmlHasJs: document.documentElement.classList.contains("js"),
    sampleOpacity: reveals.slice(0, 3).map((r) => getComputedStyle(r).opacity),
  };
});
console.log("antes do scroll:", JSON.stringify(report));

await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = "auto";
  for (let y = 0; y <= document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
});
await new Promise((r) => setTimeout(r, 800));

const after = await page.evaluate(() => {
  const reveals = [...document.querySelectorAll(".reveal")];
  return {
    visible: reveals.filter((r) => r.classList.contains("is-visible")).length,
    total: reveals.length,
  };
});
console.log("depois do scroll:", JSON.stringify(after));
await browser.close();
