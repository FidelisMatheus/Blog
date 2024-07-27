import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { PostService } from '../../../core/service/post-service/post.service';
import { Post } from './../../../core/models/post';

@Component({
  selector: 'app-posts-read',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './posts-read.component.html',
  styleUrl: './posts-read.component.scss',
})
export class PostsReadComponent implements OnInit {
  postList: Post[] = [];

  postService: PostService = inject(PostService);

  ngOnInit(): void {
    this.postService.getAll().subscribe((posts) => {
      this.postList = posts;
    });
  }
}
