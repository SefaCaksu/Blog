import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
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
import { AuthService } from './services/auth.service';
import { ArticlesComponent } from './articles/articles.component';

const routes: Routes = [
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  { path: 'blog', component: MainComponent },
  { path: 'iletisim', component: ContactComponent },
  { path: 'code', component: ArticlesComponent },
  { path: 'fincandibi', component: ArticlesComponent },
  { path: 'tags/:id/:title', component: ArticlesComponent },
  { path: 'categories/:id/:title', component: ArticlesComponent },
  { path: 'detail/:id/:title', component: DetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate : [AuthService] },
  { path: 'admin/profile', component: ProfileComponent, canActivate : [AuthService] },
  { path: 'admin/articlelist', component: ArticleListComponent, canActivate : [AuthService] },
  { path: 'admin/articleadd', component: ArticleAddComponent, canActivate : [AuthService] },
  { path: 'admin/articleadd/:id', component: ArticleAddComponent, canActivate : [AuthService] },
  { path: 'admin/category', component: CategoryComponent , canActivate : [AuthService]},
  { path: 'admin/tag', component: TagComponent, canActivate : [AuthService] },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
