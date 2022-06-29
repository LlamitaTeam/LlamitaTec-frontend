import { TestBed } from '@angular/core/testing';

import { ConfigureregisterService } from './configureregister.service';

describe('ConfigureregisterService', () => {
  let service: ConfigureregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigureregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
