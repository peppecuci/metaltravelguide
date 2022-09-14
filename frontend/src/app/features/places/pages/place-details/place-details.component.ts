import { Component, OnInit } from '@angular/core';
import { PlacesService } from "../../services/places.service";
import { IPlace } from "../../models/IPlace";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-IPlace-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  private place: IPlace | null = null;
  private mapURL: string = "";

  constructor(private service: PlacesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.service.readOne(id).subscribe((data: IPlace) => {
      this.place = data;
      this.mapURL = `https://www.google.com/maps/embed/v1/search?key=${environment.APIKEY}&q=${this.place.address.street}+${this.place.address.number}+${this.place.address.city}`;

    });
  }

  get Place(): IPlace {
    return <IPlace>this.place;
  }

  get MapURL(): string {
    return this.mapURL;
  }
}
