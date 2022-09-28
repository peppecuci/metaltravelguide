import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../../features/users/services/users.service";
import { AuthService } from "../../security/services/auth.service";
import { SessionService } from "../../security/services/session.service";
import { IUser} from "../../../features/users/models/IUser";
import { Country } from "../../enums/Country";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // variables
  public countryEnum = Country;
  private countries : [string, Country][] = [];

  private user?: IUser;

  updateForm = new FormGroup({
    id: new FormControl(0),
    username: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(255)]),
    nickname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern("^[a-zA-Z0-9\\_]+$")]),
    password: new FormControl("", [Validators.minLength(8), Validators.maxLength(255), Validators.pattern("^[a-zA-Z0-9]+$")]),
    confirmPassword: new FormControl("", [RxwebValidators.compare({fieldName: 'password'})]),
    countryIso: new FormControl("Choose a country...", [Validators.required, Validators.maxLength(2)])
  },  {updateOn: 'blur'});

  constructor(private userService: UsersService, private auth: AuthService, private session: SessionService, private toastr: ToastrService) {
    this.countries = Object.entries(this.countryEnum)
  }

  get User(): IUser {
    return <IUser>this.user;
  }

  get Countries(): [string, Country][] {
    return this.countries;
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((data: IUser) => {
      this.user = data;
      this.updateForm.setValue({id: this.user.id, username: this.user.username, password: "", confirmPassword: "", nickname: this.user.nickname, countryIso: this.user.countryIso});
    });
  }

  update(): void {
    if (this.updateForm.valid) {
      this.userService.update(this.updateForm.value).subscribe(() => {
        if (this.updateForm.value.password!.length > 0) {
          this.session.logout();
          this.auth.login(<string>this.updateForm.get("username")?.value, <string>this.updateForm.get("password")?.value).subscribe(data => {
            let token = data["token"];
            this.session.login(token);
          });
        }
        this.userService.getProfile().subscribe((data: IUser) => {
          this.user = data;
          this.updateForm.setValue({id: this.user.id, username: this.user.username, password: "", confirmPassword: "", nickname: this.user.nickname, countryIso: this.user.countryIso});
          this.toastr.success("Profile has been saved", "Success")
        });
      });
    }

  }
}
