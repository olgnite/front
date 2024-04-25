import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPath } from '../../interfaces/path.interface';
import { paths } from '../../consts/paths';

@Component({
    selector: 'cabinet-header',
    templateUrl: './cabinet-header.component.html',
    styleUrls: ['./styles/cabinet-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetHeaderComponent {

    @Input()
    public image!: string;

    @Input()
    public title!: string;

    public paths: IPath[] = paths;
}
