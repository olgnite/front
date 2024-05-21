import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {URL_TOKEN} from "../children/cabinet/children/dashboard/tokens/url.token";
import {ILogin, ILoginResponse, IRegistration, IRegistrationResponse} from "../children/cabinet/interfaces/authorization.interface";
import {BehaviorSubject, Observable, of} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
    private _url: string = inject(URL_TOKEN);
    private _httpClient: HttpClient = inject(HttpClient);
    private _jwt: JwtHelperService = inject(JwtHelperService);

    readonly isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);


    registration(data: IRegistration): Observable<IRegistrationResponse> {
        return this._httpClient.post<IRegistrationResponse>(`${this._url}/auth/register`, data);
    }

    login(data: ILogin): Observable<ILoginResponse> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        }

        const body = new URLSearchParams();

        body.set('username', data.username);
        body.set('password', data.password);

        return this._httpClient.post<ILoginResponse>(`${this._url}/auth/jwt/login`, body.toString(), httpOptions);
    }

    logout(): void {
        localStorage.removeItem('access_token');

        this.isTokenValid();
    }

    isTokenValid(): boolean {
        const token = localStorage.getItem('access_token');

        const isValid = !!token && !this._jwt.isTokenExpired(token);

        this.isLoggedIn$.next(isValid);

        return isValid;
    }
}
