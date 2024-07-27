import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Post } from 'src/app/core/models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.POST_URL);
  }

  getById(id: string): Observable<Post> {
    const url = `${environment.POST_BY_ID_URL}/${id}`;
    return this.http.get<Post>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  create(post: Post): Observable<Post> {
    debugger;
    return this.http.post<Post>(environment.POST_URL, post).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(id: any, post: Post): Observable<Post> {
    const url = `${environment.POST_BY_ID_URL}/${id}`;
    return this.http.put<Post>(url, post).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: any): Observable<Post> {
    const url = `${environment.POST_BY_ID_URL}/${id}`;
    return this.http.delete<Post>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    return EMPTY;
  }
}
