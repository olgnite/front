import { Injectable, inject } from '@angular/core';
import { URL_TOKEN } from '../tokens/url.token';
import { Observable } from 'rxjs';
import { ICompanyV2Request } from '../interfaces/company.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RequestCompanyService {

    private _url: string = inject(URL_TOKEN);
    private _httpClient: HttpClient = inject(HttpClient);

    public getCompanyById(id: string): Observable<ICompanyV2Request> {
        return this._httpClient.get<ICompanyV2Request>(`${this._url}/company/${id}`);
    }

    public getCompanies(): Observable<ICompanyV2Request[]> {
        return this._httpClient.get<ICompanyV2Request[]>(`${this._url}/company`);
    }

    public updateCompany(company: ICompanyV2Request): Observable<void> {
        return this._httpClient.put<void>(`${this._url}/company`, company);
    }

    public uploadCompanyImage(file: any): Observable<void> {
        return this._httpClient.put<void>(`${this._url}/company/image`, file);
    }

    public removeCompanyImage(): Observable<void> {
        return this._httpClient.delete<void>(`${this._url}/company/image`);
    }
}
