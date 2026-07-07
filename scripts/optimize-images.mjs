/**
 * Converte as imagens de public/images para WebP com dimensões máximas
 * adequadas ao layout (evita servir pixels que nunca são exibidos).
 *
 * Uso: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public", "images");

const jobs = [
  // Hero: exibida a no máx. 512px de largura (32rem) — 1024px cobre retina 2x
  {
    src: "dr-rodrigo-hero.png",
    out: "dr-rodrigo-hero.webp",
    width: 1024,
    quality: 82,
  },
  // Logo do rodapé: exibida a 150–180px — 400px cobre retina
  {
    src: "logo-faustino.png",
    out: "logo-faustino.webp",
    width: 400,
    quality: 90,
  },
  // Honrarias: cards de ~373px no desktop — 800px cobre retina 2x
  {
    src: "honrarias/Advogado Criminalista Referêcia no Estado de goias.jpg",
    out: "honrarias/referencia-direito-criminal-goias.webp",
    width: 800,
    quality: 78,
  },
  {
    src: "honrarias/Ex ministro da Justiça Dr. Jose  Euardo Cardoso.jpg",
    out: "honrarias/ex-ministro-jose-eduardo-cardozo.webp",
    width: 800,
    quality: 78,
  },
  {
    src: "honrarias/Homenagem Asembleia LEgislativa.jpg",
    out: "honrarias/homenagem-assembleia-legislativa.webp",
    width: 800,
    quality: 78,
  },
  {
    src: "honrarias/Homenagem Camara Municial.jpg",
    out: "honrarias/homenagem-camara-municipal.webp",
    width: 800,
    quality: 78,
  },
  {
    src: "honrarias/Ministro do Superior Tribunal de Justiça Rogério Schietti.jpg",
    out: "honrarias/ministro-stj-rogerio-schietti.webp",
    width: 800,
    quality: 78,
  },
  {
    src: "honrarias/Secretário Nacional de Justiça Dr. Augusto de Arruda.jpg",
    out: "honrarias/secretario-nacional-justica-augusto-arruda.webp",
    width: 800,
    quality: 78,
  },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

for (const { src, out, width, quality } of jobs) {
  const srcPath = path.join(ROOT, src);
  const outPath = path.join(ROOT, out);

  const before = (await stat(srcPath)).size;
  await sharp(srcPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outPath);
  const after = (await stat(outPath)).size;

  console.log(
    `${src} -> ${out}: ${kb(before)} -> ${kb(after)} (${Math.round(
      (1 - after / before) * 100
    )}% menor)`
  );
}

console.log("Concluído.");
