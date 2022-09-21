import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

import { IPlace } from "../models/IPlace";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private apiServer = environment.APISERVER + "place/";

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<IPlace[]> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.get<IPlace[]>(this.apiServer + "all", {headers}).pipe(catchError(this.errorHandler));
  }

  readOne(id: number): Observable<IPlace> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    return this.httpClient.get<IPlace>(this.apiServer + id, {headers}).pipe(catchError(this.errorHandler));
  }

  update(id: number, place: any): Observable<IPlace> {
    let token: string = "";
    if (localStorage.getItem("token") != null)
    { // @ts-ignore
      token = localStorage.getItem("token");
    }
    const headers = new HttpHeaders().append("Authorization", `Bearer ${token}`);
    console.log(place);
    return this.httpClient.patch<any>(this.apiServer + "update/" + id, place, {headers}).pipe(catchError(this.errorHandler));
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
