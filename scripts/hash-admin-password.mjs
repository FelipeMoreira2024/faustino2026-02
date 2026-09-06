import { randomBytes, scryptSync } from "node:crypto";
import process from "node:process";

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error("Uso: npm run ab:hash-password -- \"uma-senha-com-12-ou-mais-caracteres\"");
  process.exit(1);
}
const salt = randomBytes(16).toString("hex");
console.log(`${salt}:${scryptSync(password, salt, 64).toString("hex")}`);
