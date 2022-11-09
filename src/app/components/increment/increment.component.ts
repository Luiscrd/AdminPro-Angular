import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styleUrls: ['./increment.component.css']
})
export class IncrementComponent {

  @Input() progreso: number = 50;
  @Input() color: string = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor( valor: number ): any {
    if(this.progreso === 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if(this.progreso === 0 && valor <= 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange( valor: number ){

    if(valor > 100 ) return this.valorSalida.emit(100)
    if(valor < 0 ) return this.valorSalida.emit(0)
    this.valorSalida.emit(valor)

  }

}
