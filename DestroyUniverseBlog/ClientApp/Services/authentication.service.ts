import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from "../Models/User";

@Injectable()
export class AuthenticationService {
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http) {
        let authToken = localStorage.getItem('token');

        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9',
            'Authorization': `Bearer ${authToken}`,
        });
        this.options = new RequestOptions({ headers: this.headers });
    }

    private url = "/api/account";

    login(user: User): Promise<string> {
        return this.http.post(this.url + '/login', JSON.stringify({ username: user.userName, password: user.password }), this.options).toPromise()
            .then(response => {
                var token = response.text().toString();
                if (token != null && token.length > 0) {
                    localStorage.setItem('token', token);
                    let authToken = localStorage.getItem('token');

                    this.headers = new Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'q=0.8;application/json;q=0.9',
                        'Authorization': `Bearer ${authToken}`,
                    });
                    this.options = new RequestOptions({ headers: this.headers });

                    return response.text();
                }

            }).catch(this.handleError);
    }

    changePassword(oldPassword: string, newPassword: string) {
        return this.http.post(this.url + '/changePassword', JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword }), this.options).toPromise()
            .then(response => {
                return response;
            });
    }

    alreadyLoggedIn(): Promise<any> {
        return this.http.get(this.url + '/logInIfValidToken', this.options)
            .toPromise()
            .then(response => { return response; });
    }

    canAccessAdminFields(): Promise<boolean> {
        return this.http.get(this.url, this.options)
            .toPromise()
            .then(response => {
                return response.text() == 'true';
            });
    }

    register(user: User): Promise<string> {
        return this.http.post(this.url + '/register', JSON.stringify({ username: user.userName, email: user.email, password: user.password, passwordConfirm: user.passwordConfirm }), this.options)
            .toPromise()
            .then(response => {
                localStorage.setItem('token', response.text());
            })
            .catch(this.handleError);
    }

    logout() {
        let authToken = localStorage.getItem('token');

        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9',
            'Authorization': `Bearer ${authToken}`,
        });
        this.options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url, null, this.options).toPromise().then(response => {
            localStorage.removeItem('token');
            return response;
        }).catch(this.handleError);
    }

    forgotPassword(email: string) {
        return this.http.post(this.url + '/forgotPassword', JSON.stringify({ email: email }), this.options).toPromise()
            .then(response => { return response; });
    }

    recoverPassword(email: string, password: string, token: string) {
        return this.http.post(this.url + '/RecoverPassword', JSON.stringify({ email: email, password: password, token: token }), this.options).toPromise()
            .then(response => { return response; });
    }

    getUserDetails() {
        var k = this.http.get(this.url + '/userDetails', this.options);

        return this.http.get(this.url + '/userDetails', this.options).toPromise().then(response => {
            return response.json();
        }).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}