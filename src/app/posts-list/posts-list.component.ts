import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';

interface Post {
  id: number,
  title: string,
  body: string
}

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Post[];
  formModel: FormGroup;
  selectedPost: Post;

  constructor(private _http: HttpService) {
    this.formModel = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      body: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });
  }

  ngOnInit() {
    this._http.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }


  update() {
    let titleValue = this.title.value;
    let bodyValue = this.body.value;

    this._http.updatePost(this.selectedPost.id, titleValue, bodyValue).subscribe({
      next: data => {
        this.selectedPost.title = data.title;
        this.selectedPost.body = data.body;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  select(post: Post): void {
    this.selectedPost = post;
    this.formModel.controls['id'].setValue(post.id);
    this.formModel.controls['title'].setValue(post.title);
    this.formModel.controls['body'].setValue(post.body);
  }

  get id() {
    return this.formModel.get('id');
  }

  get title() {
    return this.formModel.get('title');
  }

  get body() {
    return this.formModel.get('body');
  }

}
