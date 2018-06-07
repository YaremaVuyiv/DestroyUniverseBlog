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
var RecoverPasswordComponent = (function () {
    function RecoverPasswordComponent(router, route, authService) {
        this.router = router;
        this.route = route;
        this.authService = authService;
    }
    RecoverPasswordComponent.prototype.recoverPassword = function () {
        var _this = this;
        this.email = this.route.snapshot.paramMap.get('email');
        this.token = this.route.snapshot.paramMap.get('token');
        this.authService.recoverPassword(this.email, this.newPasswordText, this.token)
            .then(function (response) {
            _this.router.navigate(['/login']);
        });
    };
    return RecoverPasswordComponent;
}());
RecoverPasswordComponent = __decorate([
    Component({
        templateUrl: '../Htmls/recoverPassword.component.html',
        providers: [AuthenticationService],
        styleUrls: ['../CSS/recoverPassword.component.css']
    }),
    __metadata("design:paramtypes", [Router, ActivatedRoute, AuthenticationService])
], RecoverPasswordComponent);
export { RecoverPasswordComponent };
//# sourceMappingURL=recoverPassword.component.js.map