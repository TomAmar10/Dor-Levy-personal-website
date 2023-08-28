import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bg-text',
  templateUrl: './bg-text.component.html',
  styleUrls: ['./bg-text.component.css'],
})
export class BgTextComponent implements OnInit {
  myMargin1 = '';
  myMargin2 = '';
  myOpacity = 0;
  @Input() text1: string;
  @Input() text2: string;

  constructor() {}

  ngOnInit() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.myMargin1 = scrollPosition / 5 + 'px';
    this.myMargin2 = 300 - scrollPosition / 3 + 'px';
    this.myOpacity = 0.05;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.myMargin1 = scrollPosition / 5 + 'px';
    this.myMargin2 = 300 - scrollPosition / 3 + 'px';
  }
}
