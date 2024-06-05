# globalmove-env

`globalmove-env` is a versatile package designed to manage environment variables efficiently in Node.js applications. It facilitates the loading of environment variables from `.env` files directly into `process.env`, ensuring that your application can access all necessary configuration settings seamlessly.

## Features

- Easy to integrate with any Node.js project.
- Supports both CommonJS and ECMAScript Module (ESM) import styles.
- Lightweight with no external dependencies.

## Installation

```bash
npm install globalmove-env
```

```javascript
import { globalMoveEnv } from 'globalmove-env'

globalMoveEnv()
```

```javascript
const { globalMoveEnv } = require('globalmove-env')

globalMoveEnv()
```

## API

### `globalMoveEnv(filePath?)`

Loads environment variables from the specified `.env` file into `process.env`. If no file path is provided, it defaults to loading the `.env` file from the current working directory.

- `filePath` (optional): Path to your environment file. Defaults to `.env`.

## Examples

### Load custom `.env` file

You can specify a custom path to an environment file if it is not located in the root directory or named differently:
