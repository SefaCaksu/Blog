import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { CupComponent } from './cup/cup.component';
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

import { ProfileService } from './services/profile.service';
import { CategoryService } from './services/category.service';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    CupComponent,
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
    TagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  
    ToastrModule.forRoot() 
  ],
  providers: [
    ProfileService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
