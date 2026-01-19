// get_hash.mjs
import { Scrypt } from 'oslo/password';

const hasher = new Scrypt();

async function main() {
  const password = "123"; // 你想要的密码
  const hash = await hasher.hash(password);
  console.log("\n✅ 复制下面的字符串到 SQL 中:\n");
  console.log(hash);
  console.log("\n");
}

main();