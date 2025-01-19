import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridMultiComponent } from './ag-grid-multi.component';

describe('AgGridMultiComponent', () => {
  let component: AgGridMultiComponent;
  let fixture: ComponentFixture<AgGridMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridMultiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgGridMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
