import { TestBed } from '@angular/core/testing';

import { IncomeDebtService } from './income-debt.service';

describe('IncomeDebtService', () => {
  let service: IncomeDebtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeDebtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
