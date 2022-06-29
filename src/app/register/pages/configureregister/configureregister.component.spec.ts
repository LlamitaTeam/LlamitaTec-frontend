import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureregisterComponent } from './configureregister.component';

describe('ConfigureregisterComponent', () => {
  let component: ConfigureregisterComponent;
  let fixture: ComponentFixture<ConfigureregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
