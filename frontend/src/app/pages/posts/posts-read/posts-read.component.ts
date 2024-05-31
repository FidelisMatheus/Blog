import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../../core/service/post-service/post.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Post } from 'src/app/core/models/post';

@Component({
  selector: 'app-posts-read',
  standalone: true,
  imports: [CommonModule, MatCardModule],
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
