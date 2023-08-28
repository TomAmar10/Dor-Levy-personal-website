import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  debounceTime,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  private searchSubject = new BehaviorSubject<string>('');
  langData: any;
  blogs$: Observable<any[]>;
  searchBlogs$: Observable<any[]>;
  blogHeader = '';
  userSearch = '';
  isFocus = false;
  blogParagraph = '';
  currLanguage: string;
  isEnglish: boolean;

  constructor(
    private service: BlogService,
    private route: ActivatedRoute,
    private langService: LanguageService
  ) {}

  ngOnInit(): void {
    this.langService.langData$.subscribe((data) => {
      this.langData = data.Blogs;
      this.updateBlogHeader();
    });

    this.langService.language$.subscribe((res) => {
      this.currLanguage = res;
      this.isEnglish = res === 'english';
    });

    this.route.params.subscribe((res) => {
      const url = res['blog-subject'];
      this.updateBlogHeader();
      if (url === 'crypto-coins') {
        this.blogHeader = this.langData.cryptoHeader;
        this.blogs$ = this.service.cryptoBlogs$;
        this.blogParagraph = this.langData.cryptoParagraph;
        document.title = 'דור לוי - בלוג מטבעות קריפטו';
      }
      if (url === 'america-stock-exchange') {
        this.blogHeader = this.langData.americaHeader;
        this.blogs$ = this.service.americaBlogs$;
        this.blogParagraph = this.langData.americaParagraph;
        document.title = 'דור לוי - בלוג הבורסה האמריקאית';
      }
      if (url === 'israel-stock-exchange') {
        this.blogHeader = this.langData.israelHeader;
        this.blogs$ = this.service.israelBlogs$;
        this.blogParagraph = this.langData.israelParagraph;
        document.title = 'דור לוי - בלוג הבורסה הישראלית';
      }
    });

    this.searchBlogs$ = this.searchSubject.pipe(
      debounceTime(300),
      switchMap((searchWord) => {
        this.userSearch = searchWord;
        return this.blogs$.pipe(
          map((list) =>
            list.filter((blog) => {
              const name = this.isEnglish
                ? blog.name_english || ''
                : blog.name || '';
              const secondName = this.isEnglish
                ? blog.second_name_english || ''
                : blog.second_name || '';
              return (
                name.toLowerCase().includes(searchWord.toLowerCase()) ||
                secondName.toLowerCase().includes(searchWord.toLowerCase())
              );
            })
          )
        );
      })
    );
  }

  private updateBlogHeader(): void {
    const url = this.route.snapshot.params['blog-subject'];
    if (url === 'crypto-coins') {
      this.blogHeader = this.langData.cryptoHeader;
      this.blogParagraph = this.langData.cryptoParagraph;
    }
    if (url === 'america-stock-exchange') {
      this.blogHeader = this.langData.americaHeader;
      this.blogParagraph = this.langData.americaParagraph;
    }
    if (url === 'israel-stock-exchange') {
      this.blogHeader = this.langData.israelHeader;
      this.blogParagraph = this.langData.israelParagraph;
    }
  }

  change(item: string) {
    this.searchSubject.next(item);
    this.isFocus = true;
  }

  choose(item: string) {
    this.searchSubject.next(item);
    this.isFocus = false;
  }

  blurInput() {
    let blurTimer = setTimeout(() => {
      this.isFocus = false;
      clearTimeout(blurTimer);
    }, 100);
  }

  getBlogRoute(blog: any) {
    return `/blog/${blog.name}/${blog._id}`;
  }

}
