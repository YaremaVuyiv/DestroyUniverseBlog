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
var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(router, route, authService) {
        this.router = router;
        this.route = route;
        this.authService = authService;
    }
    ForgotPasswordComponent.prototype.recoverPassword = function () {
        var _this = this;
        this.authService.forgotPassword(this.emailToRecover).then(function (response) { _this.router.navigate(['/']); });
    };
    return ForgotPasswordComponent;
}());
ForgotPasswordComponent = __decorate([
    Component({
        templateUrl: '../Htmls/forgotPassword.component.html',
        providers: [AuthenticationService],
    }),
    __metadata("design:paramtypes", [Router, ActivatedRoute, AuthenticationService])
], ForgotPasswordComponent);
export { ForgotPasswordComponent };
//# sourceMappingURL=forgotPassword.component.js.map