import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { Todo, User, Comment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AgGridDataService {
  constructor(private readonly httpClient: HttpClient) {}

  passTodoinfo(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos/'
    );
  }

  passUsersInfo(): Observable<User[]> {
    return this.httpClient.get<User[]>('https://jsonplaceholder.org/users');
  }

  passCommentsInfo(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>('https://jsonplaceholder.org/posts');
  }

  passMergedinfo(): Observable<User & { comments: Comment[] }>[] {
    return combineLatest([this.passUsersInfo(), this.passCommentsInfo()]).pipe(
      map(([users, comments]) =>
        users.map((user) => ({
          ...user,
          comments: comments.filter((comment) => comment.userId === user.id),
        }))
      ),
      // tap(console.log)
    ) as unknown as Observable<User & { comments: Comment[] }>[];
  }
}
