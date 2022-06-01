import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';

const routes: Routes = [
  
  { path:'home', component: HomeComponent,data:{title:'Home'}},
  { path:'quiz/:category', component: TestComponent,data:{title:'Quiz'}},
  { path:'**',redirectTo: 'home'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
