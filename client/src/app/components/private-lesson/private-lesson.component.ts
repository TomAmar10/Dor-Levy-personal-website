import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/services/language-service';
import { syllabus, syllabusEnglish } from 'src/app/utils/syllabus';

@Component({
  selector: 'app-private-lesson',
  templateUrl: './private-lesson.component.html',
  styleUrls: ['./private-lesson.component.css'],
})
export class PrivateLessonComponent implements OnInit {
  @ViewChild('scrollHere', { static: false }) scrollHere: ElementRef;
  syllabus = syllabus;
  imageUrl = '../../../assets/images/private-lesson.jpeg';
  langData: any;
  appLanguage: any;

  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    document.title = 'דור לוי - שיעור פרטי';
    this.langService.langData$.subscribe((data) => {
      this.langData = data.PrivateLesson;
      if (data.PrivateLesson.header1 === 'Private Lesson')
        this.syllabus = syllabusEnglish;
      else this.syllabus = syllabus;
    });
    this.langService.language$.subscribe((res) => (this.appLanguage = res));
  }

  scrollToSyllabus(): void {
    const scrollHere = this.scrollHere.nativeElement;
    scrollHere.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
