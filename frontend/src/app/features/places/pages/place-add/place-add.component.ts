import { Component, OnInit } from '@angular/core';
import { Country } from "../../../../core/enums/Country";
import { Type } from "../../../../core/enums/Type";
import { IUser } from "../../../users/models/IUser";
import { IPlace } from "../../models/IPlace";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../../../users/services/users.service";
import { PlacesService } from "../../services/places.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css']
})
export class PlaceAddComponent implements OnInit {

  public countryEnum = Country;
  private countries : [string, Country][] = [];
  public typeEnum = Type;
  private types : [string, Type][] = [];

  private user?: IUser;
  private place?: IPlace;

  private isSubmitted: boolean = false;

  addForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2)]),
    address: new FormGroup({
      street: new FormControl("", [Validators.required, Validators.minLength(1)]),
      number: new FormControl(1, [Validators.required, Validators.min(0)]),
      extra: new FormControl("", [Validators.minLength(1)]),
      city: new FormControl("", [Validators.required, Validators.minLength(2)]),
      region: new FormControl("", [Validators.required, Validators.minLength(2)]),
      countryIso: new FormControl("", [Validators.required]),
      lat: new FormControl(0),
      lon: new FormControl(0)
    }),
    contact: new FormGroup({
      telephone: new FormControl("", [Validators.pattern("^[+]?[0-9]{9,20}$")]),
      mail: new FormControl("", [Validators.email]),
      website: new FormControl("", [Validators.pattern("[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)")]),
      facebook: new FormControl("", [Validators.pattern("[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)")]),
      instagram: new FormControl("", [Validators.pattern("[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)")]),
      twitter: new FormControl("", [Validators.pattern("[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)")]),
    }),
    type: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required, Validators.minLength(4)]),
    image: new FormControl("", [Validators.required, Validators.minLength(4)]),
    username: new FormControl("")
  });

  constructor(private usersService: UsersService, private placesService: PlacesService, private route: ActivatedRoute, private router: Router) {
    this.countries = Object.entries(this.countryEnum);
    this.types = Object.entries(this.typeEnum);
  }

  get User(): IUser {
    return <IUser>this.user;
  }

  get Place(): IPlace {
    return <IPlace>this.place;
  }

  get IsSubmitted(): boolean {
    return this.isSubmitted;
  }

  get Countries(): [string, Country][] {
    return this.countries;
  }

  get Types(): [string, Type][] {
    return this.types;
  }

  ngOnInit(): void {
    this.usersService.getProfile().subscribe((data: IUser) => {
      this.user = data;
      this.addForm.patchValue({username: this.user.username});
    });
  }

  add(): void {
    this.isSubmitted = true;
    if (this.addForm.valid) {
      this.placesService.add(this.addForm.value).subscribe((data: IPlace) => {
        this.place = data;
        this.router.navigate(["/places/all"]);
      });
    }
  }
}
