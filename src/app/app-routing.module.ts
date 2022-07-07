import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{PublicationComponent} from './publication/publication.component' ;
import{HomeComponent} from './home/home.component'
import { CategoryComponent } from './category/category.component';
import { ProfileComponent } from './profile/profile.component';
import { HomedevComponent } from './homedev/homedev.component';
import {UserloginComponent} from'./userlogin/userlogin.component';
import { AddEditPubComponent } from './publication/add-edit-pub/add-edit-pub.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserComponent } from './admin/dashboard/user/user.component';
import { CatComponent } from './admin/dashboard/cat/cat.component';
import { ShowPubComponent } from './publication/show-pub/show-pub.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

import { ChangepassComponent } from './changepass/changepass.component';

const routes: Routes = [
{path:'post',component:ShowPubComponent},
{path:'',component:HomeComponent},
{path:'category',component:CategoryComponent},
{path:'profile/:id' , component:ProfileComponent},
{path:'welcome', component:HomedevComponent},
{path:'userlogin', component:UserloginComponent},
{path :'addpost', component:AddEditPubComponent},
{path :'admin', component:AdminComponent},
{path:'admin/dashboard', component:DashboardComponent},
{path:'changepassword', component:ChangepassComponent},
{path:'edit/:id', component:EditProfileComponent},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
