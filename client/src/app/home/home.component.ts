import { Component, OnInit } from '@angular/core';


//Importing Post Service for fetching data
import {PostService} from "../shared/post.service"
//Importing Post Model
import {Post} from "../shared/post.model"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public postService:PostService) { }

  ngOnInit(): void {
    const tags=this.getAllTags();
    this.refreshPostList();
  }

  //Gettting new data on each data manipulation
  refreshPostList(){
    this.postService.getAllPost().subscribe((res)=>{
      this.postService.posts=res as Post[]
    })
  }

  //Deletig post
  onDelete(_id:string){
    this.postService.deletePost(_id).subscribe((res)=>{
      this.refreshPostList();
    })
  }

  //Filtering data by tags
  onFind(tagInput:HTMLInputElement){
   this.postService.getPostByTag(tagInput.value).subscribe((res)=>{
    this.postService.posts=res as Post[]
   })
  }

  //Getting All unique tags
  getAllTags(){
    const uniqueTags= new Set()
    this.postService.getAllTags().subscribe((res:any)=>{
      res.map((data:any)=>{
        data.tags.map((uniqueTag:any)=>{
          uniqueTags.add(uniqueTag)
        })
      })
    })
    return uniqueTags
  }
}
