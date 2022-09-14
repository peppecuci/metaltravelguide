import { Component, OnInit } from '@angular/core';
import { IPlace } from "../../models/IPlace";
import { PlacesService } from "../../services/places.service";

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit {

  private places: IPlace[] = [];

  constructor(private service: PlacesService) { }

  ngOnInit(): void {
    this.service.readAll().subscribe((data: IPlace[]) => this.places = data);
  }

  get Places(): IPlace[] {
    return this.places;
  }
}
