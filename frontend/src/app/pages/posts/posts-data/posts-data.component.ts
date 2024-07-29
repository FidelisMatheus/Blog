import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms'; // Importar o FormsModule
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Post } from 'src/app/core/models/post';
import { PostService } from 'src/app/core/service/post-service/post.service';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import {
  EditorChangeContent,
  EditorChangeSelection,
  QuillModule,
} from 'ngx-quill'; // https://www.youtube.com/watch?v=f1qQOorMKGo

export const editorModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
  ],
};

@Component({
  selector: 'app-posts-data',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    MatCardModule,
    FormsModule,
    QuillModule,
  ],
  templateUrl: './posts-data.component.html',
  styleUrl: './posts-data.component.scss',
})
export class PostsDataComponent implements OnInit {
  form = new FormGroup({
    author: new FormControl(''),
    title: new FormControl(''),
    content: new FormControl(''),
    subject: new FormControl(''),
    summary: new FormControl(''),
    date: new FormControl(''),
  });

  submitted = false;
  title!: string;
  safeHtml: SafeHtml | undefined;
  sanitize: any;
  editorText = '';
  editorModules = editorModules;
  formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'link',
    'image',
    'video',
    'formula',
    'header',
    'list',
    'script',
    'indent',
    'direction',
    'size',
    'color',
    'background',
    'font',
    'align',
  ];

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.sanitize = sanitizer;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      subject: ['', Validators.required],
      summary: ['', Validators.required],
      date: [this.formatDate(new Date()), Validators.required],
    });

    if (this.route.snapshot.paramMap.get('id')) {
      this.title = 'Editar Post';

      const id = this.route.snapshot.paramMap.get('id');

      this.postService.getById(id!).subscribe((post) => {
        this.form.patchValue({
          author: post.author,
          title: post.title,
          content: post.content,
          subject: post.subject,
          summary: post.summary,
          date: this.formatDate(post.date),
        });
      });
    } else {
      this.title = 'Novo Post';
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = !this.submitted;

    if (this.form.invalid) {
      return;
    }

    const formValues = this.form.value;
    const dateNow = new Date();

    const newPost: Post = {
      author: formValues.author!,
      title: formValues.title!,
      content: formValues.content!,
      subject: formValues.subject!,
      summary: formValues.summary!,
      date: this.parseDate(dateNow),
    };

    if (this.route.snapshot.paramMap.get('id')) {
      let id = this.route.snapshot.paramMap.get('id');
      this.postService.update(id, newPost).subscribe(() => {
        this.router.navigate(['/posts']);
      });
    } else {
      this.postService.create(newPost).subscribe(() => {
        this.router.navigate(['/posts']);
      });
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  get titleAttr() {
    return this.form.get('title');
  }

  formatDate(dateString: any): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  parseDate(dateString: any) {
    const [day, month, year, hours, minutes, seconds] = [
      dateString.getDate().toString().padStart(2, '0'),
      (dateString.getMonth() + 1).toString().padStart(2, '0'),
      dateString.getFullYear(),
      dateString.getHours().toString().padStart(2, '0'),
      dateString.getMinutes().toString().padStart(2, '0'),
      dateString.getSeconds().toString().padStart(2, '0'),
    ];

    const date = `${day}-${month}-${year}`;
    const time = `${hours}:${minutes}:${seconds}`;

    return `${date} ${time}`;
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    let contentHTML = event['editor']['root']['innerHTML'];
    //contentHTML = this.adjustImages(contentHTML);

    // console.log(' editor got changed ', event);
    contentHTML = this.sanitize.bypassSecurityTrustHtml(contentHTML);
    this.editorText = contentHTML;
  }
}
