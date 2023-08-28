import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs.service';
import TaskModel from '../../models/blog-model';
import BlogModel from '../../models/blog-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  allBlogs: TaskModel[];
  blogsToShow: TaskModel[];
  blogToDelete: BlogModel;
  isFolded = false;
  filters: string[] = [];
  blogsSubscription: Subscription;
  constructor(private blogService: BlogsService) {}

  ngOnInit(): void {
    this.blogsSubscription = this.blogService.blogs$.subscribe((res) => {
      this.allBlogs = res;
      this.blogsToShow = res;
    });
  }

  onBlogDelete(blog: BlogModel) {
    this.blogToDelete = blog;
  }
  removeBlog() {
    this.blogToDelete = undefined;
  }

  deleteBlog() {
    this.blogService.delete(this.blogToDelete._id);
    this.blogToDelete = undefined;
  }

  filter(type: string) {
    const index = this.filters.indexOf(type);
    if (index === -1) this.filters.push(type);
    else this.filters.splice(index, 1);
    const filtered = this.allBlogs.filter((b) => {
      return this.filters.some((filter) => b[filter] === true);
    });
    this.blogsToShow = filtered.length > 0 ? filtered : this.allBlogs;
  }

  foldBlogs() {
    this.isFolded = !this.isFolded;
  }

  ngOnDestroy(): void {
    if (this.blogsSubscription) {
      this.blogsSubscription.unsubscribe();
    }
  }
}
