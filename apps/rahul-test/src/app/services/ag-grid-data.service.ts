import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgGridDataService {
  constructor(private readonly httpClient: HttpClient) {}

  passTodoinfo(): Observable<Todo[]> {
    return this.httpClient
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos/')
  }
}
