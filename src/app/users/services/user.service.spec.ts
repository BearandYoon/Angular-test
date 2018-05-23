import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';

const users =  [
  {
    'firstName': 'Izak',
    'lastName': 'Ellis',
    'city': 'Carlisle',
    'country': 'United Kingdom'
  },
  {
    'firstName': 'Darren',
    'lastName': 'Friar',
    'city': 'Birmingham',
    'country': 'United Kingdom'
  }
];

export class MockHttpClient {
  get(url) {
    return Observable.of(users);
  }
}

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UserService,
        {provide: HttpClient, useClass: MockHttpClient}
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('get user api should get user list as observable array, and first users name should be Izak',
  inject([UserService], (service: UserService) => {
    service.getUserList().subscribe((res: Array<any>) => {
      expect(res.length).toEqual(2);
      expect(res[0].firstName).toEqual('Izak');
    });
  }));
});
