import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {

  public showModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
