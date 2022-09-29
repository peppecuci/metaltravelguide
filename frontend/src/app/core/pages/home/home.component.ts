import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SessionService } from "../../security/services/session.service";
import { AuthService } from "../../security/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // variables
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(255)]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9]+$')]),
  },  {updateOn: 'submit'});

  // getters
  get isConnected(): boolean {
    return this.sessionService.isConnected();
  }

  //constructor
  constructor(private sessionService: SessionService, private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  //methods
  ngOnInit(): void { }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(data => {
        let token = data["token"];
        this.sessionService.login(token);
        this.router.navigate(["/"]);
        this.toastr.success("Login successful", "Success");
      }, response => {
        this.loginForm.patchValue({password: ""});
        this.loginForm.markAsUntouched();
        this.loginForm.markAsPristine();
        this.toastr.error( "Wrong username or password", "Error");
      });
    }
  }
}
