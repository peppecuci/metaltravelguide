import { Component, OnInit } from '@angular/core';
import { IUser } from "../../models/IUser";
import { UsersService } from "../../services/users.service";
import {ActivatedRoute} from "@angular/router";
import {SessionService} from "../../../../core/security/services/session.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private userId?: number;
  private user?: IUser;

  // constructor
  constructor(private userService: UsersService, private route: ActivatedRoute) { }

  // getters
  get User(): IUser {
    return <IUser>this.user;
  }

  // methods
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.readOne(this.userId).subscribe((data: IUser) => this.user = data);
  }
}
