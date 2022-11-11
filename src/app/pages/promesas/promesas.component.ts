import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    console.log('Fin del Init');

    this.getUsuarios().then(usuarios => {

      console.log(usuarios);


    })

  }

  getUsuarios() {

    return new Promise(resolve => {

      fetch('https://reqres.in/api/users?page=1')
        .then(resp => resp.json())
        .then(resp => console.log(resp.data));

    })

  }

}
