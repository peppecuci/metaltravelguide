import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "../../../users/services/users.service";
import { PlacesService } from "../../services/places.service";
import { Country } from "../../../../core/enums/Country";
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

  private user?: IUser;
  private place?: IPlace;

  updateForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    description: new FormControl("", [Validators.required, Validators.minLength(4)]),
    street: new FormControl("", [Validators.required, Validators.minLength(1)]),
    number: new FormControl(0, [Validators.required, Validators.min(0)]),
    city: new FormControl("", [Validators.required, Validators.minLength(2)]),
    extra: new FormControl("", [Validators.minLength(1)]),
    region: new FormControl("", [Validators.required, Validators.minLength(2)]),
    website: new FormControl("", [Validators.required, Validators.minLength(5)]),
    facebook: new FormControl("", [Validators.required, Validators.minLength(5)]),
    instagram: new FormControl("", [Validators.required, Validators.minLength(5)]),
    twitter: new FormControl("", [Validators.required, Validators.minLength(5)]),
    mail: new FormControl("", [Validators.required, Validators.email]),
    telephone: new FormControl("", [Validators.required, Validators.pattern("^[+]?[0-9]{9,20}$")]),
    countryIso: new FormControl("", [Validators.required, Validators.minLength(2)])
  });

  constructor(private usersService: UsersService, private placesService: PlacesService, private route: ActivatedRoute) {
    this.countries = Object.entries(this.countryEnum)
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

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.usersService.getProfile().subscribe((data: IUser) => this.user = data);
    this.placesService.readOne(id).subscribe((data: IPlace) => {
      this.place = data;
      this.updateForm.setValue({name: this.place.name, description: this.place.description, street: this.place.address.street, number: this.place.address.number, extra: this.place.address.extra, city: this.place.address.city, region: this.place.address.region, website: this.place.contact.website, facebook: this.place.contact.facebook, instagram: this.place.contact.instagram, twitter: this.place.contact.twitter, mail: this.place.contact.mail, telephone: this.place.contact.telephone, countryIso: this.place.address.countryIso});
    });
  }

  update(): void {
  }
}
