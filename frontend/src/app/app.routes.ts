import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostsDataComponent } from './pages/posts/posts-data/posts-data.component';
import { PostsListComponent } from './pages/posts/posts-list/posts-list.component';
import { PostsReadComponent } from './pages/posts/posts-read/posts-read.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'posts',
    component: PostsListComponent,
    title: 'List Posts',
  },
  {
    path: 'posts/data',
    component: PostsDataComponent,
    title: 'Add Post',
  },
  {
    path: 'posts/data/:id',
    component: PostsDataComponent,
    title: 'Edit Post',
  },
  {
    path: 'posts/read/:id',
    component: PostsReadComponent,
    title: 'Read Post',
  },
];
