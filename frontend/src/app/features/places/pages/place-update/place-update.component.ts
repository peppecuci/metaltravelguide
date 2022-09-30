import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../../../users/services/users.service";
import { PlacesService } from "../../services/places.service";
import { Country } from "../../../../core/enums/Country";
import { Type } from "../../../../core/enums/Type";
import { IUser } from "../../../users/models/IUser";
import { IPlace } from "../../models/IPlace";
import { ToastrService } from "ngx-toastr";

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
    name: new FormControl("", [Validators.required, Validators.minLength(2)]),
    googleId: new FormControl("", [Validators.minLength(4)]),
    address: new FormGroup({
      street: new FormControl("", [Validators.required, Validators.minLength(1)]),
      number: new FormControl("", [Validators.required, Validators.minLength(1)]),
      extra: new FormControl("", [Validators.minLength(1)]),
      city: new FormControl("", [Validators.required, Validators.minLength(2)]),
      region: new FormControl("", [Validators.required, Validators.minLength(2)]),
      countryIso: new FormControl("", [Validators.required, Validators.minLength(2)]),
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
    userId: new FormControl(0)
  }, {updateOn: "submit"});

  constructor(private usersService: UsersService, private placesService: PlacesService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
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
    this.usersService.getProfile().subscribe((data: IUser) => {
      this.user = data;
    });
    this.placesService.readOne(this.id).subscribe((data: IPlace) => {
      this.place = data;
      if (this.place.name)
        this.updateForm.controls['name'].setValue(this.place.name);
      if (this.place.googleId)
        this.updateForm.controls['googleId'].setValue(this.place.googleId);
      if (this.place.address.street)
        this.updateForm.controls['address'].controls['street'].setValue(this.place.address.street);
      if (this.place.address.number)
        this.updateForm.controls['address'].controls['number'].setValue(this.place.address.number);
      if (this.place.address.extra)
        this.updateForm.controls['address'].controls['extra'].setValue(this.place.address.extra);
      if (this.place.address.city)
        this.updateForm.controls['address'].controls['city'].setValue(this.place.address.city);
      if (this.place.address.region)
        this.updateForm.controls['address'].controls['region'].setValue(this.place.address.region);
      if (this.place.address.countryIso)
        this.updateForm.controls['address'].controls['countryIso'].setValue(this.place.address.countryIso);
      if (this.place.address.lat)
        this.updateForm.controls['address'].controls['lat'].setValue(this.place.address.lat);
      if (this.place.address.lon)
        this.updateForm.controls['address'].controls['lon'].setValue(this.place.address.lon);
      if (this.place.contact.telephone)
        this.updateForm.controls['contact'].controls['telephone'].setValue(this.place.contact.telephone);
      if (this.place.contact.mail)
        this.updateForm.controls['contact'].controls['mail'].setValue(this.place.contact.mail);
      if (this.place.contact.website)
        this.updateForm.controls['contact'].controls['website'].setValue(this.place.contact.website);
      if (this.place.contact.facebook)
        this.updateForm.controls['contact'].controls['facebook'].setValue(this.place.contact.facebook);
      if (this.place.contact.instagram)
        this.updateForm.controls['contact'].controls['instagram'].setValue(this.place.contact.instagram);
      if (this.place.contact.twitter)
        this.updateForm.controls['contact'].controls['twitter'].setValue(this.place.contact.twitter);
      if (this.place.type)
        this.updateForm.controls['type'].setValue(this.place.type);
      if (this.place.description)
        this.updateForm.controls['description'].setValue(this.place.description);
      if (this.place.image)
        this.updateForm.controls['image'].setValue(this.place.image);
      if (this.place.userId)
        this.updateForm.controls['userId'].setValue(this.place.userId);
    });
  }

  update(): void {
    if (this.updateForm.valid) {
      this.placesService.update(this.id, this.updateForm.value).subscribe((data: IPlace) => {
        this.place = data;
        this.router.navigate(["/places/all"]);
        this.toastr.success("Place updated successfully", "Success")
      }, response => {
        this.toastr.error("Error updating place", "Error");
      });
    }
  }
}
