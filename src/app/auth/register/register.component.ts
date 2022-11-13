import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

public registerForm = this.fb.group({
  name: ['Luis Carballo', [ Validators.required, Validators.minLength(3) ]],
  email: ['test1@gamil.com', [ Validators.required, Validators.minLength(3), Validators.email ]],
  password1: ['123456', [ Validators.required, Validators.minLength(6) ]],
  password2: ['123456', [ Validators.required, Validators.minLength(6) ]],
  term: [false, [ Validators.required ]],
});

constructor(

  private fb: FormBuilder

) {}

createUser() {

  console.log(this.registerForm.value);

}

}
