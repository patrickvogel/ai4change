import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
const AWS = require('aws-sdk');

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private lambda;
  public subject = new Subject<any>();

  constructor() {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-central-1:0e9ef61e-e9e9-4f61-9863-caa0ac610ff4',
      Logins: { /* optional tokens, used for authenticated login */ }
    });
    AWS.config.update({region: 'eu-central-1'});
    this.lambda = new AWS.Lambda({region: 'eu-central-1', apiVersion: '2018-09-18'});
  }

  formatDate(date) {
    const d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
}

  private lambdaMagic = function(data) {
    const context = this;
    const pullParams = {
      FunctionName : 'invokeSagemakerEndpoint',
      Payload: JSON.stringify({
        instances: data
      })
    };
    this.lambda.invoke(pullParams, function(error, data) {
      if (!error) {
        this.pullResults = JSON.parse(data.Payload);
        context.subject.next(this.pullResults);
      }
    });
  };

  getForecast(products): Observable<any> {
    const data = [];

    for(const product of products){
      data.push({
        start: this.formatDate(product.date),
        target: product.amounts
      });
    }

    this.lambdaMagic(data);
    return this.subject.asObservable();
  }
}
