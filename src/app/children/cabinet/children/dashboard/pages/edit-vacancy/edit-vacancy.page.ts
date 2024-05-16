import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditVacancyViewModel } from '../../view-model/edit-vacancy.view-model';

@Component({
    templateUrl: './edit-vacancy.page.html',
    styleUrls: ['./styles/edit-vacancy.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditVacancyPage {

    public viewModel: EditVacancyViewModel = new EditVacancyViewModel();

    public goToBack(): void {
        history.back();
    }

    public onSubmit(): void {
        console.log(this.viewModel.toModel());
        this.viewModel.form.reset();
    }
}
