import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostsDataComponent } from './pages/posts/posts-data/posts-data.component';
import { PostsReadComponent } from './pages/posts/posts-read/posts-read.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'posts',
    component: PostsReadComponent,
    title: 'Add Posts',
  },
  {
    path: 'posts/data',
    component: PostsDataComponent,
    title: 'Add Posts',
  },
  {
    path: 'posts/data/:id',
    component: PostsDataComponent,
    title: 'Add Posts',
  },
];
