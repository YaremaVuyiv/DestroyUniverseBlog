import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpResponse } from '@angular/common/http'
import { AuthenticationService } from "../Services/authentication.service";

@Component({
    templateUrl: '../Htmls/forgotPassword.component.html',
    providers: [AuthenticationService],

})
export class ForgotPasswordComponent {
    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService) { }

    emailToRecover: string;

    recoverPassword() {
        this.authService.forgotPassword(this.emailToRecover).then(response => { this.router.navigate(['/']) });
    }
}