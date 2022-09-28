import { Component, OnInit } from '@angular/core';
import { IUser } from "../../models/IUser";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private user?: IUser;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((data: IUser) => this.user = data);
  }

  get User(): IUser {
    return <IUser>this.user;
  }

}
