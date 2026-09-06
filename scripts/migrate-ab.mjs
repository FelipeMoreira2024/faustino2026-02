import { readFile } from "node:fs/promises";
import process from "node:process";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) {
  console.error("DATABASE_URL ou POSTGRES_URL não está configurada.");
  process.exit(1);
}

const migration = await readFile(new URL("../db/001_ab_testing.sql", import.meta.url), "utf8");
const sql = postgres(connectionString, { max: 1 });
try {
  await sql.unsafe(migration);
  console.log("Migração do sistema A/B concluída.");
} finally {
  await sql.end();
}
