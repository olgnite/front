import { Injectable, inject } from '@angular/core';
import { URL_TOKEN } from '../tokens/url.token';
import {catchError, Observable, of, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IVacancyCard, IVacancyCardRequest } from '../../../interfaces/vacancy-card.interface';
import { CacheRequestService } from './cache-request.service';
import {IVacanciesAppliedFilters} from "../interfaces/vacancies-filters.interface";

@Injectable()
export class RequestVacancyService {

    private _url: string = inject(URL_TOKEN);
    private _httpClient: HttpClient = inject(HttpClient);
    private _cacheRequestService: CacheRequestService = inject(CacheRequestService);

    public getVacancyList(): Observable<IVacancyCardRequest[]> {
        return this._httpClient.get<IVacancyCardRequest[]>(`${this._url}/vacancy`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'rejectUnauthorized': 'false'
            }
        })
            .pipe(
                tap(data => this._cacheRequestService.vacanciesCache.set(this._url, data))
            );
    }

    public getVacancyById(id: string): Observable<IVacancyCardRequest> {
        return this._httpClient.get<IVacancyCardRequest>(`${this._url}/vacancy/${id}`)
            .pipe(
                tap(data => this._cacheRequestService.vacancyByIdCache.set(id, data))
            );
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

    public getVacancyListWithFilters(filters: IVacanciesAppliedFilters): Observable<IVacancyCardRequest[]> {
        const nonEmptyFieldsFilters = {};

        for (const field in filters) {
            // @ts-ignore
            if (filters[field] !== '' && filters[field] !== null && filters[field] !== undefined) {
                // @ts-ignore
                nonEmptyFieldsFilters[field] = filters[field];
            }
        }

        return this._httpClient.get<IVacancyCardRequest[]>(`${this._url}/vacancy`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'rejectUnauthorized': 'false'
            },
            params: {...nonEmptyFieldsFilters}
        })
            .pipe(
                catchError(() => {
                    alert('Возникла ошибка!');

                    return this.getVacancyList();
                }),
                tap(data => this._cacheRequestService.vacanciesCache.set(this._url, data))
            );
    }
}
