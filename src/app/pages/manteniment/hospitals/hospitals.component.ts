import { Component, OnInit } from '@angular/core';
import { HospitalServiceService } from '../../../services/hospital-service.service';
import { Hospital } from '../../../models/hospital.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  public hopitals: Hospital[] = [];

  public total: number = 0;

  public to: number = 0;

  public loading: boolean = true;



  constructor(

    private hospitalService: HospitalServiceService

  ) { }

  ngOnInit(): void {

    this.getHoispitals();

  }

  getHoispitals() {

    this.loading = true;

    this.hospitalService.loadingHospitals(this.to).subscribe(resp => {

      this.hopitals = resp['hospitals'].map(hopital => new Hospital(hopital.name, hopital._id, hopital.img, hopital.user))
      this.total = resp['total']
      this.loading = false;

    })

  }

}
