import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SessionService } from "../../security/services/session.service";
import { IUser } from "../../../features/users/models/IUser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // constructor
  constructor(private router: Router, private sessionService: SessionService) {}

  // getters
  get User(): IUser {
    return this.sessionService.User;
  }

  get Username(): string {
    const token = localStorage.getItem("token");
    if(token)
      return this.sessionService.getUsername(token);
    else
      return "";
  }

  get isConnected(): boolean {
    return this.sessionService.isConnected();
  }

  get isAdmin(): boolean {
    return this.sessionService.isAdmin();
  }

  // methods
  ngOnInit(): void {
  }

  public logout(): void {
    localStorage.clear();
    this.sessionService.logout();
    this.router.navigate(["/"]);
  }
}
