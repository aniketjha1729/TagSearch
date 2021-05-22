import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Post} from "./post.model"



@Injectable({
  providedIn: 'root'
})

//Using models
export class PostService {
  selectedPost:Post;
  posts:Post[];

  //Backend Calls
  readonly baseUrl=`http://localhost:5000/post/`

  constructor(private http: HttpClient) { }

  //Creating new Post
  postPost(post:Post){
    return this.http.post(`${this.baseUrl}create`,post)
  }

  //Getting 
  getAllPost(){
    return this.http.get(`${this.baseUrl}allPost`)
  }

  getAllTags(){
    return this.http.get(`${this.baseUrl}allPost`)
  }

  deletePost(_id:string){
    return this.http.delete(`${this.baseUrl}delete/${_id}`)
  }

  getPostByTag(tags:string){
    return this.http.get(`${this.baseUrl}getPostByTag/${tags}`)
  }

  getPostById(postId:string){
    return this.http.get(`${this.baseUrl}getPostById/${postId}`)
  }
}
