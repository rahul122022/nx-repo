import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridPocComponent } from './ag-grid-poc.component';

describe('AgGridPocComponent', () => {
  let component: AgGridPocComponent;
  let fixture: ComponentFixture<AgGridPocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridPocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgGridPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
