import { TestBed } from '@angular/core/testing';

import { ChangeviewService } from './changeview.service';

describe('ChangeviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeviewService = TestBed.get(ChangeviewService);
    expect(service).toBeTruthy();
  });
});
