import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { URL_TOKEN } from '../tokens/url.token';
import { Observable } from 'rxjs';

@Injectable()
export class RequestPhotoGalleryService {

    private _url: string = inject(URL_TOKEN);
    private _httpClient: HttpClient = inject(HttpClient);

    public getPhotoGallery(): Observable<any> {
        return this._httpClient.get<any>(`${this._url}/photo`);
    }

    public addPhoto(photo: any): Observable<void> {
        return this._httpClient.post<void>(`${this._url}/photo`, photo);
    }

    public removePhoto(photoName: string): Observable<void> {
        return this._httpClient.delete<void>(`${this._url}/photo?photo_name=${photoName}`);
    }
}
