import isDev from 'electron-is-dev';

let ravenClient;

function init() {
  if (!isDev) {
    const raven = require('raven');

    // Please don't use Wulkano Kap's Raven tracking code.
    // see: https://github.com/wulkano/kap/blob/master/app/src/common/reporter.js#L9
    // ravenClient = new raven.Client('https://dde0663d852241628dca445a0b28d3f1:354142c4b46c4894b3ba876ce803bb6f@sentry.io/101586');
    ravenClient.patchGlobal();
  }
}

function report(err) {
  if (!isDev && err) {
    ravenClient.captureException(err);
  }
}

exports.init = init;
exports.report = report;
