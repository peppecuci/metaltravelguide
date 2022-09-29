import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { PlacesService } from "../../services/places.service";
import { SessionService } from "../../../../core/security/services/session.service";
import { IPlace } from "../../models/IPlace";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-IPlace-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  private place: IPlace | null = null;
  private isOwner: boolean = false;
  private id: number = 0;
  private username: string = "";
  private mapURL: string = "";

  constructor(private placesService: PlacesService, private route: ActivatedRoute, private router: Router, private session: SessionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.placesService.readOne(this.id).subscribe((data: IPlace) => {
      this.place = data;
      let token: string = "";
      if (localStorage.getItem("token") != null)
      { // @ts-ignore
        token = localStorage.getItem("token");
        this.username = this.session.getUser(token)
        this.isOwner = data.username == this.username;
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

  get IsConnected(): boolean {
    return this.session.isConnected();
  }

  get Id(): number {
    return this.id;
  }

  get Username(): string {
    return this.username;
  }

  get MapURL(): string {
    return this.mapURL;
  }

  delete(): void {
    if (confirm("Are you sure you want to delete this Place?")) {
      this.placesService.delete(this.id).subscribe(() => {
        this.router.navigate(["/places/all"]);
        this.toastr.success("Place deleted successfully", "Success");
      }, response => {
        this.toastr.error("Error deleting place", "Error");
      });
    }
  }
}
