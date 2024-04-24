import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IPath } from '../../interfaces/path.interface';
import { paths } from '../../consts/paths';

@Component({
    selector: 'cabinet-header',
    templateUrl: './cabinet-header.component.html',
    styleUrls: ['./styles/cabinet-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetHeaderComponent {

    public paths: IPath[] = paths;
}
