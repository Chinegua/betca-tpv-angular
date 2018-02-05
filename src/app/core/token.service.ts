import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';

import { Token } from './token.model';
import { Role } from './role.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { WelcomeComponent } from '../welcome/welcome.component';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class TokensService {
    static END_POINT = '/tokens';

    private loginUrl: String;

    constructor(private httpService: HttpService, private router: Router, public snackBar: MatSnackBar) {
        this.httpService.authorizedObservable().subscribe(
            value => {
                if (value) {
                    this.router.navigate(['/' + this.loginUrl]);
                } else {
                    this.snackBar.open('Bad Credentials', 'Error', {
                        duration: 8000
                    });
                    this.router.navigate(['']);
                }

            }
        );
    }

    logout() {
        this.httpService.logout();
    }

    login(mobile: number, password: string, route?: string) {
        this.loginUrl = route;
        this.httpService.login(mobile, password, TokensService.END_POINT);
    }

    isLogged(): boolean {
        return this.httpService.isAuthorized();
    }

    isAdmin(): boolean {
        if (this.isLogged()) {
            return this.httpService.getRoles().includes(Role.ADMIN);
        } else {
            return false;
        }
    }

    isManager(): boolean {
        if (this.isLogged()) {
            return this.httpService.getRoles().includes(Role.MANAGER);
        } else {
            return false;
        }
    }


}
