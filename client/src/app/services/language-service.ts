import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import english from '../utils/english.json';
import hebrew from '../utils/hebrew.json';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  storageLanguage = localStorage.getItem('dor-web-lang');
  private languageSubject = new BehaviorSubject<string>(
    this.storageLanguage || 'hebrew'
  );
  private langDataSubject = new BehaviorSubject<any>(
    this.storageLanguage === 'english' ? english : hebrew
  );

  constructor() {}

  get language$() {
    return this.languageSubject.asObservable();
  }
  get langData$() {
    return this.langDataSubject.asObservable();
  }

  setLanguage(language: string) {
    localStorage.setItem('dor-web-lang', language);
    this.languageSubject.next(language);
    const currLang = language === 'english' ? english : hebrew;
    this.langDataSubject.next(currLang);
  }

  getLanguage(){
    return this.languageSubject.value;
  }
}
