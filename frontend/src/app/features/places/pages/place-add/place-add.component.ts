import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../../../users/services/users.service";
import { PlacesService } from "../../services/places.service";
import { Country } from "../../../../core/enums/Country";
import { Type } from "../../../../core/enums/Type";
import { IUser } from "../../../users/models/IUser";
import { IPlace } from "../../models/IPlace";

@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css']
})
export class PlaceAddComponent implements OnInit, AfterViewInit {
  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  public countryEnum = Country;
  private countries : [string, Country][] = [];
  public typeEnum = Type;
  private types : [string, Type][] = [];

  private user?: IUser;
  private place?: any;

  private isSubmitted: boolean = false;

  public search: string = "";
  map!: google.maps.Map;
  markers: google.maps.Marker[] = [];

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

  constructor(private usersService: UsersService, private placesService: PlacesService, private route: ActivatedRoute, private router: Router, private renderer: Renderer2) {
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await this.loadMap(position);
        this.loadAutoComplete();
      });
    }
    else {
      console.log("Browser not compatible with geolocation.")
    }
  }

  private loadAutoComplete(): void {
    const autoComplete = new google.maps.places.Autocomplete(this.renderer.selectRootElement(this.inputPlaces.nativeElement), {
      fields: ["name", "place_id", "address_components", "geometry", "international_phone_number", "opening_hours", "photos", "website"],
      types: ["establishment"]
    });
    google.maps.event.addListener(autoComplete, 'place_changed', () => {
      this.place = autoComplete.getPlace();
      this.map.setCenter(this.place.geometry.location);
      const marker = new google.maps.Marker({
        position: this.place.geometry.location
      });
      marker.setMap(this.map);
      console.log(this.place);
      this.addForm.setValue({
        name: this.place.name,
        address: {
          street: this.place.address_components[1].long_name,
          number: this.place.address_components[0].short_name,
          extra: "",
          city: this.place.address_components[4].short_name,
          region: this.place.address_components[3].short_name,
          countryIso: this.place.address_components[5].short_name,
          lat: this.place.geometry.viewport.Ab.lo,
          lon: this.place.geometry.viewport.Va.lo
        },
        contact: {
          telephone: this.place.international_phone_number,
          mail: "",
          website: this.place.website,
          facebook: "",
          instagram: "",
          twitter: ""
        },
        type: "",
        description: "",
        image: this.place.photos[0].html_attributions.toString().match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, ""),
        username: this.User.username
      });
    });
  }

  loadMap(position: any): any {
    const options = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), options);
    const markerPosition = new google.maps.Marker({
      position: this.map.getCenter(),
      title: "Place"
    });
    markerPosition.setMap(this.map);
    this.markers.push(markerPosition);
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
