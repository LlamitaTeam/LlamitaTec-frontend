import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmployeeUserComponent } from './profile-employee-user.component';

describe('ProfileEmployeeUserComponent', () => {
  let component: ProfileEmployeeUserComponent;
  let fixture: ComponentFixture<ProfileEmployeeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEmployeeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEmployeeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
