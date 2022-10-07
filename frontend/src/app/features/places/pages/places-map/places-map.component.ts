import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {PlacesService} from "../../services/places.service";
import {IPlace} from "../../models/IPlace";

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.css']
})
export class PlacesMapComponent implements OnInit, AfterViewInit {
  @ViewChild('divMap') divMap!: ElementRef;
  private map!: google.maps.Map;
  private markers: google.maps.Marker[] = [];

  private places: IPlace[] = [];

  constructor(private placesService: PlacesService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.placesService.readAll().subscribe((places: IPlace[]) => {
      this.places = places
      places.forEach((place) => {
        this.createMarker(place);
      })
    });
  }

  ngAfterViewInit(): void {
    this.loadMap();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
          this.map.setZoom(11);
        }
      );
    }
  }

  private loadMap(): any {
    const options = {
      center: new google.maps.LatLng(20, -30),
      zoom: 2,
      gestureHandling: "greedy",
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), options);
  }

  private createMarker(place: IPlace): any {
    const marker = new google.maps.Marker();
    marker.setPosition({lat: place.address.lat, lng: place.address.lon});
    // marker.setIcon("assets/logos/" + place.type.toLowerCase() + ".svg");
    marker.setMap(this.map);
  }

}
