import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { israelUrl } from 'src/app/config';
import { FollowListService } from 'src/app/services/follow-list.service';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css'],
})
export class FollowListComponent implements OnInit, OnDestroy {
  private cryptoSubscription: Subscription;
  private americaSubscription: Subscription;
  private israelSubscription: Subscription;
  israelNamesUrl = israelUrl;
  coins$: Observable<any[]>;
  israelStocks$: Observable<any[]>;
  americaStocks$: Observable<any[]>;
  isCryptoDone = false;
  isAmericaDone = false;
  isIsraelDone = false;
  americaTimer = 60;
  israelTimer = 60;

  cryptoForm: FormGroup = this.fb.group({
    coin1: [''],
    coin2: [''],
    coin3: [''],
    coin4: [''],
    coin5: [''],
  });
  americaForm: FormGroup = this.fb.group({
    america1name: [''],
    america2name: [''],
    america3name: [''],
    america4name: [''],
    america5name: [''],
    america1symbol: [''],
    america2symbol: [''],
    america3symbol: [''],
    america4symbol: [''],
    america5symbol: [''],
  });
  israelForm: FormGroup = this.fb.group({
    israel1name: [''],
    israel2name: [''],
    israel3name: [''],
    israel4name: [''],
    israel5name: [''],
    israel1symbol: [''],
    israel2symbol: [''],
    israel3symbol: [''],
    israel4symbol: [''],
    israel5symbol: [''],
  });
  constructor(private service: FollowListService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cryptoSubscription = this.cryptoForm.valueChanges.subscribe(
      () => (this.isCryptoDone = false)
    );
    this.americaSubscription = this.americaForm.valueChanges.subscribe(
      () => (this.isAmericaDone = false)
    );
    this.israelSubscription = this.israelForm.valueChanges.subscribe(
      () => (this.isIsraelDone = false)
    );
  }

  submitCrypto() {
    const coinsArr = Object.values(this.cryptoForm.value);
    this.service.setNewCoins(coinsArr as any);
    this.cryptoForm.reset();
    this.isCryptoDone = true;
  }
  submitAmerica() {
    const americaArr = [];
    const form = this.americaForm.value;
    for (let i = 1; i <= 5; i++) {
      const nameKey = `america${i}name`;
      const symbolKey = `america${i}symbol`;

      if (form[nameKey] && form[symbolKey]) {
        americaArr.push({
          name: form[nameKey],
          symbol: form[symbolKey],
        });
      }
    }
    this.service.setNewAmerica(americaArr as any);
    this.isAmericaDone = true;
    this.americaTimer--;
    let myInterval = setInterval(() => {
      this.americaTimer--;
    }, 1000);
    setTimeout(() => {
      clearInterval(myInterval);
      this.americaTimer = 60;
    }, 60000);
  }
  submitIsrael() {
    const israelArr = [];
    const form = this.israelForm.value;
    for (let i = 1; i <= 5; i++) {
      const nameKey = `israel${i}name`;
      const symbolKey = `israel${i}symbol`;

      if (form[nameKey] && form[symbolKey]) {
        israelArr.push({
          name: form[nameKey],
          symbol: form[symbolKey],
        });
      }
    }
    this.service.setNewIsrael(israelArr as any);
    this.isIsraelDone = true;
    this.israelTimer--;
    let myInterval = setInterval(() => {
      this.israelTimer--;
    }, 1000);
    setTimeout(() => {
      clearInterval(myInterval);
      this.israelTimer = 60;
    }, 60000);
  }

  ngOnDestroy(): void {
    if (this.cryptoSubscription) this.cryptoSubscription.unsubscribe();
    if (this.americaSubscription) this.americaSubscription.unsubscribe();
    if (this.israelSubscription) this.israelSubscription.unsubscribe();
  }
}
