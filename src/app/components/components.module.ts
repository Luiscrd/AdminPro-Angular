import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementComponent } from './increment/increment.component';
import { FormsModule } from '@angular/forms';
import { ProgrsbarComponent } from './progrsbar/progrsbar.component';
import { DonaComponent } from './dona/dona.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    IncrementComponent,
    ProgrsbarComponent,
    DonaComponent
  ],
  exports: [
    IncrementComponent,
    ProgrsbarComponent,
    DonaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
