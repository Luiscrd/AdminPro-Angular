import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { SearchsService } from 'src/app/services/searchs.service';
import Swal from 'sweetalert2';
import { Medics } from '../../../models/medics.model';
import { MedicService } from '../../../services/medic.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.css']
})
export class MedicsComponent implements OnInit {

  public medics: Medics[] = [];

  public medicsTemp: Medics[] = [];

  public total: number = 0;

  public to: number = 0;

  public loading: boolean = true;

  public searchActive: boolean = false;

  constructor(

    private medicslService: MedicService,

    private fileUploadService: FileUploadService,

    private searchService: SearchsService,

  ) { }

  ngOnInit(): void {

    this.getMedics()
  }

  search(term: string = '') {

    if (term.length === 0) {

      this.searchActive = false;

      this.medics = this.medicsTemp;


      return;

    }

    this.to = 0;

    this.searchService.search('medics', term, this.to).subscribe(resp => {


      this.medics = resp;

      // const total = resp['total'];

      // if( total === 0 ) {
      //   this.actualPage = 1;
      //   this.totalPages = 1;
      // }

      // if ( total > 5 ) {
      //   this.totalPages = total / 5;
      // }

      this.searchActive = true;
    })

  }

  getMedics() {

    this.loading = true;

    this.medicslService.loadingMedics(this.to).subscribe(resp => {

      this.medics = resp['medics'].map(medic => new Medics(medic.name, medic.uid, medic.img, medic.user))
      this.total = resp['total']
      this.loading = false;
      this.medicsTemp = this.medics;

    })

  }

  saveChanges(medic: Medics) {

    this.medicslService.updateMedics(medic).subscribe(resp => {

      Swal.fire({
        icon: 'success',
        title: 'Medico Actualizado',
        showConfirmButton: false,
      })
    })

  }

  deleteMedic(medic: Medics) {

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
        this.medicslService.deleteMedics(medic).subscribe(resp => {
          this.getMedics();
          Swal.fire(
            'Borrado!',
            'Lo has eliminado para siemre.',
            'success'
          )

        })
      }
    })
  }

  async createMedic() {

    const { value: name } = await Swal.fire({
      title: 'Crear Medico',
      input: 'text',
      inputLabel: 'Nombre del Medico',
      inputPlaceholder: 'Escribe el nombre'
    })

    if (name) {
      this.medicslService.createMedics(name).subscribe(resp => {
        const id = resp['medic'].uid;
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
      const resp = this.fileUploadService.uploadImage(file, 'medics', id)

      console.log(resp);


        Swal.fire({
          title: 'Esta es tu Imagen',
          imageUrl: e.target.result.toString(),
          imageAlt: 'Subida correctamente'
        })
      }
      reader.readAsDataURL(file);
    }
    setTimeout(() => {
      this.getMedics();
    }, 1000);
  }


}
