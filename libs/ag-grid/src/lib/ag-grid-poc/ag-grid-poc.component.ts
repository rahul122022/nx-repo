import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import {
  AllCommunityModule, ModuleRegistry, PaginationModule, type ColDef
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule, PaginationModule]);

@Component({
  selector: 'lib-ag-grid-poc',
  imports: [CommonModule, AgGridAngular],
  templateUrl: './ag-grid-poc.component.html',
  styleUrl: './ag-grid-poc.component.scss',
})
export class AgGridPocComponent {
  todoInfo = input<any>();

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'userId', headerName: 'User', minWidth: 40, sort: 'asc' },
    { field: 'title', headerName: 'Todo Title', minWidth: 180 },
    { field: 'id', headerName: 'Todo Id', minWidth: 40 },
    { field: 'completed', headerName: 'Todo Status', minWidth: 40 },
  ];

  defaultColDef: ColDef = {
    filter: true,
    
  };
}
