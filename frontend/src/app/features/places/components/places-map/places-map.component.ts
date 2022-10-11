import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { PlacesService } from "../../services/places.service";
import { IPlace } from "../../models/IPlace";
declare var MarkerClusterer: any;

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.css']
})
export class PlacesMapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() places!: IPlace[];
  @ViewChild('divMap') divMap!: ElementRef;
  private map!: google.maps.Map;
  private marker?: google.maps.Marker;
  private markers: google.maps.Marker[] = [];
  private markerClusterer = new MarkerClusterer(this.map, this.markers, {imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"});
  private infoWindow?: google.maps.InfoWindow;

  constructor(private placesService: PlacesService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadMap();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
          this.map.setZoom(11);
        });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.markers = [];
    this.places.forEach((place) => {
      this.createMarker(place);
    });
    this.markerClusterer.setMap(this.map);
    this.markerClusterer.clearMarkers();
    this.markerClusterer.addMarkers(this.markers);
    this.infoWindow = new google.maps.InfoWindow();
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
    const marker = new google.maps.Marker({position: new google.maps.LatLng(place.address.lat, place.address.lon), title: place.name, map: this.map, icon: {url: "assets/markers/" + place.type.toLowerCase() + ".png", scaledSize: new google.maps.Size(40, 40)}});
    marker.addListener("click", () => {
      this.marker = marker;
      this.map.setZoom(17);
      this.map.setCenter(marker.getPosition() as google.maps.LatLng);
      this.infoWindow?.setContent(
        "<a class='text-decoration-none text-black' href='./places/" + place.id + "'><div class='card shadow-sm' style='width: 15rem'><img class='bd-placeholder-img card-img-top' src='" + place.image + "' alt='" + place.name + "' style='object-fit: cover; height: 100px;'/><div class='card-body'><strong class='card-title mb-1'>" + marker.getTitle() + "</strong><div class='d-flex'><p class='mb-1'>" + place.address.street + " " + place.address.number + ", " + place.address.extra + ", " + place.address.city + " <span class='fi fi-" + place.address.countryIso.toLowerCase() + "'></span></p></div><div class='d-flex align-items-center'><img class='me-1' height='16' src='assets/logos/" + place.type.toLowerCase() + ".svg' alt='" + place.type.toLowerCase() + "' style='opacity: 60%'/><span class='text-muted'>" + place.type + "</span></div></div></div></a>"
      );
      this.infoWindow?.open(this.map, this.marker);
    });
    this.markers.push(marker);
  }
}
