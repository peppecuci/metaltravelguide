import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SessionService } from "../../security/services/session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // variables
  username: string  = "";

  // constructor
  constructor(private router: Router, private sessionService: SessionService) {}

  // getters
  get Username(): string {
    return this.username;
  }

  get isConnected(): boolean {
    return this.sessionService.isConnected();
  }

  get isAdmin(): boolean {
    return this.sessionService.isAdmin();
  }

  // methods
  ngOnInit(): void {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
      this.username = this.sessionService.getUser(token);
    }
  }

  logout(): void {
    localStorage.clear();
    this.sessionService.logout();
    this.router.navigate(["/"]);
  }
}
