import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  langData: any;
  currLanguage: string;
  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    document.title = 'Investing with Dor Levy';

    this.langService.langData$.subscribe((data) => {
      this.langData = data.Home;
    });

    this.langService.language$.subscribe((res) => (this.currLanguage = res));
  }

  goTo(link: string) {
    window.open(link, '_blank');
  }
}
