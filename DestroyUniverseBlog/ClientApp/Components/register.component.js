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
import { AuthenticationService } from "../Services/authentication.service";
import { User } from "../Models/User";
var RegisterComponent = (function () {
    function RegisterComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.user = new User("", "", "", "", "");
        this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.authenticationService.register(this.user).then(function (data) {
            parent.document.getElementById('emailConfirmAlert').hidden = false;
            _this.router.navigate(['/']);
        })
            .catch(function (error) { return console.log(error); });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    Component({
        templateUrl: '../Htmls/register.component.html',
        providers: [AuthenticationService],
        styleUrls: ['../CSS/register.component.css']
    }),
    __metadata("design:paramtypes", [Router,
        AuthenticationService])
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map