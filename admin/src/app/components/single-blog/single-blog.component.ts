import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import BlogModel from 'src/app/models/blog-model';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css'],
})
export class SingleBlogComponent implements OnInit {
  navigateLink = '';
  isEnglish = false;
  constructor() {}
  @Input() blog: BlogModel | undefined;
  @Input() isAdding = false;
  @Input() isFolded = false;
  @Output() myEvent = new EventEmitter<any>();

  ngOnInit() {
    this.navigateLink = `/blog/${this.blog._id}`;
    if (!this.blog.name) this.blog.name = 'כותרת';
    if (!this.blog.second_name) this.blog.second_name = 'כותרת משנה';
    if (!this.blog.details) this.blog.details = '...';
  }

  getSubjects() {
    let subjectArr = [];
    if (this.blog.america) subjectArr.push('בורסה אמריקאית');
    if (this.blog.israel) subjectArr.push('בורסה ישראלית');
    if (this.blog.crypto) subjectArr.push('קריפטו');
    return subjectArr.join(', ');
  }

  onDelete() {
    this.myEvent.emit();
  }

  toggleLang() {
    this.isEnglish = !this.isEnglish;
  }

  fold() {
    this.isFolded = !this.isFolded;
  }
}
