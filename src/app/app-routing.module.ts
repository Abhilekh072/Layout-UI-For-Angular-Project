import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollegeComponent } from './components/college/college.component';
import { GroupComponent } from './components/group/group.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { SchoolComponent } from './components/school/school.component';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {path:'', component:LayoutComponent, 
  children:[
    {
      path:'', component :HomeComponent
    },
    { path:'post', component:PostComponent},
    {path:'group', component: GroupComponent},
    {path:'school', component: SchoolComponent},
    {path:'college', component: CollegeComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
