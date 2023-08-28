import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FollowListComponent } from './components/follow-list/follow-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'blog', component: BlogFormComponent },
  { path: 'blog/:blog-id', component: BlogFormComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'follow-list', component: FollowListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
