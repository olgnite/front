import { Pipe, PipeTransform } from '@angular/core';
import { ICompanyV2Request } from '../children/dashboard/interfaces/company.interface';

@Pipe({
    name: 'searchPartners'
})
export class SearchPartnersPipe implements PipeTransform {

    public transform(partners: ICompanyV2Request[], value: string): ICompanyV2Request[] {
        if (!value) {
            return partners;
        }

        return partners.filter((item: ICompanyV2Request) => item.company_name?.toLowerCase().includes(value.toLowerCase()));
    }
}
