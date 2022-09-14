import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../../features/users/services/users.service";
import { IUser} from "../../../features/users/models/IUser";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user?: IUser;

  updateForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.min(3)]),
    password: new FormControl("", [Validators.required, Validators.min(4)]),
    repeatPassword: new FormControl("", [Validators.required, Validators.min(4)]),
    mail: new FormControl("", [Validators.required, Validators.email]),
    firstName: new FormControl("", [Validators.required, Validators.min(1)]),
    lastName: new FormControl("", [Validators.required, Validators.min(1)]),
    countryIso: new FormControl("", [Validators.required, Validators.min(2)])
  });

  constructor(private service: UsersService) { }

  get User(): IUser {
    return <IUser>this.user;
  }

  ngOnInit(): void {
    this.service.getProfile().subscribe((data: IUser) => {
      this.user = data;
      let token = localStorage.getItem("token");
      this.updateForm.setValue({username: this.user.username, password: this.user.password, repeatPassword: this.user.password, mail: this.user.mail, firstName: this.user.firstName, lastName: this.user.lastName, countryIso: this.user.countryIso});
    });
  }

  update(): void {

  }
}
