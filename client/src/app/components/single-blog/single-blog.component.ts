import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription, combineLatest } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { Platform } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css'],
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  private langDataSubscription: Subscription;
  private languageSubscription: Subscription;
  langData: any;
  isEnglish: boolean;
  urlFirst = 'https://dor-levy.netlify.app/blogs/בלוג/';
  urlMessage = 'בלוג מעניין מהאתר של דור לוי';
  fullUrl = '';
  article: any;
  currentBlogID = '';
  currLanguage: string;
  moreArticles = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    center: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-caret-left"></i>',
      '<i class="fa-solid fa-caret-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      700: {
        items: 2,
      },
      940: {
        items: 3,
      },
      1300: {
        items: 3,
      },
    },
    nav: true,
  };

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private platform: Platform,
    private langService: LanguageService
  ) {}

  ngOnInit(): void {
    this.langDataSubscription = this.langService.langData$.subscribe(
      (data) => (this.langData = data.SingleBlog)
    );
    this.languageSubscription = this.langService.language$.subscribe((res) => {
      this.isEnglish = res === 'english';
      this.currLanguage = res;
      if (res === 'english')
        this.urlMessage = "Check out this blog from Dor Levy's website";
    });

    this.route.params.subscribe((res) => {
      this.fullUrl = `${this.urlFirst}${res['blog-name']}/${res['blog-id']}}`;
      this.currentBlogID = res['blog-id'];
      combineLatest([
        this.blogService.cryptoBlogs$,
        this.blogService.americaBlogs$,
        this.blogService.israelBlogs$,
      ]).subscribe((res) => {
        const blogsArray = [...res[0], ...res[1], ...res[2]];
        this.moreArticles = blogsArray;
        this.article = blogsArray.filter(
          (a: any) => a._id === this.currentBlogID
        )[0];
      });
    });
  }

  messenger() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      window.location.href = `fb-messenger://share/?link=${this.fullUrl}`;
    } else if (this.platform.is('android')) {
      window.location.href = `fb-messenger://share/?link=${this.fullUrl}`;
    } else {
      window.open('https://www.messenger.com/');
    }
  }
  copy() {
    const clipboard = navigator.clipboard;
    clipboard
      .writeText(this.fullUrl)
      .then(() => alert('Text copied to clipboard'));
  }

  getBlogRoute(blog: any) {
    return `/blog/${blog.name}/${blog._id}`;
  }

  get whatsappLink() {
    return `https://api.whatsapp.com/send?text=${this.urlMessage}:${this.fullUrl}`;
  }

  get telegramLink() {
    return `https://t.me/share/url?url=${this.fullUrl}&text=${this.urlMessage}`;
  }

  ngOnDestroy(): void {
    this.langDataSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }
}
