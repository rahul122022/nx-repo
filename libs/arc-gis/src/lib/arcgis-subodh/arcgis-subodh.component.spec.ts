import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcgisSubodhComponent } from './arcgis-subodh.component';

describe('ArcgisSubodhComponent', () => {
  let component: ArcgisSubodhComponent;
  let fixture: ComponentFixture<ArcgisSubodhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcgisSubodhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcgisSubodhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
