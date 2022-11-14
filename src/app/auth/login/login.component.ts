import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { environment } from '../../../environments/environment.prod';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef;

  public loginForm: FormGroup;

  public formSubmited = false;

  public messageErrorEmail = '';

  public messageErrorPassword = '';

  private email = localStorage.getItem('email');


  constructor(

    private fb: FormBuilder,

    private userService: UsersService,

    private router: Router

  ) {

    // this.loginForm = this.fb.group({
    //   email: ['test1@gamil.com', [Validators.required, Validators.minLength(3), Validators.email]],
    //   password: ['123456', [Validators.required, Validators.minLength(6)]],
    //   rec: [false, []],
    // });

    this.loginForm = this.fb.group({
      email: [this.email || '', [Validators.required, Validators.minLength(3), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rec: [this.email ? true : false, []],
    });

  }

  ngAfterViewInit(): void {

   this.googleInit();

  }

  googleInit() {

    google.accounts.id.initialize({
      client_id: environment.GOOGLE_ID,
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );

    // google.accounts.id.prompt(); // also display the One Tap dialog

  }

  handleCredentialResponse(response: any) {

    // console.log("Encoded JWT ID token: " + response.credential);

    this.userService.loginGoogle(response.credential).subscribe({
      next: (resp) => {
        localStorage.setItem('adminProJWT', resp['jwt']);
        localStorage.removeItem('email');
        // localStorage.setItem('email', resp['user'].email);
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

        this.router.navigateByUrl('/dashboard');

      }

    })

  }

  login() {

    this.formSubmited = true;

    if (!this.loginForm.valid) return;

    this.userService.loginUser(this.loginForm.value).subscribe({
      next: (resp) => {
        localStorage.setItem('adminProJWT', resp['jwt']);
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

        if (this.loginForm.get('rec').value) {

          localStorage.setItem('email',this.loginForm.get('email').value);

        } else {

          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/dashboard');

      }

    })

  }

  seendPassword() {
    Swal.fire({
      title: 'Introduce tu dirección de correo',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar Password',
      confirmButtonColor: '#398bf7',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Pasword enviado');
      }
    })
  }

  noValidimput(input: string): boolean {

    if (this.loginForm.get(input).invalid && this.formSubmited) {

      switch (input) {

        case 'email':
          if (this.loginForm.get(input).errors.required) {

            this.messageErrorEmail = `* El ${input} es obligatorio.`;

          } else if (this.loginForm.get(input).errors.minlength) {

            this.messageErrorEmail = `* El ${input} debe tener al menos 3 car.`;

          } else if (this.loginForm.get(input).errors.email) {

            this.messageErrorEmail = `* El formato del ${input} no es correcto.`;

          } else {

            this.messageErrorEmail = '';

          }
          break;

        case 'password':
          if (this.loginForm.get(input).errors.required) {

            this.messageErrorPassword = `* El password 1 es obligatorio.`;

          } else if (this.loginForm.get(input).errors.minlength) {

            this.messageErrorPassword = `* El password 1 debe tener al menos 3 car.`;

          } else {

            this.messageErrorPassword = '';

          }

        default:
          break;
      }

      return true;

    } else {

      return false;

    }

  }

}
