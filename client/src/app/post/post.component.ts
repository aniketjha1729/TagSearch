import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {PostService} from "../shared/post.service"
import {Post} from "../shared/post.model"

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers:[PostService]
})
export class PostComponent implements OnInit {
  selectedPost={
    _id:"",
    content:"",
    tags:[]
  }
  constructor(public postService:PostService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshPostList();
  }

  resetForm(form?:NgForm){
    if(form){
      form.reset();
      this.postService.selectedPost={
        _id:"",
        content:"",
        tags:[]
      }
    }
  }

  onSubmit(form:NgForm){
    this.postService.postPost(form.value).subscribe((res)=>{
      this.resetForm(form)
      this.refreshPostList();
      alert("Successful")
    })
  }

  refreshPostList(){
    this.postService.getAllPost().subscribe((res)=>{
      this.postService.posts=res as Post[]
    })
  }

  onEdit(post:Post){
    console.log(post);
    this.postService.selectedPost=post;
  }

  onDelete(_id:string,form:NgForm){
    this.postService.deletePost(_id).subscribe((res)=>{
      this.refreshPostList();
    })
  }

}
