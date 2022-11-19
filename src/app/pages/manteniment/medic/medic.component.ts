import { Hospital } from './../../../models/hospital.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Routes, ActivatedRoute } from '@angular/router';
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

  public medicImg = '';

  public medicForm: FormGroup;

  public imageUpload: File;

  public imgTemp: any = null;

  public hospitals: Hospital[] = [];

  public selectedHospital: Hospital;

  public noValidForm: boolean = true;

  constructor(

    private medicService: MedicService,

    private hospitalService: HospitalServiceService,

    private fb: FormBuilder,

    private router: Router,

    private fileUploadService: FileUploadService,

    private activatedRoute: ActivatedRoute,


  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.loadMedic(id);
    })

    this.loadHospitals();

    this.medicForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    })

    this.medicForm.get('hospital').valueChanges.subscribe(hospitalId => {

      this.selectedHospital = this.hospitals.find(h => h._id === hospitalId);

    })
  }

  loadMedic(id: string) {

    if (id === 'new') return;

    this.medicService.medicByID(id).subscribe(medic => {

      this.medic = new Medics(medic.name, medic.uid, medic.img, medic.user, medic.hospital );

      this.medicForm.setValue({name: medic.name, hospital: medic.hospital._id});

      this.noValidForm = false;

    })


  }

  loadHospitals() {

    this.hospitalService.loadingHospitals().subscribe(resp => {

      const hospitals = resp['hospitals']
      .map(hospital => new Hospital(hospital.name, hospital.uid, hospital.img, hospital.user))
      this.hospitals = hospitals;

    })

  }

  save() {

    this.medicService.createNewMedics(
      this.medicForm.get('name').value,
      this.medicForm.get('hospital').value,
      ).subscribe(resp => {
        if (resp['ok']) {
          this.fileUploadService.uploadImage(this.imageUpload, 'medics', resp['medic'].uid).then(rep => {
            this.router.navigateByUrl('/dashboard/medics')
          })
        }
      })

  }

  uploadImage() {

  }

  changeImage(file: File){

    this.imageUpload = file;

    this.noValidForm = false;

    if(!file) return this.imgTemp = null;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {

      this.imgTemp = reader.result;


    }

  }

}

