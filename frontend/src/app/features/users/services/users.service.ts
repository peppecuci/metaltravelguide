import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { IUser } from "../models/IUser";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiServer = environment.APISERVER + "user/";

  constructor(private _http: HttpClient) { }

  readAll(): Observable<IUser[]> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this._http.get<IUser[]>(this.apiServer + "all", {headers}).pipe(catchError(this.errorHandler));
  }

  getProfile(): Observable<IUser> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this._http.get<IUser>(this.apiServer + "profile", {headers}).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
