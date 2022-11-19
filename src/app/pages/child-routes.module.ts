import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { MedicsComponent } from './manteniment/medics/medics.component';
import { HospitalsComponent } from './manteniment/hospitals/hospitals.component';
import { UsersComponent } from './manteniment/users/users.component';
import { MedicComponent } from './manteniment/medic/medic.component';
import { SearchsComponent } from './searchs/searchs.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
  { path: 'main', component: DashboardComponent, data: { titulo: 'Main' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas' } },
  { path: 'accountsettings', component: AccountSettingsComponent, data: { titulo: 'Setting' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
  { path: 'profile', component: PublicProfileComponent, data: { titulo: 'Mi perfil' } },
  { path: 'editprofile', component: ProfileComponent, data: { titulo: 'Editar perfi' } },
  // RUTAS PROTEGIDAS
  { path: 'medics', component: MedicsComponent, canActivate: [AdminGuard], data: { titulo: 'Mantenimiento de Medicos' } },
  { path: 'medic/:id', component: MedicComponent, canActivate: [AdminGuard], data: { titulo: 'Gestionar Medico' } },
  { path: 'hospitals', component: HospitalsComponent, canActivate: [AdminGuard], data: { titulo: 'Mantenimiento de Hospitales' } },
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard], data: { titulo: 'Mantenimiento de Usuarios' } },
  { path: 'search/:termn', component: SearchsComponent, canActivate: [AdminGuard], data: { titulo: 'Busqueda' } },
]


@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
