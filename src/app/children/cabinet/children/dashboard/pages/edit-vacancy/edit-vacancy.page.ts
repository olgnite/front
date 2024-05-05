import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DestroyService } from '../../../../../../services/destroy.service';
import { EditVacancyViewModel } from '../../view-model/edit-vacancy.view-model';

@Component({
    templateUrl: './edit-vacancy.page.html',
    styleUrls: ['./styles/edit-vacancy.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditVacancyPage {

    public viewModel: EditVacancyViewModel = new EditVacancyViewModel();

    private _destroy$: DestroyService = inject(DestroyService);

    public goToBack(): void {
        history.back();
    }

    public onSubmit(): void {
        console.log(this.viewModel.toModel());
        this.viewModel.form.reset();
    }
}
