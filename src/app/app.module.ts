import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicationComponent } from './publication/publication.component';
import { AddEditPubComponent } from './publication/add-edit-pub/add-edit-pub.component';
import { ShowPubComponent } from './publication/show-pub/show-pub.component';
import { SharedService} from './services/shared.service';
import {HttpClientModule} from '@angular/common/http' ; 

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { CategoryComponent } from './category/category.component';
import { ProfileComponent } from './profile/profile.component';
import { HomedevComponent } from './homedev/homedev.component';
import { ShowCatComponent } from './category/show-cat/show-cat.component';
import { AddEditCatComponent } from './category/add-edit-cat/add-edit-cat.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserComponent } from './admin/dashboard/user/user.component';
import { AddUserComponent } from './admin/dashboard/user/add-user/add-user.component';
import { CatComponent } from './admin/dashboard/cat/cat.component';
import { AddComponent } from './admin/dashboard/cat/add/add.component';
import { AnsComponent } from './publication/ans/ans.component';

import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

import { ChangepassComponent } from './changepass/changepass.component';
import { StatisticComponent } from './admin/dashboard/statistic/statistic.component';
import { PostComponent } from './admin/dashboard/post/post.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FirstchartComponent } from './admin/dashboard/charts/firstchart/firstchart.component'; 




import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgChartsModule } from 'ng2-charts';

import { DoughnutChartComponent } from './admin/dashboard/charts/doughnut-chart/doughnut-chart.component';
import { BarchartComponent } from './admin/dashboard/charts/barchart/barchart.component';




const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'publication', component: PublicationComponent },
];
@NgModule({
  
  declarations: [
    AppComponent,
    PublicationComponent,
    AddEditPubComponent,
    ShowPubComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    ProfileComponent,
    HomedevComponent,
    ShowCatComponent,
    AddEditCatComponent,
    UserloginComponent,
    AdminComponent,
    DashboardComponent,
    UserComponent,
    AddUserComponent,
    CatComponent,
    AddComponent,
    AnsComponent,
  
    
    EditProfileComponent,
       
         ChangepassComponent,
         StatisticComponent,
         PostComponent,
         FirstchartComponent,
         DoughnutChartComponent,
         BarchartComponent,
        
         
  


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } 
    ),

    
    AngularEditorModule ,
    NgChartsModule,
  
    
    
   
   
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
