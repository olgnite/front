import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        @Inject(AuthorizationService) public authorizationService: AuthorizationService
    ) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string | null = localStorage.getItem('access_token');
        request = request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) })

        return next.handle(request);
    }
}
