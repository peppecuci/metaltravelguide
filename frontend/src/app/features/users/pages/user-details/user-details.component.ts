import { Component, OnInit } from '@angular/core';
import { IUser } from "../../models/IUser";
import { UsersService } from "../../services/users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private userId?: number;
  private user?: IUser;

  constructor(private userService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.readOne(this.userId).subscribe((data: IUser) => this.user = data);
  }

  get User(): IUser {
    return <IUser>this.user;
  }
}
