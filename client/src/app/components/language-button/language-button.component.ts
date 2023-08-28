import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-language-button',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.css'],
})
export class LanguageButtonComponent {
  private threshold: number = 140;
  classToAdd: string = '';
  isLangOpen = false;

  @Input() currLanguage: string;
  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: any) {
    if (!this.elementRef) return;
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.isLangOpen) this.isLangOpen = false;
  }
  constructor(
    private langService: LanguageService,
    private elementRef: ElementRef
  ) {}


  onDragEnd(event: CdkDragEnd) {
    const element = event.source.element.nativeElement;
    const container = element.parentElement;
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const elementLeft = elementRect.left - containerRect.left;
    if (elementLeft <= this.threshold) {
      this.classToAdd = 'english-dropdown';
    } else this.classToAdd = '';
  }

  get langImagePath() {
    return `../../../assets/images/${this.currLanguage}.png`;
  }

  toggleLangMenu() {
    this.isLangOpen = !this.isLangOpen;
  }

  changeLanguage(language: string) {
    this.langService.setLanguage(language);
  }
}
