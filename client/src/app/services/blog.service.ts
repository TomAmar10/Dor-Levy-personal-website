import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { serverUrl } from '../utils/config';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private url = `${serverUrl}blogs/all`
  private cryptoBlogsSubject = new BehaviorSubject<any[]>([]);
  private americaBlogsSubject = new BehaviorSubject<any[]>([]);
  private israelBlogsSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  get cryptoBlogs$() {
    return this.cryptoBlogsSubject.asObservable();
  }
  get americaBlogs$() {
    return this.americaBlogsSubject.asObservable();
  }
  get israelBlogs$() {
    return this.israelBlogsSubject.asObservable();
  }

  fetchBlogs() {
    this.http.get(this.url).subscribe((res: []) => {
      const crypto = res.filter((b: any) => b && b.crypto);
      this.cryptoBlogsSubject.next(crypto);
      const america = res.filter((b: any) => b && b.america);
      this.americaBlogsSubject.next(america);
      const israel = res.filter((b: any) => b && b.israel);
      this.israelBlogsSubject.next(israel);
    });
  }
}
