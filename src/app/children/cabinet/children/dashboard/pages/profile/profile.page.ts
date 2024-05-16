import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileViewModel } from '../../view-model/profile.view-model';
import { BehaviorSubject } from 'rxjs';

@Component({
    templateUrl: './profile.page.html',
    styleUrls: ['./styles/profile.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage {
    public profileViewModel: ProfileViewModel = new ProfileViewModel();
    public isEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    public goToBack(): void {
        history.back();
    }

    public editMode(flag: boolean): void {
        this.isEdit$.next(flag);
    }

    public onSubmit(): void {
        console.log(this.profileViewModel.toModel());
    }
}
