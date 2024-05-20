import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {URL_TOKEN} from "../children/dashboard/tokens/url.token";
import {ILogin, IRegistration, IRegistrationResponse} from "../interfaces/authorization.interface";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
    private _url: string = inject(URL_TOKEN);
    private _httpClient: HttpClient = inject(HttpClient);


    registration(data: IRegistration): Observable<IRegistrationResponse> {
        return this._httpClient.post<IRegistrationResponse>(`${this._url}/auth/register`, data);
    }

    login(data: ILogin): Observable<unknown> {
        console.log(data);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        }

        const body = new URLSearchParams();

        body.set('username', data.username);
        body.set('password', data.password);

        return this._httpClient.post(`${this._url}/auth/jwt/login`, body.toString(), httpOptions);
    }
}
