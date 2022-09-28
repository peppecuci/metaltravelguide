import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SessionService } from "../../security/services/session.service";
import { AuthService } from "../../security/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // variables
  username: string = "";
  password: string = "";

  // getters
  get isConnected(): boolean {
    return this.sessionService.isConnected();
  }

  //constructor
  constructor(private sessionService: SessionService, private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  //methods
  ngOnInit(): void { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(data => {
      let token = data["token"];
      this.sessionService.login(token);
      this.router.navigate(["/"]);
      this.toastr.success("Login successful", "Success")
    });
  }
}
