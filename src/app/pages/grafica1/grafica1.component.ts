import { Component } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public data1: ChartData<'doughnut'> = {
    labels: [
      'Coches',
      'Motos',
      'Bicicletas',
    ],
    datasets: [
      {
        data: [100, 200, 50],
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
      },
    ]
  };

  public data2: ChartData<'doughnut'> = {
    labels: [
      'Pan',
      'Refrescos',
      'Tacos',
    ],
    datasets: [
      {
        data: [10, 15, 40],
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
      },
    ]
  };

  public data3: ChartData<'doughnut'> = {
    labels: [
      'Vue',
      'Angular',
      'React',
    ],
    datasets: [
      {
        data: [200, 350, 400],
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
      },
    ]
  };

  public data4: ChartData<'doughnut'> = {
    labels: [
      'Mac',
      'Windows',
      'Linux',
    ],
    datasets: [
      {
        data: [350, 100, 600],
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
      },
    ]
  };

}
