const log4js = require("log4js");
const { LOG_FILE_PATH } = require("../config/globals");

log4js.configure({
  appenders: {
    myLog: { type: "console" },
    myLogFile: { type: "file", filename: LOG_FILE_PATH },
  },
  categories: {
    default: { appenders: ["myLog"], level: "info" },
    file: { appenders: ["myLogFile"], level: "error" },
  },
});

module.exports = log4js;
