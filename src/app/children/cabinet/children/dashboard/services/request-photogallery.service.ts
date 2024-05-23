import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { URL_TOKEN } from '../tokens/url.token';
import { Observable } from 'rxjs';
import { IPhotoRequest } from '../interfaces/photo.interface';

@Injectable()
export class RequestPhotoGalleryService {

    private _url: string = inject(URL_TOKEN);
    private _httpClient: HttpClient = inject(HttpClient);

    public getPhotoGallery(): Observable<IPhotoRequest[]> {
        return this._httpClient.get<IPhotoRequest[]>(`${this._url}/photo`);
    }

    public addPhoto(file: any): Observable<void> {
        return this._httpClient.post<void>(`${this._url}/photo`, file);
    }

    public removePhoto(id: string): Observable<void> {
        return this._httpClient.delete<void>(`${this._url}/photo?uuid=${id}`);
    }
}
