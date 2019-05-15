import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { CupComponent } from './cup/cup.component';
import { DetailComponent } from './detail/detail.component';
import { MainComponent } from './main/main.component';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ArticleListComponent } from './admin/article-list/article-list.component';
import { ArticleAddComponent } from './admin/article-add/article-add.component';
import { CategoryComponent } from './admin/category/category.component';
import { TagComponent } from './admin/tag/tag.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  { path: 'blog', component: MainComponent },
  { path: 'iletisim', component: ContactComponent },
  { path: 'fincandibi', component: CupComponent },
  { path: 'detail/:title', component: DetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/profile', component: ProfileComponent },
  { path: 'admin/articlelist', component: ArticleListComponent },
  { path: 'admin/articleadd', component: ArticleAddComponent },
  { path: 'admin/category', component: CategoryComponent },
  { path: 'admin/tag', component: TagComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
