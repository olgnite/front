import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IVacanciesAppliedFilters} from "../interfaces/vacancies-filters.interface";

@Injectable({
  providedIn: 'root'
})

export class FiltersCacheService {
  constructor() { }

  public appliedFilters$ = new BehaviorSubject<IVacanciesAppliedFilters>({} as IVacanciesAppliedFilters);


}
