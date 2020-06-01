import { WebAPIService } from './web-api-service';
import { Router, RouterConfiguration } from 'aurelia-router';
import { inject, PLATFORM } from 'aurelia-framework';


@inject(WebAPIService)
export class App {
  router: Router;

  constructor(public api: WebAPIService) { }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Applicants';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('no-selection'), title: 'Select' },
      { route: 'contacts/:id', moduleId: PLATFORM.moduleName('contact-detail'), name: 'contacts' },
      { route: 'cxx', moduleId: PLATFORM.moduleName('applicant-form'), name: 'contacts' }

    ]);

    this.router = router;
  }
}

