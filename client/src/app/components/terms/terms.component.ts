import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
})
export class TermsComponent implements OnInit {
  langData: any;
  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.langService.langData$.subscribe((res) => (this.langData = res.Terms));
  }
}
