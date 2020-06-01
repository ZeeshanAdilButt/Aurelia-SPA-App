import { Aurelia } from 'aurelia-framework';
import * as environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';
// import { aurelia-validation} from 'aurelia-validation';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';


export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  // aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
  // aurelia.use.plugin(PLATFORM.moduleName('aurel.ia-validation'));

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
