import { TestBed } from '@angular/core/testing';

import { SnakeBarService } from './snake-bar.service';

describe('SnakeBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnakeBarService = TestBed.get(SnakeBarService);
    expect(service).toBeTruthy();
  });
});
