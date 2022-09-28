/// <reference path="../../../../../../node_modules/@types/google.maps/index.d.ts" />
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css']
})
export class PlaceAddComponent implements OnInit, AfterViewInit {
  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  public countryEnum = Country;
  private readonly countries : [string, Country][] = [];
  public typeEnum = Type;
  private readonly types : [string, Type][] = [];

  private user?: IUser;
  private place?: any;

  private isSubmitted: boolean = false;

  public search: string = "";
  map!: google.maps.Map;
  marker: google.maps.Marker = new google.maps.Marker();

  addForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2)]),
    googleId: new FormControl("", [Validators.minLength(4)]),
    address: new FormGroup({
      street: new FormControl("", [Validators.required, Validators.minLength(1)]),
      number: new FormControl("", [Validators.required, Validators.minLength(1)]),
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

  constructor(private usersService: UsersService, private placesService: PlacesService, private route: ActivatedRoute, private router: Router, private renderer: Renderer2, private toastr: ToastrService) {
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

  ngAfterViewInit(): void {
    this.loadMap();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        this.map.setZoom(17);
        }
      );
    }
    this.loadAutoComplete();
  }

  private loadMap(): any {
    const options = {
      center: new google.maps.LatLng(20, -30),
      zoom: 2,
      gestureHandling: "greedy",
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), options);
    google.maps.event.addListener(this.map, "click", (location: any) => {
      if (location.placeId) {
        const service = new google.maps.places.PlacesService(this.map);
        service.getDetails({placeId: location.placeId}, (place) => {
          this.place = place;
          this.search = <string>place!.name + ", " + place!.formatted_address;
          this.map.setCenter(this.place.geometry.location);
          this.marker.setPosition(this.place.geometry.location);
          this.marker.setMap(this.map);
          this.fillForm(this.place);
        });
      }
    });
  }

  private loadAutoComplete(): void {
    const autoComplete = new google.maps.places.Autocomplete(this.renderer.selectRootElement(this.inputPlaces.nativeElement), {
      fields: ["name", "place_id", "address_components", "geometry", "international_phone_number", "photos", "website"],
      types: ["establishment"]
    });
    google.maps.event.addListener(autoComplete, 'place_changed', () => {
      this.place = autoComplete.getPlace();
      this.map.setCenter(this.place.geometry.location);
      this.marker.setPosition(this.place.geometry.location);
      this.marker.setMap(this.map);
      this.fillForm(this.place);
    });
  }

  private fillForm(place: any): void {
    const addressNameFormat: any = {
      'route': 'long_name',
      'street_number': 'short_name',
      'locality': 'short_name',
      'administrative_area_level_1': 'short_name',
      'country': 'short_name',
      'postal_code': 'short_name'
    };

    const componentForm = {
      street: 'route',
      number: 'street_number',
      city: 'locality',
      region: 'administrative_area_level_1',
      countryIso: 'country',
      extra: 'postal_code'
    };

    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return '';
    };

    Object.entries(componentForm).forEach(entry => {
      const [key, value] = entry;
      // @ts-ignore
      this.addForm.controls['address'].controls[key].setValue(getAddressComp(value));
    });

    if (this.place.name)
      this.addForm.controls['name'].setValue(this.place.name);
    if (this.place.photos[0])
      this.addForm.controls['image'].setValue(this.place.photos[0].getUrl());
    if (this.place.place_id)
      this.addForm.controls['googleId'].setValue(this.place.place_id);
    if (this.place.international_phone_number)
      this.addForm.controls['contact'].controls['telephone'].setValue(this.place.international_phone_number.replace(/\s/g, ""));
    if (this.place.website)
      this.addForm.controls['contact'].controls['website'].setValue(this.place.website);
  }

  add(): void {
    this.isSubmitted = true;
    if (this.addForm.valid) {
      this.placesService.add(this.addForm.value).subscribe((data: any) => {
        this.place = data;
        this.router.navigate(["/places/all"]);
        this.toastr.success("Place has been added", "Success")
      });
    }
  }
}
