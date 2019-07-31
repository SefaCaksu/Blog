import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr'; 
import { QuillModule } from 'ngx-quill';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { DetailComponent } from './detail/detail.component';
import { MainComponent } from './main/main.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { RightbarComponent } from './rightbar/rightbar.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ArticleListComponent } from './admin/article-list/article-list.component';
import { ArticleAddComponent } from './admin/article-add/article-add.component';
import { CategoryComponent } from './admin/category/category.component';
import { TagComponent } from './admin/tag/tag.component';
import { LoginComponent } from './login/login.component';

import { ProfileService } from './services/profile.service';
import { CategoryService } from './services/category.service';
import { TagService } from './services/tag.service';
import { ArticleService } from './services/article.service';
import { AuthService } from './services/auth.service';
import { ErrorInterceptor } from './services/error.interceptor.service';
import { ArticlesComponent } from './articles/articles.component';


const toolbarOptions = [
  { size: [ 'small', false, 'large', 'huge' ]},
  {},
  'bold',
  'italic',
  'underline',
  'strike',
  'link',
  'image',
  {},
  { 'color': [] },
  { 'background': [] },
  {},
  { 'indent': '-1'},
  { 'indent': '+1' },
  { 'list': 'ordered'},
  { 'list': 'bullet' },
  { 'align': [] },
  {},
  'code-block',
  'clean'
];


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    DetailComponent,
    MainComponent,
    LeftbarComponent,
    RightbarComponent,
    HeaderComponent,
    ErrorComponent,
    AdminComponent,
    ProfileComponent,
    ArticleListComponent,
    ArticleAddComponent,
    CategoryComponent,
    TagComponent,
    LoginComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  
    ToastrModule.forRoot(),
    QuillModule.forRoot({
      modules:{
        syntax: true,
        toolbar: [toolbarOptions],
      }
    }
    ),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    ProfileService,
    CategoryService,
    TagService,
    ArticleService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
