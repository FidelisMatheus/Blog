import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../posts-data/posts-data.component';
import { PostService } from '../post-service/post.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

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
    this.postService.getPosts().subscribe((posts) => {
      this.postList = posts;
    });
  }
}
