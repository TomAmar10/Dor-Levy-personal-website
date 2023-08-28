import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiKey, config, serverUrl } from '../config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FollowListService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchAll() {
    this.fetchAmericaStock();
    this.fetchCoins();
    this.fetchIsraelStock();
  }

  fetchCoins() {
    const storeNames = localStorage.getItem('my-crypto-coins');
    if (storeNames) {
      const names = JSON.parse(storeNames);
      this.setCryptoList(names);
      return;
    }
    this.http.get<any>(`${serverUrl}names/all/crypto`).subscribe((coins) => {
      localStorage.setItem('my-crypto-coins', JSON.stringify(coins));
      this.setCryptoList(coins);
    });
  }
  setNewCoins(coins: string[]) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    const newCoins = coins
      .map((c) => {
        return { name: c };
      })
      .filter((c) => c.name);
    this.http
      .patch<any>(`${serverUrl}names/all/update/crypto`, newCoins, { headers })
      .subscribe(
        (res) => {},
        (err) => this.authService.logout()
      );
    this.setCryptoList(newCoins);
  }

  setCryptoList(coins: any[]) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    const coinsToSearch = coins.map((c) => c.name.toLowerCase());
    this.http.get<any>(`${config.cryptoDataUrl}${coinsToSearch}`).subscribe(
      (res) => {
        this.http
          .patch<any>(`${serverUrl}crypto/all/update`, res, { headers })
          .subscribe(
            (res) => {},
            (err) => this.authService.logout()
          );
      },
      (err) => this.authService.logout()
    );
  }

  // -----------------------

  fetchIsraelStock() {
    const storeNames = localStorage.getItem('my-israel-stocks');
    if (storeNames) {
      const names = JSON.parse(storeNames);
      this.setIsraelList(names);
      return;
    }
    this.http
      .get(`${serverUrl}names/all/israel`)
      .subscribe((stocks: { name: string; symbol: string }[]) => {
        localStorage.setItem('my-israel-stocks', JSON.stringify(stocks));
        this.setIsraelList(stocks);
      });
  }

  setIsraelList(stocks: { name: string; symbol: string }[]) {
    const token = localStorage.getItem('token');
    if (!token || !stocks) return;
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    this.http
      .patch<any>(`${serverUrl}israel/all/update`, stocks, { headers })
      .subscribe(
        (res) => {},
        (err) => this.authService.logout()
      );
  }

  setNewIsrael(stocks: { name: string; symbol: string }[]) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    const names = stocks.filter((n) => n.name.length > 0);
    if (!names) return;
    this.http
      .patch(`${serverUrl}names/all/update/israel`, names, { headers })
      .subscribe(
        (res) => {},
        (err) => this.authService.logout()
      );
    this.setIsraelList(stocks);
  }

  // -----------------------

  fetchAmericaStock() {
    const storeNames = localStorage.getItem('my-america-stocks');
    if (storeNames) {
      const names = JSON.parse(storeNames);
      this.setAmericaList(names);
      return;
    }
    this.http
      .get(`${serverUrl}names/all/america`)
      .subscribe((stocks: { name: string; symbol: string }[]) => {
        this.setAmericaList(stocks);
        localStorage.setItem('my-america-stocks', JSON.stringify(stocks));
      });
  }

  setNewAmerica(stocks: { name: string; symbol: string }[]) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    const names = stocks.filter((n) => n.symbol.length > 0);
    if (!names) return;
    this.http
      .patch<any>(`${serverUrl}names/all/update/america`, names, { headers })
      .subscribe(
        (res) => this.setAmericaList(names),
        (err) => this.authService.logout()
      );
  }

  setAmericaList(stocks: { name: string; symbol: string }[]) {
    const token = localStorage.getItem('token');
    if (!token) return;
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    const listArr = [];
    if (!stocks) return;
    stocks.forEach((s) => {
      this.http
        .get<any>(`${config.americaDataUrl}${s.symbol}&apikey=${apiKey}`)
        .subscribe((res) => {
          if (res.Note || res.Information) return;
          const stock = {
            name: s.name,
            symbol: s.symbol,
            price: res['Global Quote']['05. price'],
            change: res['Global Quote']['10. change percent'].replace('%', ''),
          };
          listArr.push(stock);
          if (listArr.length === stocks.length)
            this.http
              .patch(`${serverUrl}america/all/update`, listArr, { headers })
              .subscribe(
                (res) => {},
                (err) => this.authService.logout()
              );
        });
    });
  }
}
