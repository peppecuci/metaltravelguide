import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // variables
  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(255)]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9]+$')]),
    confirmPassword: new FormControl("", [Validators.required, RxwebValidators.compare({fieldName: 'password'})])
  },  {updateOn: 'blur'});


  // constructor
  constructor(private auth: AuthService, private session: SessionService, private router: Router, private toastr: ToastrService) {
  }

  // getters

  // methods
  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      this.auth.register(<string>this.registerForm.get("username")?.value, <string>this.registerForm.get("password")?.value).subscribe(() => {
        this.toastr.success("Registration successful", "Success")
        this.auth.login(<string>this.registerForm.get("username")?.value, <string>this.registerForm.get("password")?.value).subscribe(data => {
          let token = data["token"];
          this.session.login(token);
          this.router.navigate(["/"]);
          this.toastr.success("Login successful", "Success")
        });
      });
    }
  }
}
