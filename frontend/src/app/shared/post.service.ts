import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Post} from "./post.model"

@Injectable({
  providedIn: 'root'
})
export class PostService {
  selectedPost:Post;
  posts:Post[];

  readonly baseUrl=`http://localhost:5000/post/`

  constructor(private http: HttpClient) { }

  postPost(post:Post){
    return this.http.post(`${this.baseUrl}create`,post)
  }

  getAllPost(){
    return this.http.get(`${this.baseUrl}allPost`)
  }

  deletePost(_id:string){
    return this.http.delete(`${this.baseUrl}delete/${_id}`)
  }
}
