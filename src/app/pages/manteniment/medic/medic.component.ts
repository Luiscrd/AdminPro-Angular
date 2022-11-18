import { Hospital } from './../../../models/hospital.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Medics } from '../../../models/medics.model';
import { MedicService } from '../../../services/medic.service';
import { HospitalServiceService } from '../../../services/hospital-service.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {

  public medic: Medics;

  public userImg = '';

  public medicForm: FormGroup;

  public imageUpload: File;

  public imgTemp: any = null;

  public hospitals: Hospital[] = [];

  public selectedHospital: Hospital;

  constructor(

    private medicService: MedicService,

    private hospitalService: HospitalServiceService,

    private fb: FormBuilder,

    private router: Router,

    private fileUploadService: FileUploadService


  ) { }

  ngOnInit(): void {

    this.loadHospitals();

    this.medicForm = this.fb.group({
      name: ['this.medic.name', Validators.required],
      hospital: ['this.medic.Hospital._id', Validators.required],
    })

    this.medicForm.get('hospital').valueChanges.subscribe(hospitalId => {

      this.selectedHospital = this.hospitals.find(h => h._id === hospitalId);

    })
  }

  loadHospitals() {

    this.hospitalService.loadingHospitals().subscribe(resp => {

      const hospitals = resp['hospitals']
      .map(hospital => new Hospital(hospital.name, hospital.uid, hospital.img, hospital.user))
      this.hospitals = hospitals;

      console.log(this.hospitals);

    })

  }

  save() {

    console.log(this.medicForm.value);

  }

  uploadImage() {

  }

  changeImage(file: File){

  }

}

