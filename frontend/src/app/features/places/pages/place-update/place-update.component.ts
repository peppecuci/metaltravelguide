import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../../../users/services/users.service";
import { PlacesService } from "../../services/places.service";
import { Country } from "../../../../core/enums/Country";
import { Type } from "../../../../core/enums/Type";
import { IUser } from "../../../users/models/IUser";
import { IPlace } from "../../models/IPlace";

@Component({
  selector: 'app-place-update',
  templateUrl: './place-update.component.html',
  styleUrls: ['./place-update.component.css']
})
export class PlaceUpdateComponent implements OnInit {
  public countryEnum = Country;
  private countries : [string, Country][] = [];
  public typeEnum = Type;
  private types : [string, Type][] = [];

  private user?: IUser;
  private place?: IPlace;
  private id: number = 0;

  updateForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    address: new FormGroup({
      street: new FormControl("", [Validators.required, Validators.minLength(1)]),
      number: new FormControl(1, [Validators.required]),
      extra: new FormControl("", [Validators.minLength(1)]),
      city: new FormControl("", [Validators.required, Validators.minLength(2)]),
      region: new FormControl("", [Validators.required, Validators.minLength(2)]),
      countryIso: new FormControl("", [Validators.required, Validators.minLength(2)]),
      }),
    contact: new FormGroup({
      telephone: new FormControl("", [Validators.required, Validators.pattern("^[+]?[0-9]{9,20}$")]),
      mail: new FormControl("", [Validators.required, Validators.email]),
      website: new FormControl("", [Validators.required, Validators.minLength(5)]),
      facebook: new FormControl("", [Validators.required, Validators.minLength(5)]),
      instagram: new FormControl("", [Validators.required, Validators.minLength(5)]),
      twitter: new FormControl("", [Validators.required, Validators.minLength(5)]),
    }),
    type: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required, Validators.minLength(4)]),
    image: new FormControl("", [Validators.required, Validators.minLength(4)])
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

  get Countries(): [string, Country][] {
    return this.countries;
  }

  get Types(): [string, Type][] {
    return this.types;
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.usersService.getProfile().subscribe((data: IUser) => this.user = data);
    this.placesService.readOne(this.id).subscribe((data: IPlace) => {
      this.place = data;
      this.updateForm.setValue({name: this.place.name, address: {street: this.place.address.street, number: this.place.address.number, extra: this.place.address.extra, city: this.place.address.city, region: this.place.address.region, countryIso: this.place.address.countryIso }, contact: {telephone: this.place.contact.telephone, mail: this.place.contact.mail, website: this.place.contact.website, facebook: this.place.contact.facebook, instagram: this.place.contact.instagram, twitter: this.place.contact.twitter}, type: this.place.type, description: this.place.description, image: this.place.image});
    });
  }

  update(): void {
    console.log(this.updateForm.valid);
    if (this.updateForm.valid) {
      this.placesService.update(this.id, this.updateForm.value).subscribe((data: IPlace) => {
        this.place = data;
        this.router.navigate(["/places/all"]);
      });
    }
  }
}
