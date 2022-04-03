import { TestBed } from '@angular/core/testing';

import { Category.Service.TsService } from './category.service.ts.service';

describe('Category.Service.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Category.Service.TsService = TestBed.get(Category.Service.TsService);
    expect(service).toBeTruthy();
  });
});
