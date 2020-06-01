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
  Name: string;
  FamilyName: string;
  Address: string;
  CountryOfOrigin: string;
  EmailAddress: string;
  Age: number;
  Hired: boolean;
  controller: ValidationController = null;
  validationRules: ValidationRules;
  validator: Validator;
  canSave: boolean;
  ol: ObserverLocator;

  // canSave: boolean;

  constructor(private api: ApplicantService, controllerFactory: ValidationControllerFactory,
    validationRules: ValidationRules, validator: Validator, ol: ObserverLocator) {

    this.Name = "";
    this.FamilyName = "";
    this.Address = "";
    this.CountryOfOrigin = "";
    this.EmailAddress = "";
    this.Age = 0;
    this.Hired = false;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.ol = ol;

    this.validator = validator;
    this.canSave = false;


    // this.validationRules = validationRules.initialize('', '');

    ValidationRules
      .ensure('Name').minLength(3).withMessage('Title must at least be 3 chars long.')
      .on(this);

    ValidationRules
      .ensure('FamilyName').required()
      .on(this);

    ValidationRules
      .ensure('Address').required()
      .on(this);

    ValidationRules
      .ensure('CountryOfOrigin').required()
      .on(this);


    ValidationRules
      .ensure('EmailAddress').required()
      .email()
      .on(this);


    ValidationRules
      .ensure('Age').required()
      .on(this);


    ValidationRules
      .ensure('Hired').required()
      .on(this);

    this.controller.validateTrigger = validateTrigger.changeOrBlur;


    ol.getObserver(this.Name, 'Name').subscribe(() => {
      this.validate();
    });

  }

  attached() {
    this.validate();
  }

  validate() {
    this.validator.validateObject(this.Name).then(results => {
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

    return this.Name.length > 0 || this.FamilyName.length > 0
      || this.Address.length > 0 || this.CountryOfOrigin.length > 0 || this.EmailAddress.length > 0 || this.Age > 0 || this.Hired != false;
  }

  save() {

    console.log(this.Name);
    console.log(this.FamilyName);
    console.log(this.Address);
    console.log(this.CountryOfOrigin);
    console.log(this.EmailAddress);
    console.log(+this.Age);
    console.log(this.Hired);

    let applicant = new Applicant();

    applicant.Name = this.Name;
    applicant.FamilyName = this.FamilyName;
    applicant.Address = this.Address;
    applicant.CountryOfOrigin = this.CountryOfOrigin;
    applicant.EmailAddress = this.EmailAddress;
    applicant.Age = +this.Age;
    applicant.Hired = this.Hired;

    var result = this.api.post(applicant);
    console.log(result);

    this.reset();
  }

  reset() {
    this.Name = "";
    this.FamilyName = "";
    this.Address = "";
    this.CountryOfOrigin = "";
    this.EmailAddress = "";
    this.Age = 0;
    this.Hired = false;
  }



}

