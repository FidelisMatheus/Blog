import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/core/models/post';
import { PostService } from 'src/app/core/service/post-service/post.service';

@Component({
  selector: 'app-posts-read',
  standalone: true,
  imports: [],
  templateUrl: './posts-read.component.html',
  styleUrl: './posts-read.component.scss',
})
export class PostsReadComponent {
  post!: Post;
  content: any = '';

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      const id = this.route.snapshot.paramMap.get('id');

      this.postService.getById(id!).subscribe((post) => {
        this.post = post;
        this.content = this.sanitizer.bypassSecurityTrustHtml(post.content);
      });
    }
  }
}
