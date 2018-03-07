import { Injectable } from '@angular/core';

import { User } from './user.model';
import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UserService {
    static END_POINT = '/users';

    constructor(private httpService: HttpService, public snackBar: MatSnackBar) {
    }

    readObservable(mobile: number): Observable<User> {
        return this.httpService.authToken().get(UserService.END_POINT + '/' + mobile);
    }

    createObservable(user: User): Observable<boolean> {
        return this.httpService.authToken().post(UserService.END_POINT, user).map(
            data => {
                this.successful();
                return data;
            }
        );
    }

    putObservable(user: User): Observable<boolean> {
        return this.httpService.authToken().put(UserService.END_POINT + '/' + user.mobile, user).map(
            data => {
                this.successful();
                return data;
            }
        );
    }

    readAll(): Observable<User[]> {
        return this.httpService.authToken().get(UserService.END_POINT);
    }

    private successful() {
        this.snackBar.open('Successful', '', {
            duration: 2000
        });
    }

}