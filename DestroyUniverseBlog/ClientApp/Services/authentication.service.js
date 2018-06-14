var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.url = "/api/account";
        var authToken = localStorage.getItem('token');
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9',
            'Authorization': "Bearer " + authToken,
        });
        this.options = new RequestOptions({ headers: this.headers });
    }
    AuthenticationService.prototype.login = function (user) {
        var _this = this;
        return this.http.post(this.url + '/login', JSON.stringify({ username: user.userName, password: user.password }), this.options).toPromise()
            .then(function (response) {
            var token = response.text().toString();
            if (token != null && token.length > 0) {
                localStorage.setItem('token', token);
                var authToken = localStorage.getItem('token');
                _this.headers = new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'q=0.8;application/json;q=0.9',
                    'Authorization': "Bearer " + authToken,
                });
                _this.options = new RequestOptions({ headers: _this.headers });
                console.log(response.text());
                return response.text();
            }
        }).catch(this.handleError);
    };
    AuthenticationService.prototype.changePassword = function (oldPassword, newPassword) {
        return this.http.post(this.url + '/changePassword', JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword }), this.options).toPromise()
            .then(function (response) {
            return response;
        });
    };
    AuthenticationService.prototype.alreadyLoggedIn = function () {
        return this.http.get(this.url + '/logInIfValidToken', this.options)
            .toPromise()
            .then(function (response) { return response; });
    };
    AuthenticationService.prototype.canAccessAdminFields = function () {
        return this.http.get(this.url, this.options)
            .toPromise()
            .then(function (response) {
            return response.text() == 'true';
        });
    };
    AuthenticationService.prototype.register = function (user) {
        return this.http.post(this.url + '/register', JSON.stringify({ username: user.userName, email: user.email, password: user.password, passwordConfirm: user.passwordConfirm }), this.options)
            .toPromise()
            .then(function (response) {
            localStorage.setItem('token', response.text());
        })
            .catch(function (reason) { return reason; });
    };
    AuthenticationService.prototype.logout = function () {
        var authToken = localStorage.getItem('token');
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9',
            'Authorization': "Bearer " + authToken,
        });
        this.options = new RequestOptions({ headers: this.headers });
        return this.http.post(this.url, null, this.options).toPromise().then(function (response) {
            localStorage.removeItem('token');
            return response;
        }).catch(this.handleError);
    };
    AuthenticationService.prototype.forgotPassword = function (email) {
        return this.http.post(this.url + '/forgotPassword', JSON.stringify({ email: email }), this.options).toPromise()
            .then(function (response) { return response; });
    };
    AuthenticationService.prototype.recoverPassword = function (email, password, token) {
        return this.http.post(this.url + '/RecoverPassword', JSON.stringify({ email: email, password: password, token: token }), this.options).toPromise()
            .then(function (response) { return response; });
    };
    AuthenticationService.prototype.getUserDetails = function () {
        var k = this.http.get(this.url + '/userDetails', this.options);
        return this.http.get(this.url + '/userDetails', this.options).toPromise().then(function (response) {
            return response.json();
        }).catch(this.handleError);
    };
    AuthenticationService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map