import { Component, OnInit } from '@angular/core';
import { IPlace } from "../../models/IPlace";
import { PlacesService } from "../../services/places.service";

@Component({
  selector: 'app-places-admin',
  templateUrl: './places-admin.component.html',
  styleUrls: ['./places-admin.component.css']
})
export class PlacesAdminComponent implements OnInit {

  private places: IPlace[] = [];

  // constructor
  constructor(private placesService: PlacesService) { }

  // getters
  get Places(): IPlace[] {
    return this.places;
  }

  // methods
  ngOnInit(): void {
    this.loadPlaces();
  }

  private loadPlaces(): void {
    this.placesService.readAll().subscribe((data: IPlace[]) => {
      this.places = data.sort((place1, place2) => place2.id - place1.id);
    });
  }

  public approve(id: number): void {
    this.placesService.approve(id).subscribe(() => this.loadPlaces());
  }

  public refuse(id: number): void {
    this.placesService.refuse(id).subscribe(() => this.loadPlaces());
  }

  public approveAll(): void {
    if(confirm("This will approve all Places, are you sure?")) {
      this.places.filter((place) => !place.status).forEach((place) => {
        this.placesService.approve(place.id).subscribe(() => this.loadPlaces());
      })
    }
  }
}
