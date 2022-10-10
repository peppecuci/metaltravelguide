import { Component, Input, OnInit } from '@angular/core';
import { IPlace } from "../../models/IPlace";

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit {
  @Input() places?: IPlace[];

  // constructor
  constructor() { }

  // getters
  get Places(): IPlace[] {
    return <IPlace[]>this.places;
  }

  // methods
  ngOnInit(): void {
  }
}
