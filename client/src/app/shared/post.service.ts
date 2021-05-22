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

  //Getting all Post 
  getAllPost(){
    return this.http.get(`${this.baseUrl}allPost`)
  }

  //Getting all Tags
  getAllTags(){
    return this.http.get(`${this.baseUrl}allPost`)
  }

  //Deleting Post
  deletePost(_id:string){
    return this.http.delete(`${this.baseUrl}delete/${_id}`)
  }

  //Getting Post by Tags
  getPostByTag(tags:string){
    return this.http.get(`${this.baseUrl}getPostByTag/${tags}`)
  }

  //Getting Post by Id
  getPostById(postId:string){
    return this.http.get(`${this.baseUrl}getPostById/${postId}`)
  }
  //Editing Post
  editPost(_id:string,post:Post){
    return this.http.put(`${this.baseUrl}edit/${_id}`,post)
  }
}
