import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BlogService } from './services/blog.service';
import { FollowListService } from './services/follow-list.service';
import { LanguageService } from './services/language-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  myMargin1 = '';
  myMargin2 = '';
  myOpacity = 0;
  appLanguage = '';
  isPageLoaded = false;
  isSamsung = false;

  constructor(
    private followListService: FollowListService,
    private blogService: BlogService,
    private route: Router,
    private langService: LanguageService
  ) {}

  ngAfterViewInit() {
    window.onload = () => {
      this.isPageLoaded = true;
    };
  }

  ngOnInit(): void {
    const isSamsungInternet = navigator.userAgent.includes('SamsungBrowser');
    this.isSamsung = isSamsungInternet;
    this.langService.language$.subscribe(
      (res) => (this.appLanguage = res === 'english' ? 'english' : '')
    );

    this.route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
        const scrollPosition =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        this.myMargin1 = scrollPosition / 5 + 'px';
        this.myMargin2 = 300 - scrollPosition / 3 + 'px';
        this.myOpacity = 0.1;
      });
    this.followListService.fetchAll();
    this.blogService.fetchBlogs();
  }

  scroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.myMargin1 = scrollPosition / 5 + 'px';
    this.myMargin2 = 300 - scrollPosition / 3 + 'px';
  }
}

// --------------- more keys to use:
// 'KVSPBEBSPJY5ZZU6',
// 'NJVQSVBRMMSXYC3D',
// 'S1M58PDWDKEUTLFX',
// 'WDSBM0D92ROIVQQ4',
