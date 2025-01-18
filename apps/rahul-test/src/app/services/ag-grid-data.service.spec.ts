import { TestBed } from '@angular/core/testing';

import { AgGridDataService } from './ag-grid-data.service';

describe('AgGridDataService', () => {
  let service: AgGridDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgGridDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
