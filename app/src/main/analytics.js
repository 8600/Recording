import firstRun from 'first-run';
import Insight from 'insight';

import {get as getSetting} from '../common/settings-manager';

const pkg = require('../../package');

// Please don't use Wulkano Kap's Google Analytics tracking code.
// see: https://github.com/wulkano/kap/blob/master/app/src/main/analytics.js#L8
// const trackingCode = 'UA-84705099-2';

const insight = new Insight({trackingCode, pkg});

function init() {
  if (firstRun()) {
    insight.track('install');
  }

  if (firstRun({name: `${pkg.name}-${pkg.version}`})) {
    insight.track(`install/${pkg.version}`);
  }
}

function track(...paths) {
  console.log(getSetting('allowAnalytics'));
  if (getSetting('allowAnalytics') === true) {
    console.log('tracking');
    insight.track(...paths);
  }
}

exports.init = init;
exports.track = track;
