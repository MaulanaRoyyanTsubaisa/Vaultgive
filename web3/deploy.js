require("dotenv").config();
const { execSync } = require("child_process");

const key = process.env.THIRDWEB_SECRET_KEY;

if (!key) {
  console.error("THIRDWEB_SECRET_KEY is not set");
  process.exit(1);
}

execSync(`npx thirdweb@latest deploy -k ${key}`, { stdio: "inherit" });
