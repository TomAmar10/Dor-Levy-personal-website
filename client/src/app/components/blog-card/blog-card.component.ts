import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})
export class BlogCardComponent {
  @Input() isCarousel: boolean;
  @Input() isEnglish: boolean;
  @Input() currLanguage: string;
  @Input() blog: any;
  @Input() langData: any;

  getBlogRoute(blog: any) {
    return `/blog/${blog.name}/${blog._id}`;
  }
}
