import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

@Injectable()
export class RegisTokenGuard implements CanActivate {
    constructor(private http: HttpClient, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const email = route.url[1].path;
        if(!email) {
            this.router.navigate(['noTokenFound'])
        }
        this.http.get(`http://localhost:3000/users/verifyRegisToken?email=${email}`).subscribe({
            next: (res) => {
                console.log(res)
                return true;
            },
            error: (err) => {
                this.router.navigate(['noTokenFound'])
            }
        })
        return true;
    }
}