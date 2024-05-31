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
        if (!this._cacheRequestService.photoGalleryCache.has(this._url)) {
            return this._httpClient.get<IPhotoRequest[]>(`${this._url}/photo`)
                .pipe(
                    tap(data => this._cacheRequestService.photoGalleryCache.set(this._url, data))
                );
        }

        return of(this._cacheRequestService.photoGalleryCache.get(this._url) || []);
    }

    public getPhotoById(id: string): Observable<IPhotoRequest> {
        if (!this._cacheRequestService.photoByIdCache.has(id)) {
            return this._httpClient.get<IPhotoRequest>(`${this._url}/photo/${id}`)
                .pipe(
                    tap(data => this._cacheRequestService.photoByIdCache.set(id, data))
                );
        }

        return of(this._cacheRequestService.photoByIdCache.get(id) || {} as IPhotoRequest);
    }

    public addPhoto(file: any): Observable<void> {
        return this._httpClient.post<void>(`${this._url}/photo`, file);
    }

    public removePhoto(id: string): Observable<void> {
        return this._httpClient.delete<void>(`${this._url}/photo?uuid=${id}`);
    }

}
