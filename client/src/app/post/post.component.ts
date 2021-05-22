import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators';
import {PostService} from "../shared/post.service"
import {Post} from "../shared/post.model"

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers:[PostService]
})
export class PostComponent implements OnInit {
  mode:any
  id=""
  selectedPost={
    tags:[],
    _id:"",
    content:"",
    
  }
  constructor(public postService:PostService,route: ActivatedRoute) { 
    const id: Observable<string> = route.params.pipe(map(p => p.postId));
    id.subscribe((id)=>{
      if(id){
        this.mode="edit"
        this.id=id
      }else{
        this.mode="create"
      }
    })
    this.getPostById(this.id);
  }

  ngOnInit(): void {}

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
    if(this.mode=="create"){
    this.postService.postPost(form.value).subscribe((res)=>{
      this.resetForm(form)
      alert("Successful")
    })}else{
      console.log("Edit")
    }
  }


  onEdit(post:Post){
    console.log(post);
    this.postService.selectedPost=post;
  }

  getPostById(id:any){
    this.postService.getPostById(id).subscribe((res:any)=>{ 
      this.selectedPost._id=res._id;
      this.selectedPost.tags=res.tags;
      this.selectedPost.content=res.content;
    })
  }

}
