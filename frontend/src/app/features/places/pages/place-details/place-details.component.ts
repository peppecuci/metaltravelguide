import { Component, OnInit } from '@angular/core';
import { PlacesService } from "../../services/places.service";
import { IPlace } from "../../models/IPlace";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { SessionService } from "../../../../core/security/services/session.service";

@Component({
  selector: 'app-IPlace-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  private place: IPlace | null = null;
  private isOwner: boolean = false;
  private id: number = 0;
  private mapURL: string = "";

  constructor(private service: PlacesService, private route: ActivatedRoute, private router: Router, private session: SessionService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.readOne(this.id).subscribe((data: IPlace) => {
      this.place = data;
      let token: string = "";
      if (localStorage.getItem("token") != null)
      { // @ts-ignore
        token = localStorage.getItem("token");
        this.isOwner = data.username == this.session.getUser(token);
      }
      this.mapURL = `https://www.google.com/maps/embed/v1/search?key=${environment.APIKEY}&q=${this.place.address.street}+${this.place.address.number}+${this.place.address.city}`;
    });
  }

  get Place(): IPlace {
    return <IPlace>this.place;
  }

  get IsOwner(): boolean {
    return this.isOwner;
  }

  get IsAdmin(): boolean {
    return this.session.isAdmin();
  }

  get Id(): number {
    return this.id;
  }

  get MapURL(): string {
    return this.mapURL;
  }

  delete(): void {
    if (confirm("Are you sure you want to delete this Place?")) {
      this.service.delete(this.id).subscribe(data => this.router.navigate(["/places/all"]));
    }
  }
}
