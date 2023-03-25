import { TestBed } from '@angular/core/testing';

import { RxdbProvider } from './rxdb-provider.service';

describe('RxdbProviderServiceTsService', () => {
  let service: RxdbProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxdbProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
