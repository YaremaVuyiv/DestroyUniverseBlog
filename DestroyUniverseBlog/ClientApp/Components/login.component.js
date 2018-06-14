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
import { User } from "../Models/User";
var LoginComponent = (function () {
    function LoginComponent(router, route, authenticationService) {
        this.router = router;
        this.route = route;
        this.authenticationService = authenticationService;
        this.user = new User("", "", "", "", "");
        this.isSuccessfulLogin = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.isSuccessfulLogin = true;
    };
    LoginComponent.prototype.registerClick = function () {
        this.router.navigate(['/register']);
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authenticationService.login(this.user).then(function (data) {
            if (data != null && data.length > 0) {
                parent.document.getElementById('logButton').innerText = "Log out";
                _this.router.navigate(['/']);
                _this.route.queryParams.subscribe(function (params) {
                    var returnUrl = params['returnUrl'];
                    if (returnUrl != null && returnUrl != undefined) {
                        _this.router.navigate([returnUrl]);
                    }
                });
            }
            else {
                _this.isSuccessfulLogin = false;
            }
        })
            .catch(function (error) {
            _this.isSuccessfulLogin = false;
            _this.errorMessage = error.text();
            //console.log('asdasdasdasd');
            //console.log(error.text());
            //console.log(typeof error);
            //document.getElementById('errorParagraph').innerHTML = error.text();
        });
        this.authenticationService.canAccessAdminFields().then(function (data) { return console.log(data); })
            .catch(function (err) { console.log(err); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        templateUrl: '../Htmls/login.component.html',
        providers: [AuthenticationService],
        styleUrls: ['../CSS/login.component.css']
    }),
    __metadata("design:paramtypes", [Router, ActivatedRoute, AuthenticationService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map