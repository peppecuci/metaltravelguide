import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesListComponent } from "./pages/places-list/places-list.component";
import { PlaceDetailsComponent } from "./pages/place-details/place-details.component";
import { PlacesComponent } from "./places.component";

const routes: Routes = [
  { path: "", component: PlacesComponent, children: [
      { path: "all", component: PlacesListComponent },
      { path: ":id", component: PlaceDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule { }
