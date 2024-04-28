import { inject, Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { ICompany } from "../interfaces/company.interface";
import { map, Observable, of, switchMap } from "rxjs";
import { AngularFireStorage } from "@angular/fire/compat/storage";

@Injectable({ providedIn: 'root' })
export class EditCompanyService {
    private db = inject(AngularFireDatabase);
    private storage = inject(AngularFireStorage);
    private defaultLogo = 'assets/icons/logo.svg';

    public setEdits(company: ICompany, id: string): void {
        this.db.object(`companies/${id}`).update(company).catch(console.log);
    }

    public getCompanyInfo(id: string): Observable<ICompany> {
        return this.db.object(`companies/${id}`).valueChanges().pipe(
            map((data: unknown) => data as ICompany)
        );
    }

    public getCompanyMainImg(id: string): Observable<string> {
        return this.storage.ref(`companies/${id}/main`).listAll().pipe(
            switchMap(images => {
                const imageRef = images.items[0];

                if (imageRef) {
                    return imageRef.getDownloadURL();
                }

                return of(this.defaultLogo)
            })
        )
    }

    public deleteImg(id: string): string {
        this.storage.ref(`companies/${id}/main/main`).delete();

        return this.defaultLogo;
    }

    public async setMainImg(file: any, id: string): Promise<string> {
        const upload = await this.storage.upload(`companies/${id}/main/main`, file);
        const ref = await upload.ref.getDownloadURL();

        return ref;
    }
}
