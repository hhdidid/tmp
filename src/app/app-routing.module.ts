import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

// Route, a inteface.
const routes: Routes = [
  // Route objects
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // default page
  { path: 'home', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
