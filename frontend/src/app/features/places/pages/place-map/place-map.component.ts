/// <reference path="../../../../../../node_modules/@types/google.maps/index.d.ts" />
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {IPlace} from "../../models/IPlace";

@Component({
  selector: 'app-place-map',
  templateUrl: './place-map.component.html',
  styleUrls: ['./place-map.component.css']
})
export class PlaceMapComponent implements OnInit, AfterViewInit {

  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  map!: google.maps.Map;
  markers: google.maps.Marker[] = [];
  mapForm: FormGroup = new FormGroup({
    search: new FormControl("", [Validators.required, Validators.minLength(2)]),
    street: new FormControl("", [Validators.required, Validators.minLength(1)]),
    number: new FormControl("", [Validators.required, Validators.minLength(1)]),
    reference: new FormControl("", [Validators.required, Validators.minLength(1)]),
    postal_code: new FormControl("", [Validators.required, Validators.minLength(1)]),
    city: new FormControl("", [Validators.required, Validators.minLength(2)]),
    province: new FormControl("", [Validators.required, Validators.minLength(2)]),
    region: new FormControl("", [Validators.required, Validators.minLength(2)]),
    country: new FormControl("", [Validators.required, Validators.minLength(2)]),
  });

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
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
      const place: any = autoComplete.getPlace();
      console.log(place);
      this.map.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location
      });
      marker.setMap(this.map);
      this.fillForm(place);
    });
  }

  fillForm(place: any): void {
    const addressNameFormat: any = {
      'route': 'long_name',
      'street_number': 'short_name',
      'reference': 'short_name',
      'locality': 'short_name',
      'postal_code': 'short_name',
      'administrative_area_level_1': 'short_name',
      'country': 'short_name',
    };
    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return '';
    };
    const componentForm = {
      street: 'route',
      number: 'street_number',
      reference: 'reference',
      postal_code: 'postal_code',
      city: 'locality',
      region: 'administrative_area_level_1',
      country: 'country'
    };

    Object.entries(componentForm).forEach(entry => {
      const[key,value] = entry;
      this.mapForm.controls[key].setValue(getAddressComp(value));
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
      title: "Test"
    });
    markerPosition.setMap(this.map);
    this.markers.push(markerPosition);
  }

  search(): void {
    console.log(this.mapForm.value);
  }
}
