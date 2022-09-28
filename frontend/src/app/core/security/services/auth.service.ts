import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // variables
  private apiServer = environment.APISERVER + "user/";

  // constructors
  constructor(private httpClient: HttpClient) { }

  // methods
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + "login", {"username": username, "password": password });
  }

  register(form: any): Observable<any> {
    const user: any = {
      "username": form.username,
      "mail": form.mail,
      "password": form.password,
      "firstName": form.firstName,
      "lastName": form.lastName,
      "countryIso": form.countryIso
    }
    return this.httpClient.post<any>(this.apiServer + "register", user);
  }
}
