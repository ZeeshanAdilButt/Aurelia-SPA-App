import { Applicant } from './../Types/Applicant';
import { constants } from './../common/constants';
import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

//DI
@inject(HttpClient, constants)
export class ApplicantService {
  http: any;

  constructor(http: HttpClient) {
    //Configure basw URL

    // Set http property
    this.http = http;
  }

  put(applicant: Applicant) {

    const options = {
      method: 'PUT',
      headers: this.setHeaders(),
      body: json(applicant)
    };
    return this.http.fetch(`https://localhost:44384/api/v1/`, options)
      .then(status)
      .catch(this.parseError)

  }

  post(applicant: any) {
    // Return a promise which when resolved will respond with recent posts
    const options = {
      method: 'POST',
      headers: this.setHeaders(),
      body: json(applicant)
    };

    return this.http.fetch(`https://localhost:44384/api/v1/applicants`, options)
      .then(status)
      .catch(this.parseError)
  }

  setHeaders() {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // if (this.jwtService.getToken()) {
    //   headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
    // }
    return new Headers(headersConfig);
  }

  parseError(error) {
    if (!(error instanceof Error))
      return new Promise((resolve, reject) => reject(error.json()))
  }


}
