import { TestBed } from '@angular/core/testing';

import { PurgeServicesService } from './purge-services.service';

describe('PurgeServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurgeServicesService = TestBed.get(PurgeServicesService);
    expect(service).toBeTruthy();
  });
});
