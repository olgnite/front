import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonType } from "./types/button.type";

@Component({
    standalone: true,
    selector: 'ui-campus-button',
    templateUrl: './сampus-button.component.html',
    styleUrls: ['./сampus-button.component.scss'],
    imports: [
        CommonModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiCampusButtonComponent {
    @Input()
    public clickType: 'submit' | 'button' | 'reset' = 'button';

    @Input()
    public type: ButtonType = 'primary';

    @Input()
    public disabled = false;
}
