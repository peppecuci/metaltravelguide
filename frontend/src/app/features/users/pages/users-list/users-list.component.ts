import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IUser } from "../../models/IUser";
import { UsersService } from "../../services/users.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private users: IUser[] = [];

  // constructor
  constructor(private service: UsersService, private router: Router, private toastr: ToastrService) {
  }

  // getters
  get Users(): IUser[] {
    return this.users;
  }

  // methods
  ngOnInit(): void {
    this.service.readAll().subscribe((data: IUser[]) => this.users = data);
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
