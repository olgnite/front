import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { URL_TOKEN } from "../children/cabinet/children/dashboard/tokens/url.token";
import { ILogin, ILoginResponse, IRegistration, IRegistrationResponse } from "../children/cabinet/interfaces/authorization.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { IPath } from '../children/cabinet/interfaces/path.interface';
import { pathsAuth, pathsUnAuth } from '../children/cabinet/consts/paths';


@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    private _url: string = inject(URL_TOKEN);
    private _httpClient: HttpClient = inject(HttpClient);
    private _jwt: JwtHelperService = inject(JwtHelperService);

    readonly isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public paths$: BehaviorSubject<IPath[]> = new BehaviorSubject<IPath[]>(!this.isLoggedIn$.value ? pathsAuth : pathsUnAuth);

    public registration(data: IRegistration): Observable<IRegistrationResponse> {
        return this._httpClient.post<IRegistrationResponse>(`${this._url}/auth/register`, data);
    }

    public login(data: ILogin): Observable<ILoginResponse> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };

        const body = new URLSearchParams();

        body.set('username', data.username);
        body.set('password', data.password);

        return this._httpClient.post<ILoginResponse>(`${this._url}/auth/jwt/login`, body.toString(), httpOptions);
    }

    public logout(): void {
        localStorage.removeItem('access_token');
        this.paths$.next(pathsUnAuth);

        this.isTokenValid();
    }

    public isTokenValid(): boolean {
        const token = localStorage.getItem('access_token');

        const isValid = !!token && !this._jwt.isTokenExpired(token);

        this.isLoggedIn$.next(isValid);

        return isValid;
    }

    public changePassword(data: { password: string, new_password: string; }): Observable<void> {
        return this._httpClient.post<void>(`${this._url}/auth/change-password`, data);
    }
}
