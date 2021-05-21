import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {PostService} from "../shared/post.service"
import {Post} from "../shared/post.model"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tags=""
  constructor(public postService:PostService) { }

  ngOnInit(): void {
    this.refreshPostList();
  }

  refreshPostList(){
    this.postService.getAllPost().subscribe((res)=>{
      this.postService.posts=res as Post[]
    })
  }

  onDelete(_id:string){
    this.postService.deletePost(_id).subscribe((res)=>{
      this.refreshPostList();
    })
  }

  onFind(tags:HTMLTextAreaElement){
    console.log(tags)
  }
}
