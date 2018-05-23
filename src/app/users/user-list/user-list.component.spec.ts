import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './../services/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';

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

describe('UserListComponent', () => {
  let component: UserListComponent;
  let userService: UserService;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ UserListComponent ],
      providers: [
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.get(UserService);
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    spyOn(userService, 'getUserList').and.returnValue(Observable.of(users));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on loading 2 test users should be fetched and displayed on the page, first cell is Izak', async(() => {
    component.ngOnInit();
    fixture.whenStable().then(e => {
      const rows = fixture.debugElement.queryAll(By.css('.table-row'));
      const firstUserName = rows[0].children[0].nativeElement.innerHTML;
      expect(rows.length).toEqual(2);
      expect(firstUserName).toEqual('Izak');
    });
  }));
});
