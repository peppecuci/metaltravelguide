import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { SessionService } from "../../services/session.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // variables
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(255)]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9]+$')]),
  },  {updateOn: 'submit'});

  // constructor
  constructor(private authService: AuthService, private sessionService: SessionService, private router: Router, private toastr: ToastrService) { }

  // methods
  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm){
      this.authService.login(this.loginForm.value).subscribe(data => {
        let token = data["token"];
        this.sessionService.login(token);
        this.router.navigate(["/"]);
        this.toastr.success("Login successful", "Success");
      }, error => {
        this.loginForm.get("password")?.setValue("");
        this.loginForm.markAsUntouched();
        this.loginForm.markAsPristine();
        this.toastr.error( "Wrong e-mail or password", "Error");
      });
    }
  }
}
