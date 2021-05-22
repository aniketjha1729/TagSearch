import { Component, OnInit } from '@angular/core';



import {PostService} from "../shared/post.service"
import {Post} from "../shared/post.model"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
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

  onFind(tagInput:HTMLInputElement){
   console.log(tagInput.value);
   this.postService.getPostByTag(tagInput.value).subscribe((res)=>{
    this.postService.posts=res as Post[]
   })
    
  }
}
