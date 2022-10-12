import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../security/services/auth.service";
import { SessionService } from "../../security/services/session.service";
import { PlacesService } from "../../../features/places/services/places.service";
import { ToastrService } from "ngx-toastr";
import {IPlace} from "../../../features/places/models/IPlace";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // variables
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(255)]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9]+$')]),
  },  {updateOn: 'submit'});

  private places: IPlace[] = [];

  //constructor
  constructor(private authService: AuthService, private sessionService: SessionService, private placesService: PlacesService, private router: Router, private toastr: ToastrService) {}

  // getters
  get isConnected(): boolean {
    return this.sessionService.isConnected();
  }

  get Places(): IPlace[] {
    return <IPlace[]>this.places;
  }

  //methods
  ngOnInit(): void {
    this.loadPlaces();
  }

  private loadPlaces(): void {
    this.placesService.readAll().subscribe((data: IPlace[]) => {
      this.places = data.filter((place) => place.status).sort((place1, place2) => new Date(place2.dateCreated).getTime() - new Date(place1.dateCreated).getTime()).slice(0,4);
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(data => {
        let token = data["token"];
        this.sessionService.login(token);
        this.router.navigate(["/"]);
        this.toastr.success("Login successful", "Success");
      }, () => {
        this.loginForm.patchValue({password: ""});
        this.loginForm.markAsUntouched();
        this.loginForm.markAsPristine();
        this.toastr.error( "Wrong username or password", "Error");
      });
    }
  }
}
