import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { CupComponent } from './cup/cup.component';
import { DetailComponent } from './detail/detail.component';
import { MainComponent } from './main/main.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/blog', pathMatch:'full' },
  { path: 'blog', component: MainComponent },
  { path: 'iletisim', component: ContactComponent },
  { path: 'fincandibi', component: CupComponent },
  { path: 'detail/:title', component: DetailComponent },
  {path: '404', component: ErrorComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
