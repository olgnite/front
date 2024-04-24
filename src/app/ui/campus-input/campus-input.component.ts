import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'ui-campus-input',
    templateUrl: './campus-input.component.html',
    styleUrls: ['./campus-input.component.scss'],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiCampusInputComponent {

    @Input()
    public type: string = 'text';

    @Input()
    public placeholder!: string;
}
