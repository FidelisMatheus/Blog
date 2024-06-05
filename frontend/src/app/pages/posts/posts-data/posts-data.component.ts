import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Importar o FormsModule
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Post } from 'src/app/core/models/post';
import { PostService } from 'src/app/core/service/post-service/post.service';

@Component({
  selector: 'app-posts-data',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './posts-data.component.html',
  styleUrl: './posts-data.component.scss',
})
export class PostsDataComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    date: new FormControl(''),
    theme: new FormControl(''),
    summary: new FormControl(''),
    author: new FormControl(''),
  });

  submitted = false;
  title!: string;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ['', Validators.required],
      date: ['', Validators.required],
      summary: ['', Validators.required],
      theme: ['', Validators.required],
    });

    if (this.route.snapshot.paramMap.get('id')) {
      this.title = 'Editar Post';

      const id = this.route.snapshot.paramMap.get('id');
      // this.customerService.readById(id!).subscribe((customer) => {
      //   this.customer = customer;
      // });
    } else {
      this.title = 'Novo Post';
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = !this.submitted;

    const formValues = this.form.value;

    debugger;

    const newPost: Post = {
      title: formValues.title!,
      content: formValues.content!,
      date: formValues.date!,
      subject: formValues.theme!,
      summary: formValues.summary!,
      author: formValues.author!,
    };

    if (this.form.invalid) {
      return;
    }

    this.postService.create(newPost).subscribe(() => {
      this.router.navigate(['/posts']);
    });

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
