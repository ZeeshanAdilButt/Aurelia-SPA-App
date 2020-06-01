import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';

export class Applicant {

  // static inject() { return [Validation]; }
  // ValidationRules
  // .ensure('firstName');

  // @this.ensure(applicantValidation.firstName)
  Name: string;
  FamilyName: string;
  Address: string;
  CountryOfOrigin: string;
  EmailAddress: string;
  Age: number;
  Hired: boolean;

  constructor() {
    // this.validation = validation.on(this);
    this.Name = "";
    this.FamilyName = "";
    this.Address = "";
    this.CountryOfOrigin = "";
    this.EmailAddress = "";
    this.Age = 0;
    this.Hired = false;
  }
}
