import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getPosts()
  {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  updatePost(postid: number, posttitle: string, postbody: string){
    const request = 
    { 
      id: postid,
      title: posttitle,
      body: postbody
    };
    return this.http.put<any>('https://jsonplaceholder.typicode.com/posts/'+postid, request)
    
  }


}
