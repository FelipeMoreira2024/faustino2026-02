// Auditoria mobile-first: overflow horizontal e alvos de toque em vários viewports.
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const candidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) throw new Error("Nenhum Chrome/Edge encontrado");

const browser = await puppeteer.launch({ executablePath, headless: "new" });
const page = await browser.newPage();

const widths = [320, 360, 390, 414, 768, 1024];
let failed = false;

for (const width of widths) {
  await page.setViewport({ width, height: 844, deviceScaleFactor: 2 });
  // domcontentloaded: o iframe do Google Maps segura o evento "load" no headless
  await page.goto(process.env.QA_URL ?? "http://localhost:3000", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.addStyleTag({
    content: ".cv-auto{content-visibility:visible!important}",
  });
  await new Promise((r) => setTimeout(r, 300));

  const result = await page.evaluate(() => {
    const vw = window.innerWidth;
    const docWidth = document.scrollingElement.scrollWidth;
    const offenders = [];
    if (docWidth > vw) {
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 1) {
          offenders.push(
            `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join(".")} right=${Math.round(r.right)}`
          );
          if (offenders.length >= 5) break;
        }
      }
    }
    // Alvos de toque: links/botões visíveis com menos de 40px de altura
    const smallTargets = [];
    for (const el of document.querySelectorAll("a, button")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.height < 24) {
        smallTargets.push(
          `${el.textContent.trim().slice(0, 30) || el.getAttribute("aria-label")} h=${Math.round(r.height)}`
        );
      }
    }
    return { vw, docWidth, offenders, smallTargets };
  });

  const ok = result.docWidth <= result.vw;
  if (!ok) failed = true;
  console.log(
    `${width}px: ${ok ? "OK" : `OVERFLOW ${result.docWidth}>${result.vw}`}` +
      (result.offenders.length ? `\n  ${result.offenders.join("\n  ")}` : "") +
      (result.smallTargets.length
        ? `\n  alvos pequenos: ${result.smallTargets.join(" | ")}`
        : "")
  );
}

await browser.close();
process.exit(failed ? 1 : 0);
