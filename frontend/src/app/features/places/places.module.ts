import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesListComponent } from './pages/places-list/places-list.component';
import { PlaceDetailsComponent } from './pages/place-details/place-details.component';
import { PlacesComponent } from './places.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PlaceCardComponent } from './components/place-card/place-card.component';
import { SafePipe } from "../../core/pipes/safe.pipe";
import { DateAsAgoPipe } from "../../core/pipes/date-as-ago.pipe";
import { PlaceAddComponent } from './pages/place-add/place-add.component';
import { PlaceUpdateComponent } from './pages/place-update/place-update.component';
import { PlaceCommentsComponent } from './components/place-comments/place-comments.component';
import { FilterByCountryPipe } from './pipes/filter-by-country.pipe';
import { FilterByTypePipe } from './pipes/filter-by-type.pipe';

@NgModule({
  declarations: [
    PlacesListComponent,
    PlaceDetailsComponent,
    PlacesComponent,
    PlaceCardComponent,
    SafePipe,
    DateAsAgoPipe,
    PlaceAddComponent,
    PlaceUpdateComponent,
    PlaceCommentsComponent,
    FilterByCountryPipe,
    FilterByTypePipe
  ],
    imports: [
      CommonModule,
      PlacesRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
    ]
})
export class PlacesModule { }
