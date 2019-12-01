import { TestBed } from '@angular/core/testing';

import { EmployesService } from './employes.service';

describe('EmployesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployesService = TestBed.get(EmployesService);
    expect(service).toBeTruthy();
  });
});
