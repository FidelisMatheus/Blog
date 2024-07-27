import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsReadComponent } from './posts-read.component';

describe('PostsReadComponent', () => {
  let component: PostsReadComponent;
  let fixture: ComponentFixture<PostsReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostsReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
