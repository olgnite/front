import { Injectable, inject } from '@angular/core';
import { URL_TOKEN } from '../tokens/url.token';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IVacancyCard, IVacancyCardRequest } from '../../../interfaces/vacancy-card.interface';
import { CacheRequestService } from './cache-request.service';

@Injectable()
export class RequestVacancyService {

    private _url: string = inject(URL_TOKEN);
    private _httpClient: HttpClient = inject(HttpClient);
    private _cacheRequestService: CacheRequestService = inject(CacheRequestService);

    public getVacancyList(): Observable<IVacancyCardRequest[]> {
        if (!this._cacheRequestService.vacanciesCache.has(this._url)) {
            return this._httpClient.get<IVacancyCardRequest[]>(`${this._url}/vacancy`)
                .pipe(
                    tap(data => this._cacheRequestService.vacanciesCache.set(this._url, data))
                );
        }

        return of(this._cacheRequestService.vacanciesCache.get(this._url) || []);
    }

    public getVacancyById(id: string): Observable<IVacancyCardRequest> {
        return this._httpClient.get<IVacancyCardRequest>(`${this._url}/vacancy/${id}`);
    }

    public addVacancy(vacancy: IVacancyCard): Observable<void> {
        return this._httpClient.post<void>(`${this._url}/vacancy`, vacancy);
    }

    public updateVacancy(vacancy: IVacancyCard, id: string): Observable<IVacancyCardRequest> {
        return this._httpClient.put<IVacancyCard>(`${this._url}/vacancy/${id}`, vacancy);
    }

    public removeVacancyById(id: string): Observable<void> {
        return this._httpClient.delete<void>(`${this._url}/vacancy/${id}`);
    }
}
