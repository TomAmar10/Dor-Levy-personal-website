import { Component, OnInit } from '@angular/core';
import { BlogsService } from './services/blogs.service';
import { ContactsService } from './services/contacts.service';
import { FollowListService } from './services/follow-list.service';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  constructor(
    private blogService: BlogsService,
    private contactsService: ContactsService,
    private followService: FollowListService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.blogService.fetchBlogs();
    this.contactsService.fetchContacts();

    setInterval(() => {
      this.followService.fetchAmericaStock();
      this.followService.fetchCoins();
    }, 60000);

    this.executeIsraelInt();

    this.followService.fetchCoins();
    this.followService.fetchAmericaStock();
    this.followService.fetchIsraelStock();
  }

  getRandomDelay() {
    const minMinutes = 30;
    const maxMinutes = 60;
    const randomDelay = Math.floor(
      Math.random() * (maxMinutes - minMinutes + 1) + minMinutes
    );
    return randomDelay * 60 * 1000;
  }

  shouldExecuteInterval() {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const isWeekday = day >= 0 && day <= 4;
    const isWithinTimeRange =
      (hours >= 10 && hours < 17) || (hours === 17 && minutes < 30);

    return isWeekday && isWithinTimeRange;
  }

  executeIsraelInt() {
    if (this.shouldExecuteInterval()) this.followService.fetchIsraelStock();

    const delay = this.getRandomDelay();
    setTimeout(() => this.executeIsraelInt(), delay);
  }
}
