import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../posts-data/posts-data.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.URL_POSTS);
  }
}
