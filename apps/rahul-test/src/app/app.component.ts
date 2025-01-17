import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgGridPocComponent } from '@rahul/ag-grid';
import { ArcGisPocComponent } from '@rahul/arc-gis';
import { AngularSplitModule } from 'angular-split';

@Component({
  imports: [
    AgGridPocComponent,
    ArcGisPocComponent,
    RouterModule,
    AngularSplitModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rahul-test';
}
