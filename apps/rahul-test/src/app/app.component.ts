import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgGridMultiComponent, AgGridPocComponent } from '@rahul/ag-grid';
import { ArcGisPocComponent } from '@rahul/arc-gis';
import { AngularSplitModule } from 'angular-split';
import { AgGridDataService } from './services';
import { Todo, User } from './models';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PetService } from '@rahul/pet-api';

@Component({
  imports: [
    AgGridPocComponent,
    ArcGisPocComponent,
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

  constructor(private readonly agGridDataService: AgGridDataService, private readonly petService: PetService) {
    this.agTodoInfo$ = this.agGridDataService.passTodoinfo();
    this.agUsersInfo$ = this.agGridDataService.passUsersInfo();
    this.agMultiInfo$ = this.agGridDataService.passMergedinfo();

    this.petService.getPetById(1).pipe(tap(console.log)).subscribe();
    // this.petService.findPetsByTags(['']).pipe(tap(console.log)).subscribe();
  }
}
