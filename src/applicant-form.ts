// import { applicant } from './Types/applicant-validation';
import { bootstrap } from 'aurelia-bootstrapper';
import { ApplicantService } from './services/applicant-service';
import { Router, RouterConfiguration } from 'aurelia-router';
import { inject, PLATFORM, ObserverLocator } from 'aurelia-framework';
// import { ensure } from 'aurelia-validation';
// import { ensure } from 'aurelia-validation';
import { Applicant } from './Types/Applicant'
import { ValidationControllerFactory, ValidationController, ValidationRules, Validator, validateTrigger } from 'aurelia-validation';
import { BootstrapFormRenderer } from './resources/bootstrap-form-renderer';

@inject(ApplicantService, ValidationControllerFactory, ValidationRules, Validator, ObserverLocator)
export class applicantForm {

  // Name: string;
  // FamilyName: string;
  // Address: string;
  // CountryOfOrigin: string;
  // EmailAddress: string;
  // Age: number;
  // Hired: boolean;


  applicant: Applicant;


  controller: ValidationController = null;
  validationRules: ValidationRules;
  validator: Validator;
  canSave: boolean;
  ol: ObserverLocator;

  // canSave: boolean;

  constructor(private api: ApplicantService, controllerFactory: ValidationControllerFactory,
    validationRules: ValidationRules, validator: Validator, ol: ObserverLocator) {

    this.applicant = new Applicant();
    this.applicant.Name = "";
    this.applicant.FamilyName = "";
    this.applicant.Address = "";
    this.applicant.CountryOfOrigin = "";
    this.applicant.EmailAddress = "";
    this.applicant.Age = 0;
    this.applicant.Hired = false;


    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.ol = ol;

    this.validator = validator;
    this.canSave = false;


    // this.validationRules = validationRules.initialize('', '');

    ValidationRules
      .ensure('Name').required().minLength(5).withMessage('Name must at least be 5 chars long.')
      .ensure('FamilyName').required().minLength(5).withMessage('Family Name must at least be 5 chars long.')
      .ensure('Address').required().minLength(10).withMessage('Address Name must at least be 10 chars long.')
      .ensure('CountryOfOrigin').required()
      .ensure('EmailAddress').required().email()
      .ensure('Age').required().min(18)
      .ensure('Hired').required()
      .on(this.applicant);

    // ValidationRules
    //   .ensure('FamilyName').required().minLength(5).withMessage('Family Name must at least be 5 chars long.')
    //   .on(this.applicant);

    // ValidationRules
    //   .ensure('Address').required().minLength(10).withMessage('Address Name must at least be 10 chars long.')
    //   .on(this.applicant);

    // ValidationRules
    //   .ensure('CountryOfOrigin').required()
    //   .on(this.applicant);


    // ValidationRules
    //   .ensure('EmailAddress').required()
    //   .email()
    //   .on(this.applicant);


    // ValidationRules
    //   .ensure('Age').required()
    //   .on(this.applicant);


    // ValidationRules
    //   .ensure('Hired').required()
    //   .on(this.applicant);

    this.controller.validateTrigger = validateTrigger.changeOrBlur;
    this.controller.subscribe(event => this.validateWhole());


    ol.getObserver(this.applicant, 'Name').subscribe(() => {
      this.validate();
    });

  }

  attached() {
    this.validate();
  }

  private validateWhole() {
    this.validator.validateObject(this.applicant.Name)
      .then(results => this.canSave = results.every(result => result.valid));
  }

  validate() {
    this.validator.validateObject(this.applicant).then(results => {
      let valid = true;

      // results is an array of validation results. Each result has a
      // valid property set to true if the rule is valid.
      for (let result of results) {
        valid = valid && result.valid;
      }

      this.canSave = valid;
    });
  }

  // ValidationRules
  // .EnsureObject(a => a.firstName).required()
  // .ensure(a => a.lastName).required()
  // .ensure(a => a.email).required().email()
  // .on(applicantForm);

  // get canSave() {

  //   return true;
  //   // return this.Name.length > 5 && this.FamilyName.length > 5; //&& !this.EmailAddress.isRequesting;
  // }

  get canReset() {

    return this.applicant.Name.length > 0 || this.applicant.FamilyName.length > 0
      || this.applicant.Address.length > 0 || this.applicant.CountryOfOrigin.length > 0 || this.applicant.EmailAddress.length > 0 || this.applicant.Age > 0 || this.applicant.Hired != false;
  }

  save() {

    this.validate();

    if (!this.canSave)
      return;

    console.log(this.applicant.Name);
    console.log(this.applicant.FamilyName);
    console.log(this.applicant.Address);
    console.log(this.applicant.CountryOfOrigin);
    console.log(this.applicant.EmailAddress);
    console.log(+this.applicant.Age);
    console.log(this.applicant.Hired);

    // let applicant = new Applicant();

    // applicant.Name = this.applicant.Name;
    // applicant.FamilyName = this.applicant.FamilyName;
    // applicant.Address = this.applicant.Address;
    // applicant.CountryOfOrigin = this.applicant.CountryOfOrigin;
    // applicant.EmailAddress = this.applicant.EmailAddress;
    // applicant.Age = +this.applicant.Age;
    // applicant.Hired = this.applicant.Hired;

    var result = this.api.post(this.applicant);
    console.log(result);

    this.reset();
  }

  reset() {
    this.applicant.Name = "";
    this.applicant.FamilyName = "";
    this.applicant.Address = "";
    this.applicant.CountryOfOrigin = "";
    this.applicant.EmailAddress = "";
    this.applicant.Age = 0;
    this.applicant.Hired = false;
  }



}

