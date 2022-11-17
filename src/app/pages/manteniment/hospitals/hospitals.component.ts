import { Component, OnInit } from '@angular/core';
import { HospitalServiceService } from '../../../services/hospital-service.service';
import { Hospital } from '../../../models/hospital.model';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../../services/file-upload.service';

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

    private hospitalService: HospitalServiceService,

    private fileUploadService: FileUploadService

  ) { }

  ngOnInit(): void {

    this.getHoispitals();

  }

  getHoispitals() {

    this.loading = true;

    this.hospitalService.loadingHospitals(this.to).subscribe(resp => {

      this.hopitals = resp['hospitals'].map(hopital => new Hospital(hopital.name, hopital.uid, hopital.img, hopital.user))
      this.total = resp['total']
      this.loading = false;

      console.log(resp['hospitals']);


    })

  }

  saveChanges(hospital: Hospital) {

    this.hospitalService.updateHospital(hospital).subscribe(resp => {

      Swal.fire({
        icon: 'success',
        title: 'Hospital Actualizado',
        showConfirmButton: false,
      })
    })

  }

  deleteHospital(hospital: Hospital) {

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Una vez borrado no se podrá recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Siii! QUiero borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(hospital).subscribe(resp => {
          this.getHoispitals();
          Swal.fire(
            'Borrado!',
            'Lo has eliminado para siemre.',
            'success'
          )

        })
      }
    })
  }

  async createHospital() {

    const { value: name } = await Swal.fire({
      title: 'Crear Hospital',
      input: 'text',
      inputLabel: 'Nombre del Hospital',
      inputPlaceholder: 'Escribe el nombre'
    })

    if (name) {
      this.hospitalService.createHospital(name).subscribe(resp => {
        const id = resp['hospital'].uid;
        this.updateImage(id);

        // this.getHoispitals();
        // Swal.fire(
        //   'Guardado!',
        //   `El Hospital ${name} se ha guardado correctamente`,
        //   'success'
        // )
      })
    }
  }

  async updateImage(id: string) {
    const { value: file } = await Swal.fire({
      title: 'Carga la foto',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Ahora sube tu foto'
      }
    })

    if (file && id) {
      const reader = new FileReader()
      reader.onload = (e) => {
      this.fileUploadService.uploadImage(file, 'hospitals', id)

        Swal.fire({
          title: 'Esta es tu Imagen',
          imageUrl: e.target.result.toString(),
          imageAlt: 'Subida correctamente'
        })
      }
      reader.readAsDataURL(file);
    }
    setTimeout(() => {
      this.getHoispitals();
    }, 1000);
  }

}
