const fs = require("fs");
const path = require("path");

const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;

function parseEnv(file_path) {
  if (!fs.existsSync(file_path)) {
    throw new Error(`The file ${file_path} does not exist.`);
  }

  const env_file_content = fs.readFileSync(file_path, "utf-8");
  const env_variables = {};
  let match;

  while ((match = LINE.exec(env_file_content)) !== null) {
    const key = match[1].trim();
    let value = match[2] || '';
    value = value.trim();

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")) ||
        (value.startsWith('`') && value.endsWith('`'))) {
      value = value.slice(1, -1);
    }

    value = value.replace(/\\(['"`])/g, '$1');

    env_variables[key] = value;
  }

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
