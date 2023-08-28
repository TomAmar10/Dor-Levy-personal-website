import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private langDataSubscription: Subscription;
  private languageSubscription: Subscription;
  langData: any;
  currLanguage: string;
  isMenuOpen = false;
  isBlogMenuOpen = false;
  isBlogPage = false;
  blogLinkColor = 'rgb(249, 244, 234)';
  link = '../../../assets/images/';
  private phoneNumber = '+972526911681';
  private whatsappLink = '';

  pages = [];

  constructor(private router: Router, private langService: LanguageService) {}

  ngOnInit(): void {
    this.languageSubscription = this.langService.language$.subscribe(
      (res) => (this.currLanguage = res)
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMenuOpen = false;
        this.setBlogLinkColor(event.url);
      }
    });
    this.langDataSubscription = this.langService.langData$.subscribe((data) => {
      this.langData = data.Header;
      this.setPages(data.Header);
      this.setWhatsAppLink();
    });
  }

  setBlogLinkColor(url: string): void {
    this.blogLinkColor = url.includes('blogs') ? '#d4af37d0' : 'white';
  }

  setPages(headerData: any): void {
    this.pages = [
      [headerData.contact, 'contact'],
      [headerData.links, 'links'],
      [headerData.calculator, 'calculator'],
      [headerData.followLists, 'follow-list'],
      [headerData.blogs, ''],
      [headerData.about, 'about'],
      [headerData.benefits, 'benefits'],
      [headerData.privateLesson, 'private-lesson'],
      [headerData.home, 'home'],
    ];
  }

  setWhatsAppLink(): void {
    this.whatsappLink = `https://wa.me/${
      this.phoneNumber
    }?text=${encodeURIComponent(this.langData.message)}`;
  }

  get myWhatsAppLink(): string {
    return this.whatsappLink;
  }

  ngOnDestroy(): void {
    this.langDataSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }
}
