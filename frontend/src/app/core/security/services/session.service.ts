import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import jwtDecode from "jwt-decode";
import { IPayload } from "../types/IPayload";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // variables
  private token$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  // constructor
  constructor() {
    const token = localStorage.getItem("token");
    if (token) {
      this.token$.next(token);
    }
  }

  // getters
  get Token$(): Observable<string | null> {
    return this.token$.asObservable();
  }

  // methods
  public login(token: string) {
    localStorage.setItem("token", token);
    this.token$.next(token);
  }

  public logout() {
    this.token$.next(null);
  }

  public getUser(token: string): any {
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
