import { TestBed } from '@angular/core/testing';

import { ManageToolbarService } from './manage-toolbar.service';

describe('ManageToolbarService', () => {
  let service: ManageToolbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageToolbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
