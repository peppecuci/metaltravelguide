import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { IUser } from "../models/IUser";
import { IPlace } from "../../places/models/IPlace";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiServer = environment.APISERVER + "user/";

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<IUser[]> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.get<IUser[]>(this.apiServer + "all", {headers}).pipe(catchError(this.errorHandler));
  }

  getProfile(): Observable<IUser> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.get<IUser>(this.apiServer + "profile", {headers}).pipe(catchError(this.errorHandler));
  }

  update(form: any): Observable<any> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const user: any = {
      "username": form.username,
      "mail": form.mail,
      "firstName": form.firstName,
      "lastName": form.lastName,
      "countryIso": form.countryIso
    }
    if (form.password.length > 0)
      user.password = form.password;
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.patch<any>(this.apiServer + "updateProfile", user, {headers}).pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<IPlace> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.delete<any>(this.apiServer + "delete/" + id, {headers}).pipe(catchError(this.errorHandler));
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
