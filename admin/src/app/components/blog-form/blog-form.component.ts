import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
})
export class BlogFormComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    name_english: [null],
    second_name: [null, [Validators.required]],
    second_name_english: [null],
    details: [null, [Validators.required]],
    details_english: [null],
    crypto: [null],
    america: [null],
    israel: [null],
  });
  isValid = true;
  errorMsg = '';
  blogId = '';
  subjects = '';
  checkboxStatesInitialized = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private blogService: BlogsService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((res) => {
          this.blogId = res['blog-id'];
          return this.blogService.blogs$;
        })
      )
      .subscribe((res) => {
        if (!this.blogId) return;
        const currentBlog = res.find((b) => b._id === this.blogId);
        if (!currentBlog) return;
        const newForm = {
          name: currentBlog.name,
          name_english: currentBlog.name_english,
          second_name: currentBlog.second_name,
          second_name_english: currentBlog.second_name_english,
          details: currentBlog.details,
          details_english: currentBlog.details_english,
          america: currentBlog.america,
          israel: currentBlog.israel,
          crypto: currentBlog.crypto,
          _id: currentBlog._id, // CHANGE THAT!
        };
        this.updateSubjectField(newForm);
        this.myForm.patchValue({ ...newForm });
      });
  }

  ngAfterViewInit(): void {
    this.myForm.valueChanges.subscribe((res) => {
      this.isValid = true;
      this.updateSubjectField(res);
    });

    this.checkboxStatesInitialized = true;
    this.cdRef.detectChanges();
  }

  private updateSubjectField(formData: any): void {
    let subject = [];
    if (formData.crypto) subject.push('קריפטו');
    if (formData.america) subject.push('בורסה אמריקאית ');
    if (formData.israel) subject.push('בורסה ישראלית ');
    this.subjects = subject.join(', ');
    if (!subject.length) this.subjects = '';
  }

  onSubmit() {
    if (
      this.myForm.invalid ||
      (!this.myForm.value.america &&
        !this.myForm.value.israel &&
        !this.myForm.value.crypto)
    ) {
      this.isValid = false;
      return;
    }
    if (this.blogId) this.blogService.update(this.myForm.value, this.blogId);
    else this.blogService.create(this.myForm.value);
  }
}
