import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm = this.fb.group({
    name: ['Luis Carballo', [Validators.required, Validators.minLength(3)]],
    email: ['test1@gamil.com', [Validators.required, Validators.minLength(3), Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    password2: ['123456', [Validators.required, Validators.minLength(6)]],
    term: [true, [Validators.requiredTrue]],
  }, {
    validators: this.psswcoin('password', 'password2')
  });

  public formSubmited = false;
  public messageErrorName = '';
  public messageErrorEmail = '';
  public messageErrorPassword = '';
  public messageErrorPassword2 = '';
  public messageErrorTermn = '';

  // public registerForm = this.fb.group({
  //   name: ['', [Validators.required, Validators.minLength(3)]],
  //   email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  //   password2: ['', [Validators.required, Validators.minLength(6)]],
  //   term: [false, [ Validators.requiredTrue]],
  // });

  constructor(

    private fb: FormBuilder,

    private userService: UsersService,

    private router: Router

  ) { }

  createUser() {

    this.formSubmited = true;

    if (!this.registerForm.valid) return;

    this.userService.createUser(this.registerForm.value).subscribe({
      next: (resp) => {
        localStorage.setItem('adminProJWT', resp['jwt']);
        localStorage.setItem('menu', JSON.stringify(resp['menu']));
      },
      error: (error) => {
        console.warn(error.error.msg)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          confirmButtonColor: '#398bf7',
          text: error.error.msg,
        })
      },
      complete: () => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado correctamente',
          confirmButtonColor: '#398bf7',
        }).then((result) => {

          if (result.isConfirmed) this.router.navigateByUrl('/dashboard');

        })
      }

    })

  }



  noValidimput(input: string): boolean {

    if (this.registerForm.get(input).invalid && this.formSubmited) {

      switch (input) {
        case 'name':
          if (this.registerForm.get(input).errors.required) {

            this.messageErrorName = `* El ${input} es obligatorio.`

          } else if (this.registerForm.get(input).errors.minlength) {

            this.messageErrorName = `* El ${input} debe tener al menos 3 car.`
          } else {

            this.messageErrorName = '';

          }
          break;

        case 'email':
          if (this.registerForm.get(input).errors.required) {

            this.messageErrorEmail = `* El ${input} es obligatorio.`;

          } else if (this.registerForm.get(input).errors.minlength) {

            this.messageErrorEmail = `* El ${input} debe tener al menos 3 car.`;

          } else if (this.registerForm.get(input).errors.email) {

            this.messageErrorEmail = `* El formato del ${input} no es correcto.`;

          } else {

            this.messageErrorEmail = '';

          }
          break;

        case 'password':
          if (this.registerForm.get(input).errors.required) {

            this.messageErrorPassword = `* El password 1 es obligatorio.`;

          } else if (this.registerForm.get(input).errors.minlength) {

            this.messageErrorPassword = `* El password 1 debe tener al menos 3 car.`;

          } else {

            this.messageErrorPassword = '';

          }

        case 'password2':
          if (this.registerForm.get(input).errors.required) {

            this.messageErrorPassword2 = `* El password 2 es obligatorio.`;

          } else if (this.registerForm.get(input).errors.minlength) {

            this.messageErrorPassword2 = `* El password 2 debe tener al menos 3 car.`;

          } else if (this.registerForm.get(input).errors.noMachPasswords) {

            this.messageErrorPassword2 = `* Los passwords beben ser iguales.`;

          } else {

            this.messageErrorPassword2 = '';

          }

        case 'term':
          if (this.registerForm.get(input).errors.required) {

            this.messageErrorTermn = `* Debes aceptar los terminos`;

          } else {

            this.messageErrorTermn = '';

          }
          break;

        default:
          break;
      }

      return true;

    } else {

      return false;

    }

  }


  psswcoin(pass1: string, pass2: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control.value === pass2Control.value) {

        pass2Control.setErrors(null);

      } else {

        pass2Control.setErrors({ noMachPasswords: true });

      }

    }

  }

}
