import { TestBed } from '@angular/core/testing';

import { TestLoadingService } from './test-loading.service';

describe('TestLoadingService', () => {
  let service: TestLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
