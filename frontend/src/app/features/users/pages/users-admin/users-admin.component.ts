import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IUser } from "../../models/IUser";
import { UsersService } from "../../services/users.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  private users: IUser[] = [];

  // constructor
  constructor(private usersService: UsersService, private router: Router, private toastr: ToastrService) {
  }

  // getters
  get Users(): IUser[] {
    return this.users;
  }

  // methods
  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.usersService.readAll().subscribe((data: IUser[]) => this.users = data);
  }

  public enable(id: number): void {
    this.usersService.enable(id).subscribe(() => {
      this.loadUsers();
    }, () => {
      this.toastr.error("Error enabling user", "Error");
    });
  }

  public disable(id: number): void {
    this.usersService.disable(id).subscribe(() => {
      this.loadUsers();
    }, () => {
      this.toastr.error("Error disabling user", "Error");
    });
  }

  public delete(id: number): void {
    if (confirm("Are you sure you want to delete this User?")) {
      this.usersService.delete(id).subscribe(() => {
        this.loadUsers();
      }, () => {
        this.toastr.error("Error deleting user", "Error");
      });
    }
  }
}
