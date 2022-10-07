import { Component, Input, OnInit } from '@angular/core';
import { IPlace } from "../../models/IPlace";
import {PlacesService} from "../../services/places.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {
  @Input() place?: IPlace;

  // constructor
  constructor(private placesService: PlacesService, private toastr: ToastrService) { }

  // methods
  ngOnInit(): void {
  }
}
