import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent implements OnInit {
  langData: any;
  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    document.title = 'משקיעים עם דור לוי';
    this.langService.langData$.subscribe(
      (data) => (this.langData = data.About)
    );
  }
}
