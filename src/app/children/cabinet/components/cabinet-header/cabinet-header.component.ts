import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { paths } from '../../consts/paths';
import { IPath } from '../../interfaces/path.interface';
import { CurrentPathService } from '../../services/current-path.service';
import { imagePathRecord } from '../../types/image-path.type';

@Component({
    selector: 'cabinet-header',
    templateUrl: './cabinet-header.component.html',
    styleUrls: ['./styles/cabinet-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetHeaderComponent {

    public paths: IPath[] = paths;
    public imagePathList: Record<string, string> = imagePathRecord;

    constructor(@Inject(CurrentPathService) public currentPath$: Observable<string>) {
    }
}
