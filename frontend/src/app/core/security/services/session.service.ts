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
  login(token: string) {
    localStorage.setItem("token", token);
    this.token$.next(token);
  }

  logout() {
    this.token$.next(null);
  }

  getUser(token: string): any {
      return jwtDecode<IPayload>(token).sub;
  }

  getRole(token: string): any {
    return jwtDecode<IPayload>(token).roles[0];
  }

  isConnected(): boolean {
    let isConnected = false;
    this.Token$.subscribe( data => {
      if (data != null)
        isConnected = true;
    });
    return isConnected;
  }

  isAdmin(): boolean {
    let isAdmin = false;
    this.Token$.subscribe( data => {
      if (data != null && this.getRole(data) == "ROLE_ADMIN")
        isAdmin = true;
    });
    return isAdmin;
  }
}
