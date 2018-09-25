import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
const AWS = require('aws-sdk');

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private lambda;
  public subject = new Subject<any>();

  constructor() {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-central-1:0e9ef61e-e9e9-4f61-9863-caa0ac610ff4',
      Logins: { /* optional tokens, used for authenticated login */ }
    });
    AWS.config.update({region: 'eu-central-1'})
    this.lambda = new AWS.Lambda({region: 'eu-central-1', apiVersion: '2018-09-18'});
  }

  private lambdaMagic = function() {
    const context = this;
    const pullParams = {
      FunctionName : 'ProductListDummy',
      Payload: JSON.stringify({var1: 'woopwoop'})
    };
    this.lambda.invoke(pullParams, function(error, data) {
      if (!error) {
        this.pullResults = JSON.parse(data.Payload);
        context.subject.next(this.pullResults.products);
      }
    });
  };

  getProducts(): Observable<any> {
    this.lambdaMagic();
    return this.subject.asObservable();
  }

}
