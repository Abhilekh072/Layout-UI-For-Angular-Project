import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { GroupComponent } from './group/group.component';
import { SchoolComponent } from './school/school.component';
import { CollegeComponent } from './college/college.component';


@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    GroupComponent,
    SchoolComponent,
    CollegeComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    SharedModule
  ]
})
export class ComponentsModule { }
