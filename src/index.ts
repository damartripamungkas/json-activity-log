import dayjs from "dayjs"
import { readFileSync } from "node:fs"
import { writeFile } from "node:fs/promises"

const getTimeNow = () => {
  return dayjs().format("YYYY-MM-DD HH:mm:ss:SSS")
}

const jsonParse = (data: any) => {
  try {
    return JSON.parse(data)
  } catch (_) {
    return {}
  }
}

const jsonActivityLog = <StepAllKey extends string>(pathFileSave: string, uniqueId: string, stepAllKey: StepAllKey[]) => {
  const stepStore: any = jsonParse(readFileSync(pathFileSave, { encoding: `utf8` }))
  stepStore[uniqueId] = stepAllKey.reduce((obj, key) => ({ ...obj, [key]: { result: {}, log: {} } }), {})

  const write = async () => {
    const jsonStr = JSON.stringify(stepStore, null, 2)
    await writeFile(pathFileSave, jsonStr, { encoding: `utf8` })
  }

  const writeLog = (stepKey: string, msg: string, level: string) => {
    stepStore[uniqueId][stepKey][`log`][`[${getTimeNow()}] [${level}]`] = msg
    return write()
  }

  const writeResult = (stepKey: string, valueObj: any) => {
    Object.assign(stepStore[uniqueId][stepKey][`result`], valueObj)
    return write()
  }

  const writeLogWarn = (stepKey: StepAllKey, msg: string) => writeLog(stepKey, msg, `WARN`)
  const writeLogInfo = (stepKey: StepAllKey, msg: string) => writeLog(stepKey, msg, `INFO`)
  const writeLogError = (stepKey: StepAllKey, msg: string) => writeLog(stepKey, msg, `ERROR`)
  const writeLogFatal = (stepKey: StepAllKey, msg: string) => writeLog(stepKey, msg, `FATAL`)
  const writeLogDebug = (stepKey: StepAllKey, msg: string) => writeLog(stepKey, msg, `DEBUG`)

  return {
    stepStore,
    writeResult,
    writeLogWarn,
    writeLogInfo,
    writeLogError,
    writeLogFatal,
    writeLogDebug
  }
}

export { jsonActivityLog }
export default jsonActivityLog
