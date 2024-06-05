const fs = require("fs");
const path = require("path");

function parseEnv(file_path) {
  const env_file_content = fs.readFileSync(file_path, "utf-8");
  const env_variables = {};

  if (!fs.existsSync(file_path)) {
    throw new Error(`The file ${file_path} does not exist.`);
  }

  env_file_content.split("\n").forEach((line) => {
    const [key, value] = line.split("=");

    if (key && value) {
      env_variables[key.trim()] = value.trim();
    }
  });

  return env_variables;
}

function globalMoveEnv(file_path = ".env") {
  const full_path = path.resolve(process.cwd(), file_path);
  const env_variables = parseEnv(full_path);

  Object.keys(env_variables).forEach((key) => {
    if (!process.env[key]) {
      process.env[key] = env_variables[key];
    }
  });
}

exports.globalMoveEnv = globalMoveEnv;
