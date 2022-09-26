import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { Country } from "../../../enums/Country";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // variables
  public countryEnum = Country;
  private countries : [string, Country][] = [];

  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern('^[a-z0-9\\_]+$')]),
    mail: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9]+$')]),
    confirmPassword: new FormControl("", [Validators.required, RxwebValidators.compare({fieldName: 'password'})]),
    firstName: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255), Validators.pattern('^([A-Z][A-Za-z ,.\'`-]{3,30})$')]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255), Validators.pattern('^([A-Z][A-Za-z ,.\'`-]{3,30})$')]),
    countryIso: new FormControl("Choose a country...", [Validators.required, Validators.maxLength(2)])
  },  {updateOn: 'blur'});


  // constructor
  constructor(private auth: AuthService, private session: SessionService, private router: Router) {
    this.countries = Object.entries(this.countryEnum);
  }

  // getters
  get Countries(): [string, Country][] {
    return this.countries;
  }

  // methods
  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe(() => {
        this.auth.login(<string>this.registerForm.get("username")?.value, <string>this.registerForm.get("password")?.value).subscribe(data => {
          let token = data["token"];
          this.session.login(token);
          this.router.navigate(["/"]);
        });
      });
    }
  }
}
