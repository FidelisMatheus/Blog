import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from '../../../core/service/post-service/post.service';
import { Post } from '../../../core/models/post';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit {
  postList: Post[] = [];

  postService: PostService = inject(PostService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe((posts) => {
      this.postList = posts;
    });
  }

  deletePost(id: number | undefined) {
    if (id != undefined) {
      this.postService.delete(id!).subscribe(() => {
        this.router
          .navigateByUrl('/posts', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/posts']);
          });
      });
    }
  }
}
