import {Component, Inject, Injector, OnInit} from '@angular/core';
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {DestroyService} from "../../../../../../services/destroy.service";
import {IVacancyCardRequest} from "../../../../interfaces/vacancy-card.interface";
import {IVacanciesAppliedFilters, IVacanciesFilters} from "../../interfaces/vacancies-filters.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FiltersCacheService} from "../../services/filters-cache.service";

@Component({
  selector: 'vacancies-filter',
  templateUrl: './vacancies-filter.component.html',
  styleUrls: ['./vacancies-filter.component.scss']
})
export class VacanciesFilterComponent implements OnInit {
    public form!: FormGroup;
    public list: IVacancyCardRequest[];
    public filterOptions: IVacanciesFilters = {
        name: [],
        salary: [],
        city: [],
        employment: [],
        experience: []
    }

    constructor(@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext,
                @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector,
                readonly destroy$: DestroyService,
                private formBuilder: FormBuilder,
                private filtersCacheService: FiltersCacheService) {
        this.list = (this.context.data as any).list;
    }

    ngOnInit(): void {
        const appliedFilters = this.filtersCacheService.appliedFilters$.value;
        this.form = this.formBuilder.group<IVacanciesAppliedFilters>({
            name: appliedFilters.name || '',
            city: appliedFilters.city || '',
            experience: appliedFilters.experience || '',
            employment: appliedFilters.employment || '',
            salary: appliedFilters.salary || ''
        });

        for (let obj of this.list) {
            for (let field in this.filterOptions) {
                // @ts-ignore
                const value = obj[field];
                // @ts-ignore
                if (!this.filterOptions[field].includes(value)) {
                    // @ts-ignore
                    this.filterOptions[field].push(value);
                }
            }
        }
    }

    onSubmit(): void {
        this.filtersCacheService.appliedFilters$.next(this.form.value);
        this.context.completeWith();
    }

    clearFilters(): void {
        this.filtersCacheService.appliedFilters$.next({} as IVacanciesAppliedFilters);
        this.form.reset();
    }
}
