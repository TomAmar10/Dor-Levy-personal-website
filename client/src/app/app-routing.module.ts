import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { ArticlePageComponent } from './components/single-blog/single-blog.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ContactComponent } from './components/contact/contact.component';
import { FollowListComponent } from './components/follow-list/follow-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LinksPageComponent } from './components/links-page/links-page.component';
import { PrivateLessonComponent } from './components/private-lesson/private-lesson.component';
import { TermsComponent } from './components/terms/terms.component';

const routes: Routes = [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'private-lesson', component: PrivateLessonComponent },
      { path: 'benefits', component: BenefitsComponent },
      { path: 'about', component: AboutMeComponent },
      { path: 'blog/:blog-name/:blog-id', component: ArticlePageComponent },
      { path: 'blogs/:blog-subject', component: BlogsComponent },
      { path: 'blogs', redirectTo: 'blogs/crypto-coins' },
      { path: 'follow-list', component: FollowListComponent },
      { path: 'calculator', component: CalculatorComponent },
      { path: 'links', component: LinksPageComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'terms&conditions', component: TermsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
