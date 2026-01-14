import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    /**
     *
     */
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot ): boolean{
        
        if(!this.authService.isLoggedIn()){
            this.router.navigate(['/auth/login']);
            return false;
        }

        const allowedRoles = route.data['roles'] as string[] | undefined;

        if(!allowedRoles || allowedRoles.length === 0){
            return true;
        }

        const userRole = this.authService.getRole();

        if(userRole && allowedRoles.includes(userRole)){
            return true;
        }

        this.router.navigate(['/*']);
        return false;

    }
}
