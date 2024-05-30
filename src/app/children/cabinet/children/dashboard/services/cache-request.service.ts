import { Injectable } from '@angular/core';
import { ICompanyV2Request } from '../interfaces/company.interface';
import { IVacancyCardRequest } from '../../../interfaces/vacancy-card.interface';
import { IPhotoRequest } from '../interfaces/photo.interface';

@Injectable()
export class CacheRequestService {

    public companiesCache: Map<string, ICompanyV2Request[]> = new Map<string, ICompanyV2Request[]>();

    public companyIdCache: Map<string, ICompanyV2Request> = new Map<string, ICompanyV2Request>();

    public vacanciesCache: Map<string, IVacancyCardRequest[]> = new Map<string, IVacancyCardRequest[]>();

    public photoGalleryCache: Map<string, IPhotoRequest[]> = new Map<string, IPhotoRequest[]>();
}
