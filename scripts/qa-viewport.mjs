// QA visual: overflow horizontal em 390px + screenshots mobile/desktop.
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

// ---- Mobile 390px ----
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

const overflow = await page.evaluate(() => {
  const docWidth = document.scrollingElement.scrollWidth;
  const vw = window.innerWidth;
  const offenders = [];
  if (docWidth > vw) {
    for (const el of document.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 || r.left < -1) {
        offenders.push(
          `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join(".")} → ${Math.round(r.left)}..${Math.round(r.right)}`
        );
        if (offenders.length >= 10) break;
      }
    }
  }
  return { docWidth, vw, offenders };
});
console.log(
  overflow.docWidth <= overflow.vw
    ? `390px OK — scrollWidth ${overflow.docWidth} == viewport ${overflow.vw}`
    : `OVERFLOW em 390px: ${overflow.docWidth} > ${overflow.vw}\n${overflow.offenders.join("\n")}`
);

// Botão flutuante: oculto no topo, visível após 400px
const hiddenAtTop = await page.evaluate(() => {
  const btn = document.querySelector('a[aria-label="Falar agora no WhatsApp"]');
  return getComputedStyle(btn).opacity === "0";
});
await page.evaluate(() => window.scrollTo(0, 600));
await new Promise((r) => setTimeout(r, 600));
const visibleAfterScroll = await page.evaluate(() => {
  const btn = document.querySelector('a[aria-label="Falar agora no WhatsApp"]');
  return getComputedStyle(btn).opacity === "1";
});
console.log(
  `Botão flutuante: oculto no topo=${hiddenAtTop}, visível após scroll=${visibleAfterScroll}`
);

// dataLayer push
const dl = await page.evaluate(() => {
  window.dataLayer = [];
  document.querySelector("main a[href^='https://wa.me']").dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true })
  );
  return window.dataLayer;
});
console.log("dataLayer:", JSON.stringify(dl));

await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: "qa-mobile-390.png" });

// Altura dos CTAs no mobile
const ctaHeights = await page.evaluate(() =>
  [...document.querySelectorAll("main a[href^='https://wa.me']")].map((a) => ({
    text: a.textContent.trim().slice(0, 40),
    h: Math.round(a.getBoundingClientRect().height),
    w: Math.round(a.getBoundingClientRect().width),
  }))
);
console.log("CTAs (h×w):", JSON.stringify(ctaHeights));

// ---- Desktop 1440px ----
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: "qa-desktop-1440.png" });

await browser.close();
console.log("Screenshots salvos.");
