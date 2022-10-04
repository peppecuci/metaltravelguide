import { Component, OnInit } from '@angular/core';
import { IPlace } from "../../models/IPlace";
import { PlacesService } from "../../services/places.service";
import { Country } from "../../../../core/enums/Country";

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit {
  public countryEnum = Country;
  private countries : [string, Country][] = [];
  private places: IPlace[] = [];
  public countryIso: string = "Filter by country...";

  constructor(private service: PlacesService) { }

  ngOnInit(): void {
    this.service.readAll().subscribe((data: IPlace[]) => {
      this.places = data;
    });
    this.countries = Object.entries(this.countryEnum);
  }

  get Places(): IPlace[] {
    return this.places;
  }

  get Countries(): [string, Country][] {
    return this.countries;
  }
}
