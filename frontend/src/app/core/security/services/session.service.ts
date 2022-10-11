import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import jwtDecode from "jwt-decode";
import { IPayload } from "../types/IPayload";
import { IUser } from "../../../features/users/models/IUser";
import { UsersService } from "../../../features/users/services/users.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // variables
  private token$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private user?: IUser;

  // constructor
  constructor(private usersService: UsersService) {
    const token = localStorage.getItem("token");
    if (token) {
      this.token$.next(token);
      this.usersService.getProfile().subscribe((data: IUser) => this.user = data);
    }
  }

  // getters
  get Token$(): Observable<string | null> {
    return this.token$.asObservable();
  }

  get User(): IUser {
    return <IUser>this.user;
  }

  // setters
  set User(user: IUser) {
    this.user = user;
  }

// methods
  public login(token: string) {
    localStorage.setItem("token", token);
    this.token$.next(token);
    this.usersService.getProfile().subscribe((data: IUser) => this.user = data);
  }

  public logout() {
    this.token$.next(null);
    this.user = {countryIso: "", id: 0, image: "", nickname: "", password: "", places: [], username: ""};
  }

  public getUsername(token: string): any {
    return jwtDecode<IPayload>(token).sub;
  }

  public getRole(token: string): any {
    return jwtDecode<IPayload>(token).roles[0];
  }

  public isConnected(): boolean {
    let isConnected = false;
    this.Token$.subscribe( token => {
      if (token != null)
        isConnected = true;
    });
    return isConnected;
  }

  public isAdmin(): boolean {
    let isAdmin = false;
    this.Token$.subscribe( token => {
      if (token != null && this.getRole(token) == "ROLE_ADMIN")
        isAdmin = true;
    });
    return isAdmin;
  }
}
