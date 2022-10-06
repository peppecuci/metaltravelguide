import { Component, OnInit } from '@angular/core';
import { IPlace } from "../../models/IPlace";
import { PlacesService } from "../../services/places.service";
import { Country } from "../../../../core/enums/Country";
import { Type } from "../../../../core/enums/Type";

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit {
  public countryEnum = Country;
  private countries : [string, Country][] = [];
  public typeEnum = Type;
  private types : [string, Type][] = [];

  private places: IPlace[] = [];
  public countryIso: string = "Filter by country...";
  public type: string = "Filter by type...";

  // constructor
  constructor(private service: PlacesService) { }

  // getters
  get Places(): IPlace[] {
    return this.places;
  }

  get Countries(): [string, Country][] {
    return this.countries;
  }

  get Types(): [string, Type][] {
    return this.types;
  }

  // methods
  ngOnInit(): void {
    this.countries = Object.entries(this.countryEnum);
    this.types = Object.entries(this.typeEnum);
    this.service.readAll().subscribe((data: IPlace[]) => {
      this.places = data;
      const placesIso = data.map( (element) => element.address.countryIso ).filter((e, i, self) => self.indexOf(e) === i);
      this.countries = this.countries.filter((entry) => placesIso.includes(entry[0]));
      const placesType = data.map( (element) => element.type ).filter((e, i, self) => self.indexOf(e) === i);
      this.types = this.types.filter((entry) => placesType.includes(entry[0]));
    });
  }
}
