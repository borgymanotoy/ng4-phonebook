import { Injectable } from '@angular/core';

@Injectable()

export class DataService {

  constructor() { }

  cars = [ 'Ford', 'Toyata', 'Honda', 'Mitsubishi' ];

  myData() {
    return 'This is my data!';
  }
}
