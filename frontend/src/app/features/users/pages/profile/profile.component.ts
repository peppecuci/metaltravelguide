import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { AuthService } from "../../../../core/security/services/auth.service";
import { UsersService } from "../../services/users.service";
import { SessionService } from "../../../../core/security/services/session.service";
import { ToastrService } from "ngx-toastr";
import { Country } from "../../../../core/enums/Country";
import { IUser} from "../../models/IUser";
declare let cloudinary: any ;

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
    image: new FormControl(""),
    countryIso: new FormControl("Choose a country...", [Validators.required, Validators.maxLength(2)])
  },  {updateOn: 'submit'});

  // constructor
  constructor(private auth: AuthService, private userService: UsersService, private session: SessionService, private toastr: ToastrService) {
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
      this.updateForm.patchValue({id: this.user.id, username: this.user.username, nickname: this.user.nickname, image: this.user.image, countryIso: this.user.countryIso});
      this.updateForm.markAsUntouched();
      this.updateForm.markAsPristine();
    });
  }

  public update(): void {
    if (this.updateForm.valid) {
      this.userService.update(this.updateForm.value).subscribe((data) => {
        this.session.User = data;
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

  cloudinaryGo(){
    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: 'dkndu29j4',
        uploadPreset: 'user_images'
      },
      (error:any,result:any)=> {
        if (!error && result && result.event === "success") {
          this.updateForm.controls['image'].setValue(result.info.url);
        }
      }
    );
    myWidget.open()
  }
}
