import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/language-service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  langData: any;
  result: number = null;
  amountResult: number = null;
  error = '';
  imageUrl = '../../../assets/images/calculate.jpg';

  calculator_form: FormGroup = new FormGroup({
    buy: new FormControl('', [Validators.required, Validators.min(0)]),
    sell: new FormControl('', [Validators.required, Validators.min(0)]),
    amount: new FormControl('', [Validators.min(0)]),
  });

  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.langService.langData$.subscribe((data) => {
      this.langData = data.Calculator;
      this.error = '';
    });
    this.calculator_form.valueChanges.subscribe(() => (this.error = ''));
    document.title = 'דור לוי - מחשבון עסקאות';
  }

  calculate() {
    this.result = null;
    this.amountResult = null;
    if (this.calculator_form.invalid) {
      this.calculator_form.markAllAsTouched();
      const isAmountValid = this.checkValidity('amount');
      if (!isAmountValid) this.error = this.langData.amountError;
      if (!this.checkValidity('sell')) this.error = this.langData.sellError;
      if (!this.checkValidity('buy')) this.error = this.langData.buyError;
      return;
    }
    const buy = this.calculator_form.value.buy;
    const sell = this.calculator_form.value.sell;
    const amount = this.calculator_form.value.amount;
    this.result = Math.round((sell / buy - 1) * 100);
    this.amountResult = Math.round((sell / buy - 1) * amount);
  }

  checkValidity(value: string) {
    return (
      this.calculator_form.get(value).touched &&
      this.calculator_form.get(value).valid
    );
  }
}
