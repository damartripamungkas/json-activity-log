<h1 align="center">
    JSON-ACTIVITY-LOG
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/damartripamungkas/json-activity-log?color=04D361&labelColor=000000">
  
  <a href="#">
    <img alt="Made by" src="https://img.shields.io/static/v1?label=made%20by&message=damartripamungkas&color=04D361&labelColor=000000">
  </a>
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/damartripamungkas/json-activity-log?color=04D361&labelColor=000000">
  
  <a href="#">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/damartripamungkas/json-activity-log?color=04D361&labelColor=000000">
  </a>
</p>

### 📖 Description :

This package was created for those of you who want a combination of logging and results in JSON style and will be written to a file.

### 💻 Step to install :

```
npm install json-activity-log
```

### ✏️ Example :

see full [here](./test/test.js)

`code javascript`

```javascript
const { join } = require("node:path")
const { jsonActivityLog } = require("json-activity-log")

const test1 = async () => {
  const stepAllKey = [`[1] setup_code_expressjs", "[2] end`]
  const [step1, step2] = stepAllKey
  const pathFileSave = join(__dirname, `test.json`)

  const init = jsonActivityLog(pathFileSave, `run_web_server`, stepAllKey, true)
  await init.writeLogInfo(step1, `write simple code webserver`)
  await init.writeResult(step1, { host: `localhost`, port: "3000" })
  await init.writeResult(step2, { status: `success` })
}

const test2 = async () => {
  const stepAllKey = [`[1] init_telegraf_constructor`, `[2] end`]
  const [step1, step2] = stepAllKey
  const pathFileSave = join(__dirname, `test.json`)

  const init = jsonActivityLog(pathFileSave, `run_telegram_bot`, stepAllKey, true)
  await init.writeLogInfo(step1, `write simple code telegraf initialized`)
  await init.writeResult(step1, { status: `success` })
  await init.writeResult(step2, { status: `success` })
}

const run = async () => {
  await test1()
  await test2()
}

run()
```

`result in json file`

```json
{
  "run_web_server": {
    "[1] setup_code_expressjs": {
      "result": {
        "host": "localhost",
        "port": "3000"
      },
      "log": {
        "[2024-06-05 23:40:42:513] [INFO]": "write simple code webserver"
      }
    },
    "[2] end": {
      "result": {
        "status": "success"
      },
      "log": {}
    }
  },
  "run_telegram_bot": {
    "[1] init_telegraf_constructor": {
      "result": {
        "status": "success"
      },
      "log": {
        "[2024-06-05 23:40:42:537] [INFO]": "write simple code telegraf initialized"
      }
    },
    "[2] end": {
      "result": {
        "status": "success"
      },
      "log": {}
    }
  }
}
```

### 🧾 Pre-Requisistes :

```
node.js
```

### 📝 License :

Licensed under the [MIT License](./LICENSE).
