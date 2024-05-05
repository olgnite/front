import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, distinctUntilChanged } from 'rxjs';

@Injectable()
export class CurrentPathService extends Observable<string> {

    private _path$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor() {
        super((observer: Subscriber<string>) => this._path$.pipe(distinctUntilChanged()).subscribe(observer))
    }

    public updatePath(path: string): void {
        this._path$.next(path);
    }
}
