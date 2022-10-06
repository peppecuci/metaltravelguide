import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { UsersService } from "../../../users/services/users.service";
import { PlacesService } from "../../services/places.service";
import { SessionService } from "../../../../core/security/services/session.service";
import { IUser } from "../../../users/models/IUser";
import { IPlace } from "../../models/IPlace";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-IPlace-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  private place: IPlace | null = null;
  private placeId: number = 0;
  private userId: number = 0;
  private isOwner: boolean = false;
  private isLiked: boolean = false;
  private mapURL: string = "";

  // constructor
  constructor(private usersService: UsersService, private placesService: PlacesService, private route: ActivatedRoute, private router: Router, private session: SessionService, private toastr: ToastrService) { }

  // getters
  get Place(): IPlace {
    return <IPlace>this.place;
  }

  get IsOwner(): boolean {
    return this.isOwner;
  }

  get IsLiked(): boolean {
    return this.isLiked;
  }

  get IsAdmin(): boolean {
    return this.session.isAdmin();
  }

  get IsConnected(): boolean {
    return this.session.isConnected();
  }

  get PlaceId(): number {
    return this.placeId;
  }

  get UserId(): number {
    return this.userId;
  }

  get MapURL(): string {
    return this.mapURL;
  }

  // methods
  ngOnInit(): void {
    this.placeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPlace();
  }

  private loadPlace(): void {
    this.placesService.readOne(this.placeId).subscribe((place: IPlace) => {
      this.place = place;
      if (this.session.isConnected()) {
        this.usersService.getProfile().subscribe((user: IUser) => {
          this.userId = user.id;
          this.isOwner = user.id == place.userId;
          this.isLiked = place.likes.includes(user.username);
        });
      }
      this.mapURL = `https://www.google.com/maps/embed/v1/search?key=${environment.APIKEY}&q=${this.place.address.street}+${this.place.address.number}+${this.place.address.city}`;
    });
  }

  delete(): void {
    if (confirm("Are you sure you want to delete this Place?")) {
      this.placesService.delete(this.placeId).subscribe(() => {
        this.router.navigate(["/places/all"]);
        this.toastr.success("Place deleted successfully", "Success");
      }, () => {
        this.toastr.error("Error deleting place", "Error");
      });
    }
  }

  like(): void {
    this.placesService.like(this.placeId).subscribe(() => this.loadPlace());
  }

  unlike(): void {
    this.placesService.unlike(this.placeId).subscribe(() => this.loadPlace());
  }
}
