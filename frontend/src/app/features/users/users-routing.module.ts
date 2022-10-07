import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from "./users.component";
import { UsersAllComponent } from "./pages/users-all/users-all.component";
import { UserDetailsComponent } from "./pages/user-details/user-details.component";

const routes: Routes = [
  { path: "", component: UsersComponent, children: [
      { path: "all", component: UsersAllComponent },
      { path: ":id", component: UserDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
