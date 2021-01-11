const log4js = require('log4js');
const path = require('path');
const moment = require('moment');

const fileName = moment().format('YYYY-MM-DD');
let filePath = path.join(__dirname, `../storage/logs/${fileName}.log`);
log4js.configure({
  appenders: {
    console: { type: 'stdout', layout: { type: 'colored' } },
    dateFile: {
      container: 'logs',
      type: 'file',
      filename: filePath,
      layout: {
        type: 'basic',
      },
    },
  },
  categories: { default: { appenders: ['console', 'dateFile'], level: 'all' } },
});
module.exports = log4js;
