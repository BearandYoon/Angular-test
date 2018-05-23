import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from './../interfaces/user';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUserList() {
    return this.http.get('/assets/data/mock-data.json');
  }
}
