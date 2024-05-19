import { Injectable, inject } from '@angular/core';
import { URL_TOKEN } from '../tokens/url.token';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IVacancyCard } from '../../../interfaces/vacancy-card.interface';

@Injectable()
export class RequestVacancyService {

    private _url: string = inject(URL_TOKEN);
    private _httpClient: HttpClient = inject(HttpClient);

    public getVacancyList(): Observable<IVacancyCard[]> {
        return this._httpClient.get<IVacancyCard[]>(`${this._url}/vacancy`);
    }

    public getVacancyById(id: string): Observable<IVacancyCard> {
        return this._httpClient.get<IVacancyCard>(`${this._url}/vacancy/${id}`);
    }

    public addVacancy(vacancy: IVacancyCard): Observable<void> {
        return this._httpClient.post<void>(`${this._url}/vacancy`, vacancy);
    }

    public updateVacancy(vacancy: IVacancyCard, id: string): Observable<IVacancyCard> {
        return this._httpClient.put<IVacancyCard>(`${this._url}/vacancy/${id}`, vacancy);
    }

    public removeVacancyById(id: string): Observable<void> {
        return this._httpClient.delete<void>(`${this._url}/vacancy/${id}`);
    }
}
