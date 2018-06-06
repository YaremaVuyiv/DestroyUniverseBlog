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
import { Router } from '@angular/router';
import { User } from "../Models/User";
import { AuthenticationService } from "../Services/authentication.service";
var AccountComponent = (function () {
    function AccountComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.user = new User();
        this.isDataLoaded = false;
    }
    AccountComponent.prototype.ngOnInit = function () {
        this.loadUserData();
    };
    AccountComponent.prototype.loadUserData = function () {
        var _this = this;
        this.authService.getUserDetails().then(function (response) {
            _this.user = response;
        });
    };
    AccountComponent.prototype.changePassword = function () {
        this.router.navigate(['/changePassword']);
    };
    return AccountComponent;
}());
AccountComponent = __decorate([
    Component({
        templateUrl: '../Htmls/account.component.html',
        providers: [AuthenticationService]
    }),
    __metadata("design:paramtypes", [Router, AuthenticationService])
], AccountComponent);
export { AccountComponent };
//# sourceMappingURL=account.component.js.map