import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RigtsidebarComponent } from './rigtsidebar/rigtsidebar.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    RigtsidebarComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    RigtsidebarComponent
  ]
})
export class SharedModule { }
