import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArcGisPocComponent } from './arc-gis-poc.component';

describe('ArcGisPocComponent', () => {
  let component: ArcGisPocComponent;
  let fixture: ComponentFixture<ArcGisPocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcGisPocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArcGisPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
