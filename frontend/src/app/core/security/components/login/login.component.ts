import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { SessionService } from "../../services/session.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // variables
  username: string = "";
  password: string = "";

  // constructor
  constructor(private authService: AuthService, private sessionService: SessionService, private router: Router, private toastr: ToastrService) { }

  // methods
  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(data => {
      let token = data["token"];
      this.sessionService.login(token);
      this.router.navigate(["/"]);
      this.toastr.success("Login successful", "Success")
    });
  }
}
