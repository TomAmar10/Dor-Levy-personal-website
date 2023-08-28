import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FollowListService } from '../../services/follow-list.service';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css'],
})
export class FollowListComponent implements OnInit {
  currLanguage: string;
  langData: any;
  coins$: Observable<any[]>;
  israelStocks$: Observable<any[]>;
  americaStocks$: Observable<any[]>;
  imageUrl = '../../../assets/images/follow-list.webp';
  constructor(
    private service: FollowListService,
    private langService: LanguageService
  ) {}

  ngOnInit(): void {
    this.langService.language$.subscribe((res) => (this.currLanguage = res));
    this.langService.langData$.subscribe(
      (data) => (this.langData = data.FollowList)
    );
    this.coins$ = this.service.coins$;
    this.americaStocks$ = this.service.americaStocks$;
    this.israelStocks$ = this.service.israelStocks$;
    document.title = 'דור לוי - רשימות מעקב';
  }
}
