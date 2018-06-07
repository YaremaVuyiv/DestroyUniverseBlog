var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "../Services/authentication.service";
var AppComponent = (function () {
    function AppComponent(router, route, authenticationService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.authenticationService = authenticationService;
        this.route.queryParams.subscribe(function (params) {
            var data = params['redirectTo'];
            if (data != null && data != undefined) {
                _this.router.navigate(['/confirmEmail']);
            }
            var email = params['email'];
            var token = params['token'];
            if (email != null && email != undefined && token != undefined) {
                _this.router.navigate(['/recoverPassword', email, token]);
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        this.authenticationService.alreadyLoggedIn().then(function (data) { });
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var token = localStorage.getItem('token');
        document.getElementById('logButton').innerText = token == null || token == "" ? 'Log in' : 'Log out';
    };
    AppComponent.prototype.LogOnOff = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        if (token == null || token == "") {
            this.router.navigate(['/login']);
        }
        else {
            this.authenticationService.logout().then(function (data) {
                document.getElementById('logButton').innerText = 'Log in';
                _this.router.navigate(['/']);
            })
                .catch(function (error) { return console.log(error); });
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'app',
        templateUrl: '../Htmls/app.component.html',
        providers: [AuthenticationService],
        styleUrls: ['../CSS/app.component.css']
    }),
    __metadata("design:paramtypes", [Router, ActivatedRoute,
        AuthenticationService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map