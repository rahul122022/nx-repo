import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgGridPocComponent } from '@rahul/ag-grid';

@Component({
  imports: [AgGridPocComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rahul-test';
}
