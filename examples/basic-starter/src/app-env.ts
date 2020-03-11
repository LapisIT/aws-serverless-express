/**
 * Created by hxg on 9/10/17.
 */
import traverse = require('traverse');
import { createLog } from './logs/logging';
const log = createLog(__filename);

const initApiVersion = () => {
  const version = require('../package.json').version;

  process.env.API_VERSION = version;

  log.debug('initApiVersion API_VERSION: %s', version);
};

class AppEnv {
  init () {
    initApiVersion();
  }
}
const env = new AppEnv();
export default env;
