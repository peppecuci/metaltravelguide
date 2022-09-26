import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructors
  constructor(private httpClient: HttpClient) { }

  // methods
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>("https://metaltravelguide.herokuapp.com/api/user/login", {"username": username, "password": password });
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
    return this.httpClient.post<any>("https://metaltravelguide.herokuapp.com/api/user/register", user);
  }
}
