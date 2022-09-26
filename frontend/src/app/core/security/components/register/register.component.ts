import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // variables
  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern('^[a-z0-9\\_]+$')]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9]+$')]),
    confirmPassword: new FormControl("", [Validators.required])
  },  {updateOn: 'blur'});

  private isClicked: boolean = false;
  private wasSent: boolean = false;

  // constructor
  constructor(private auth: AuthService, private session: SessionService, private router: Router) { }

  // getters
  get IsClicked(): boolean {
    return this.isClicked;
  }

  get WasSent(): boolean {
    return this.wasSent;
  }

  // methods
  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid && (this.registerForm.get("password")?.value === this.registerForm.get("confirmPassword")?.value)) {
      this.isClicked = false;
      this.wasSent = true;
      this.auth.register(<string>this.registerForm.get("username")?.value, <string>this.registerForm.get("password")?.value).subscribe(_ => {
        this.auth.login(<string>this.registerForm.get("username")?.value, <string>this.registerForm.get("password")?.value).subscribe(data => {
          let token = data["token"];
          this.session.login(token);
          this.router.navigate(["/"]);
        });
      });
    }
    else {
      this.isClicked = true;
      this.wasSent = false;
    }
  }
}
