import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { Country } from "../../enums/Country";
import { IUser} from "../../../features/users/models/IUser";
import { UsersService } from "../../../features/users/services/users.service";
import { AuthService } from "../../security/services/auth.service";
import { SessionService } from "../../security/services/session.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // variables
  public countryEnum = Country;
  private readonly countries : [string, Country][] = [];

  private user?: IUser;

  updateForm = new FormGroup({
    id: new FormControl(0),
    username: new FormControl({value: "", disabled: true}),
    nickname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern("^[a-zA-Z0-9\\_]+$")]),
    password: new FormControl("", [Validators.minLength(8), Validators.maxLength(255), Validators.pattern("^[a-zA-Z0-9]+$")]),
    confirmPassword: new FormControl("", [RxwebValidators.compare({fieldName: 'password'})]),
    countryIso: new FormControl("Choose a country...", [Validators.required, Validators.maxLength(2)])
  },  {updateOn: 'submit'});

  // constructor
  constructor(private userService: UsersService, private auth: AuthService, private session: SessionService, private toastr: ToastrService) {
    this.countries = Object.entries(this.countryEnum)
  }

  // getters
  get User(): IUser {
    return <IUser>this.user;
  }

  get Countries(): [string, Country][] {
    return this.countries;
  }

  // methods
  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    this.userService.getProfile().subscribe((data: IUser) => {
      this.user = data;
      this.updateForm.reset();
      this.updateForm.patchValue({id: this.user.id, username: this.user.username, nickname: this.user.nickname, countryIso: this.user.countryIso});
      this.updateForm.markAsUntouched();
      this.updateForm.markAsPristine();
    });
  }

  public update(): void {
    if (this.updateForm.valid) {
      this.userService.update(this.updateForm.value).subscribe(() => {
        if (this.updateForm.value.password != null) {
          this.session.logout();
          console.log(this.updateForm.getRawValue());
          this.auth.login(this.updateForm.getRawValue()).subscribe(data => {
            let token = data["token"];
            this.session.login(token);
          });
        }
        this.loadProfile();
        this.toastr.success("Profile updated successfully", "Success")
      }, response => {
        this.toastr.error(response.error.message, "Error")
      });
    }
  }
}
