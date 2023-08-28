import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import config from 'src/app/utils/config';

@Injectable({ providedIn: 'root' })
export class FollowListService {
  constructor(private http: HttpClient) {}

  private coinsSubject = new BehaviorSubject<any[]>([]);
  private israelStockSubject = new BehaviorSubject<any[]>([]);
  private americaStockSubject = new BehaviorSubject<any[]>([]);

  get coins$() {
    return this.coinsSubject.asObservable();
  }
  get israelStocks$() {
    return this.israelStockSubject.asObservable();
  }
  get americaStocks$() {
    return this.americaStockSubject.asObservable();
  }

  fetchAll() {
    this.fetchCoins();
    this.fetchAmerica();
    this.fetchIsrael();
  }

  fetchCoins() {
    this.http.get<any>(config.cryptoUrl).subscribe((res) => {
      this.coinsSubject.next(res);
    });
  }
  fetchAmerica() {
    this.http
      .get<any>(config.americaUrl)
      .subscribe((res) => this.americaStockSubject.next(res));
  }
  fetchIsrael() {
    this.http.get<any>(config.israelUrl).subscribe((res) => {
      const newResult = res.map((s: any) => {
        return {
          ...s,
          change: parseFloat(s.change.replace('%', '')),
          price: s.price.replace(',', ''),
        };
      });
      this.israelStockSubject.next(newResult);
    });
  }
}

// 23KLHQG0V0UY2F3V
// 64916eb40ee8c3.04745715
