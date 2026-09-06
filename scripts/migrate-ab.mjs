import { readFile, readdir } from "node:fs/promises";
import process from "node:process";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) {
  console.error("DATABASE_URL ou POSTGRES_URL não está configurada.");
  process.exit(1);
}

const sql = postgres(connectionString, { max: 1 });
try {
  const directory = new URL("../db/", import.meta.url);
  const files = (await readdir(directory)).filter((file) => /^\d+.*\.sql$/.test(file)).sort();
  for (const file of files) {
    await sql.unsafe(await readFile(new URL(file, directory), "utf8"));
    console.log(`Migração aplicada: ${file}`);
  }
} finally {
  await sql.end();
}
