import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';
import { SearchsService } from '../../../services/searchs.service';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public totalUsers: number = 0;

  public users: User[] = [];

  public usersTemp: User[] = [];

  public to: number = 0;

  public actualPage: number = 1;

  public totalPages: number = 0;

  public loading: boolean = true;

  public searchActive: boolean = false;

  public mailUser: string = this.userService.user.email;

  public roleUser: string = this.userService.user.role;

  public showModal: boolean = false;

  public userEdit: User;

  public imageUpload: File;

  public imgTemp: any = null;

  public editForm: FormGroup;

  constructor(

    private userService: UsersService,

    private searchService: SearchsService,

    private fileUploadService: FileUploadService,

    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers() {

    this.loading = true;

    this.userService.loafingUsers(this.to).subscribe(resp => {

      this.totalUsers = resp['total'];

      this.totalPages = Math.ceil(this.totalUsers / 5);

      this.users = resp['users'];

      this.usersTemp = resp['users'];

      this.loading = false;

    })

  }

  changePage(newTo: number) {

    this.to += newTo;

    if (newTo === -5 && this.actualPage > 1) {

      this.actualPage -= 1;

    } else if (newTo === 5 && this.actualPage < this.totalPages) {

      this.actualPage += 1;

    }

    if (this.to < 0) {

      this.to = 0;

    } else if (this.to >= this.totalUsers) {

      this.to -= newTo;

    }

    this.loadUsers();

  }

  search(term: string = '') {

    if (term.length === 0) {

      this.searchActive = false;

      this.users = this.usersTemp;

      return;

    }

    this.to = 0;

    this.searchService.search('users', term, this.to).subscribe(resp => {

      this.users = resp;

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

  deleteUser(user: User) {

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Una vez borrado no hay vuelta atrás!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Quiero borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.uid).subscribe(resp => {
          Swal.fire(
            'Borrado!',
            'Has eliminado ese usuario para siempre.',
            'success'
          )
          this.loadUsers();
        });

      }
    })

  }

  changeRole(user: User) {

    this.userService.updateRole(user);

  }

  editUser(user: User) {

    this.showModal = true;
    this.userEdit = user;
    this.editForm = this.fb.group({
      name: [user.name, Validators.required],
      // email: [user.email, Validators.required],
      country: [user.country, Validators.required],
      phone: [user.phone, Validators.required],
      age: [user.age, Validators.required],
      // password: [''],
      desc: [user.desc, Validators.required],
    })


  }

  closeModal() {

    this.showModal = false;


  }

  changeImage(file: File) {

    this.imageUpload = file;

    if (!file) return this.imgTemp = null;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {

      this.imgTemp = reader.result;

    }

  }

  uploadImage() {

    this.fileUploadService.uploadImage(this.imageUpload, 'users', this.userEdit.uid)
      .then(img => {

        this.userEdit.img = img;

        Swal.fire('Guardado', 'Imagen Actualizada', 'success');

      }).catch(error => {

        Swal.fire('Error', error.error.msg, 'error');

      })

  }

  save() {

    this.userService.editUser(this.editForm.value, this.userEdit.uid).subscribe(resp => {

      this.closeModal();

      this.loadUsers();

      this.imgTemp = null;

    }), (error) => {

      Swal.fire('Error', error.error.msg, 'error');

    }

  }

}
