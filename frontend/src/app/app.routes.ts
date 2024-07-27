import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostsDataComponent } from './pages/posts/posts-data/posts-data.component';
import { PostsListComponent } from './pages/posts/posts-list/posts-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'posts',
    component: PostsListComponent,
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
