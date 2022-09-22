import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from "./places.component";
import { PlacesListComponent } from "./pages/places-list/places-list.component";
import { PlaceDetailsComponent } from "./pages/place-details/place-details.component";
import { PlaceAddComponent } from "./pages/place-add/place-add.component";
import { PlaceUpdateComponent } from "./pages/place-update/place-update.component";
import { PlaceMapComponent } from "./pages/place-map/place-map.component";

const routes: Routes = [
  { path: "", component: PlacesComponent, children: [
      { path: "all", component: PlacesListComponent },
      { path: "add", component: PlaceAddComponent },
      { path: "map", component: PlaceMapComponent },
      { path: "update/:id", component: PlaceUpdateComponent},
      { path: ":id", component: PlaceDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule { }
