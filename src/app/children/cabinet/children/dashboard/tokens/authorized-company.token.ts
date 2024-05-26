import { InjectionToken } from '@angular/core';
import { ICompanyV2Request } from '../interfaces/company.interface';
import { Observable } from 'rxjs';

export const AUTHORIZED_COMPANY: InjectionToken<Observable<ICompanyV2Request>> = new InjectionToken<Observable<ICompanyV2Request>>('Токен для авторизованной компании');
