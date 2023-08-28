import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FollowListComponent } from './components/follow-list/follow-list.component';
import { AuthComponent } from './components/auth/Auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    SingleBlogComponent,
    BlogFormComponent,
    ContactsComponent,
    FollowListComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
