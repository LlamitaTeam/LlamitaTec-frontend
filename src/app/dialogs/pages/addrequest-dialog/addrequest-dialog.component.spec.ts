import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrequestDialogComponent } from './addrequest-dialog.component';

describe('AddrequestDialogComponent', () => {
  let component: AddrequestDialogComponent;
  let fixture: ComponentFixture<AddrequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
