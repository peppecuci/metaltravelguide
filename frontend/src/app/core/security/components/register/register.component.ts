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
    username: new FormControl("", [Validators.required, Validators.min(3)]),
    password: new FormControl("", [Validators.required, Validators.min(4)]),
    repeatPassword: new FormControl("", [Validators.required, Validators.min(4)])
  });

  // constructor
  constructor(private _auth: AuthService, private _session: SessionService, private _router: Router) { }

  // methods
  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.get("password")?.value === this.registerForm.get("repeatPassword")?.value) {
      this._auth.register(<string>this.registerForm.get("username")?.value, <string>this.registerForm.get("password")?.value).subscribe(_ => {
        this._auth.login(<string>this.registerForm.get("username")?.value, <string>this.registerForm.get("password")?.value).subscribe(data => {
          let token = data["token"];
          this._session.login(token);
          this._router.navigate(["/"]);
        });
      });
    }
  }
}
