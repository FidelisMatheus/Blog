import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Importar o FormsModule
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ['', Validators.required],
      date: ['', Validators.required],
      summary: ['', Validators.required],
      theme: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = !this.submitted;

    const formValues = this.form.value;

    const newPost: Post = {
      title: formValues.title!,
      content: formValues.content!,
      date: formValues.date!,
      theme: formValues.theme!,
      summary: formValues.summary!,
      author: formValues.author!,
    };

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}

export interface Post {
  title: string;
  content: string;
  date: string;
  theme: string;
  summary: string;
  author: string;
}
