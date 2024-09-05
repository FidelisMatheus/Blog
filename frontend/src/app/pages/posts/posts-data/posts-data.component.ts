import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms'; // Importar o FormsModule
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Post } from 'src/app/core/models/post';
import { PostService } from 'src/app/core/service/post-service/post.service';
import { MatCardModule } from '@angular/material/card';
import { SafeHtml } from '@angular/platform-browser';

import { WebBuilderComponent } from '../../common/web-builder/web-builder.component';

import { GrapesJsService } from 'src/app/core/service/grapes-js/grapes-js.service';

@Component({
  selector: 'app-posts-data',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    MatCardModule,
    FormsModule,
    WebBuilderComponent,
  ],
  templateUrl: './posts-data.component.html',
  styleUrl: './posts-data.component.scss',
})
export class PostsDataComponent implements AfterViewInit, OnInit {
  @ViewChild(WebBuilderComponent) grapesJsComponent!: WebBuilderComponent;

  form = new FormGroup({
    author: new FormControl(''),
    title: new FormControl(''),
    content: new FormControl(''),
    css: new FormControl(''),
    subject: new FormControl(''),
    summary: new FormControl(''),
    date: new FormControl(''),
  });

  api = import.meta.env.NG_APP_TINYMCE_API_KEY;
  isLoading = true; // Estado de carregamento

  submitted = false;
  title!: string;
  safeHtml: SafeHtml | undefined;
  sanitize: any;
  editorText = '';

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private grapesjsService: GrapesJsService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      content: [''],
      css: [''],
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
          css: post.css,
          subject: post.subject,
          summary: post.summary,
          date: this.formatDate(post.date),
        });

        this.updateGrapesContent(this.form.value.content, this.form.value.css);
      });
    } else {
      this.title = 'Novo Post';
    }

    this.isLoading = true;
  }

  ngAfterViewInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.updateGrapesContent(this.form.value.content, this.form.value.css);
    }
  }

  updateGrapesContent(html: any, css: any) {
    // Manda o HTML e o CSS para o GrapesJS depois de tudo carregado
    this.grapesJsComponent.setContent(html, css);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = !this.submitted;

    if (this.form.invalid) {
      return;
    }

    const editor = this.grapesjsService.getGrapesInstance();
    if (editor) {
      // Faça algo com a instância do GrapesJS
      // console.log(editor.getHtml()); // Exemplo de uso
    }

    const formValues = this.form.value;
    const dateNow = new Date();

    this.form.value.content = editor.getHtml();
    this.form.value.css = editor.getCss();

    const newPost: Post = {
      author: formValues.author!,
      title: formValues.title!,
      content: formValues.content!,
      css: formValues.css!,
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
}
