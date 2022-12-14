import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { HospitalsComponent } from './manteniment/hospitals/hospitals.component';
import { MedicsComponent } from './manteniment/medics/medics.component';
import { UsersComponent } from './manteniment/users/users.component';
import { PipesModule } from '../pipes/pipes.module';
import { MedicComponent } from './manteniment/medic/medic.component';
import { SearchsComponent } from './searchs/searchs.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    BreadcrumbsComponent,
    CardComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    PublicProfileComponent,
    HospitalsComponent,
    MedicsComponent,
    UsersComponent,
    MedicComponent,
    SearchsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    NgChartsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    BreadcrumbsComponent,
    AccountSettingsComponent,
  ]
})
export class PagesModule { }
