import {Component, Input, OnInit} from '@angular/core';
import {IPlace} from "../../models/IPlace";

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {
  @Input() place?: IPlace;

  constructor() { }

  ngOnInit(): void {
  }

}
