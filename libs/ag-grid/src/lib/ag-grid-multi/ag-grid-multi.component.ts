import { Component, input } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  MasterDetailModule,
  ModuleRegistry,
  PaginationModule,
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
  selector: 'lib-ag-grid-multi',
  imports: [AgGridModule],
  templateUrl: './ag-grid-multi.component.html',
  styleUrl: './ag-grid-multi.component.scss',
})
export class AgGridMultiComponent {
  userInfo = input<any>();
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
