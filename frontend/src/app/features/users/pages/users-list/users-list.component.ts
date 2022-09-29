import { Component, OnInit } from '@angular/core';
import { IUser } from "../../models/IUser";
import { UsersService } from "../../services/users.service";
import { Router } from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private users: IUser[] = [];

  constructor(private service: UsersService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.service.readAll().subscribe((data: IUser[]) => this.users = data);
  }

  get Users(): IUser[] {
    return this.users;
  }

  delete(id: number): void {
    if (confirm("Are you sure you want to delete this User?")) {
      this.service.delete(id).subscribe(data => {
        this.router.navigate(["/users/all"]);
      }, response => {
        this.toastr.error("Error deleting user", "Error");
      });
    }
  }
}
