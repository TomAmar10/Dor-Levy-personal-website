import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PrivateLessonComponent } from './components/private-lesson/private-lesson.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { FollowListComponent } from './components/follow-list/follow-list.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { LinksPageComponent } from './components/links-page/links-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContactService } from './components/contact/contact.service';
import { FollowListService } from './services/follow-list.service';
import { BlogService } from './services/blog.service';
import { ArticlePageComponent } from './components/single-blog/single-blog.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BgTextComponent } from './components/bg-text/bg-text.component';
import { ButtonComponent } from './components/button/button.component';
import { FooterComponent } from './components/footer/footer.component';
import { TermsComponent } from './components/terms/terms.component';
import { LanguageService } from './services/language-service';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { LanguageButtonComponent } from './components/language-button/language-button.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    PrivateLessonComponent,
    BenefitsComponent,
    AboutMeComponent,
    BlogsComponent,
    FollowListComponent,
    CalculatorComponent,
    LinksPageComponent,
    ContactComponent,
    ArticlePageComponent,
    BgTextComponent,
    ButtonComponent,
    FooterComponent,
    TermsComponent,
    BlogCardComponent,
    LanguageButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule,
  ],
  providers: [ContactService, FollowListService, BlogService, LanguageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
