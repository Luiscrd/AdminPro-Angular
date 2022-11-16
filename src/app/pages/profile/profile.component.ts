import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User;

  public userImg = '';

  public profileForm: FormGroup;

  public imageUpload: File;

  constructor(

    private userService: UsersService,

    private fb: FormBuilder,

    private router: Router,

    private fileUploadService: FileUploadService

  ) {

    this.user = userService.user;

    this.userImg = userService.user.ImageUrl;

   }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      // email: [this.user.email, Validators.required],
      country: [this.user.country, Validators.required],
      phone: [this.user.phone, Validators.required],
      age: [this.user.age, Validators.required],
      // password: [''],
      desc: [this.user.desc, Validators.required],
    })
  }

  save() {

    this.userService.updateUser(this.profileForm.value);

  }

  changeImage(file: File){

    this.imageUpload = file;

  }

  uploadImage() {

    this.fileUploadService.uploadImage(this.imageUpload, 'users', this.user.uid)
    .then(img => this.user.img = img)
  }

}
