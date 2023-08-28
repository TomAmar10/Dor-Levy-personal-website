import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import BlogModel from '../models/blog-model';
import { Router } from '@angular/router';
import { serverUrl } from '../config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private blogsSubject = new BehaviorSubject<BlogModel[]>([]);

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  get blogs$() {
    return this.blogsSubject.asObservable();
  }

  fetchBlogs() {
    this.http.get<BlogModel[]>(`${serverUrl}blogs/all`).subscribe((res) => {
      if (!res) return;
      console.log(res);
      this.blogsSubject.next(res);
    });
  }

  getById(id: string): BlogModel {
    const blogs = this.blogsSubject.value;
    const requiredBlog = blogs.find((b) => b._id === id);
    return requiredBlog;
  }

  create(blog: BlogModel) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    const currList = this.blogsSubject.value;
    this.http.post(`${serverUrl}blogs/add`, blog, { headers }).subscribe(
      (res: any) => {
        currList.push(res);
        this.blogsSubject.next(currList);
        this.router.navigate(['/']);
      },
      (err) => this.authService.logout()
    );
  }

  update(blog: BlogModel, blogId: string) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    const currList = this.blogsSubject.value;
    const updatedBlogIndex = currList.findIndex((item) => item._id === blogId);
    if (updatedBlogIndex !== -1) {
      this.http
        .patch(`${serverUrl}blogs/single/update/${blogId}`, blog, { headers })
        .subscribe(
          (res: BlogModel) => {
            currList[updatedBlogIndex] = res; // Replace the blog in currList with the updated one
            this.blogsSubject.next(currList); // Emit the updated array
            this.router.navigate(['/']);
          },
          (err) => this.authService.logout()
        );
    } else console.error('Blog not found in the list.');
  }

  delete(id: string) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    const newList = [...this.blogsSubject.value.filter((t) => t._id !== id)];
    this.http
      .delete(`${serverUrl}blogs/single/delete/${id}`, { headers })
      .subscribe(
        (res) => {
          this.blogsSubject.next(newList);
        },
        (err) => this.authService.logout()
      );
  }
}
