import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { URL_TOKEN } from '../tokens/url.token';
import { Observable, of, tap } from 'rxjs';
import { IPhotoRequest } from '../interfaces/photo.interface';
import { CacheRequestService } from './cache-request.service';

@Injectable()
export class RequestPhotoGalleryService {

    private _url: string = inject(URL_TOKEN);
    private _httpClient: HttpClient = inject(HttpClient);
    private _cacheRequestService: CacheRequestService = inject(CacheRequestService);

    public getPhotoGallery(): Observable<IPhotoRequest[]> {
        return this._httpClient.get<IPhotoRequest[]>(`${this._url}/photo`)
            .pipe(
                tap(data => this._cacheRequestService.photoGalleryCache.set(this._url, data))
            );
    }

    public getPhotoById(id: string): Observable<IPhotoRequest> {
        return this._httpClient.get<IPhotoRequest>(`${this._url}/photo/${id}`)
            .pipe(
                tap(data => this._cacheRequestService.photoByIdCache.set(id, data))
            );
    }

    public addPhoto(file: any, isCompanyPhoto: boolean = false): Observable<void> {
        return this._httpClient.post<void>(`${this._url}/photo?is_company_photo=${isCompanyPhoto}`, file);
    }

    public removePhoto(id: string): Observable<void> {
        return this._httpClient.delete<void>(`${this._url}/photo?uuid=${id}`);
    }

}
