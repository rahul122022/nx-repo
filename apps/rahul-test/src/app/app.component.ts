import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgGridMultiComponent, AgGridPocComponent } from '@rahul/ag-grid';
import { AngularSplitModule } from 'angular-split';
import { AgGridDataService } from './services';
import { Todo, User } from './models';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { D3LineChartComponent } from '@rahul/charts';

@Component({
  imports: [
    AgGridPocComponent,
    D3LineChartComponent,
    RouterModule,
    AngularSplitModule,
    CommonModule,
    AgGridMultiComponent
],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rahul-test';
  agTodoInfo$: Observable<Todo[]>;
  agUsersInfo$: Observable<User[]>;
  agMultiInfo$: any;

  constructor(private readonly agGridDataService: AgGridDataService) {
    this.agTodoInfo$ = this.agGridDataService.passTodoinfo();
    this.agUsersInfo$ = this.agGridDataService.passUsersInfo();
    this.agMultiInfo$ = this.agGridDataService.passMergedinfo();
  }
}
