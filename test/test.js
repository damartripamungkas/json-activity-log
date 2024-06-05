const { join } = require("node:path")
const { jsonActivityLog } = require("..")

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
