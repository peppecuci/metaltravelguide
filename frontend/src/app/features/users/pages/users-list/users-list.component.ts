import { Component, OnInit } from '@angular/core';
import { IUser } from "../../models/IUser";
import { UsersService } from "../../services/users.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private users: IUser[] = [];

  constructor(private service: UsersService) {
  }

  ngOnInit(): void {
    this.service.readAll().subscribe((data: IUser[]) => this.users = data);
  }

  get Users(): IUser[] {
    return this.users;
  }
}
