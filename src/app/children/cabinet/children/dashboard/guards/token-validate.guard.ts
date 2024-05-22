import { CanActivateFn, Router } from '@angular/router';
import { map } from "rxjs";
import { inject } from "@angular/core";
import { AuthorizationService } from "../../../../../services/authorization.service";


export const TokenValidateGuard: CanActivateFn = () => {
    const authorizationService = inject(AuthorizationService);
    const router: Router = inject(Router);

    authorizationService.isTokenValid();

    return authorizationService.isLoggedIn$.pipe(
        map(isValid => {
            if (!isValid) {
                router.navigate(['/dashboard/partners']);
            }

            return isValid;
        })
    );
}

