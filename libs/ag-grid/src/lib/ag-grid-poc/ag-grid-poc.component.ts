import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import {
  AllCommunityModule,
  IDetailCellRendererParams,
  ModuleRegistry,
  PaginationModule,
  type ColDef,
} from 'ag-grid-community';
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  MasterDetailModule,
} from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  AllCommunityModule,
  PaginationModule,
  MasterDetailModule,
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
]);

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
    { field: 'userId', hide: true, sort: 'asc' },
    {
      field: 'firstname',
      headerName: 'First Name',
      minWidth: 100,
      cellRenderer: 'agGroupCellRenderer',
    },
    { field: 'lastname', headerName: 'Last Name', minWidth: 100 },
    { field: 'email', headerName: 'Email', minWidth: 120 },
    { field: 'login.username', headerName: 'User Name', minWidth: 40 },
    {
      field: 'address',
      headerName: 'Address',
      valueFormatter: ({
        data: {
          address: { suite, street, city, zipcode },
        },
      }) => `${suite}, ${street}, ${city}, ${zipcode}`,
    },
  ];

  defaultColDef: ColDef = {
    filter: true,
  };
  constructor() {
    console.log(this.todoInfo());
  }

  groupDefaultExpanded = 0;

  detailCellRendererParams: any = {
    detailGridOptions: {
      columnDefs: [
        { field: 'title', headerName: 'Title' },
        { field: 'content', headerName: 'Content' },
        { field: 'image', headerName: 'Image' },
        { field: 'status', headerName: 'Status' },
      ],
      defaultColDef: {
        flex: 1,
      },

      detailRowHeight: 240,
    },
    getDetailRowData: (params: any) => {
      console.log('getDetailRowData', params);
      params.successCallback(params.data.comments);
    },
  };
}
