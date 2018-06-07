import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpResponse } from '@angular/common/http'
import { AuthenticationService } from "../Services/authentication.service";

@Component({
    templateUrl: '../Htmls/recoverPassword.component.html',
    providers: [AuthenticationService],
    styleUrls: ['../CSS/recoverPassword.component.css']

})
export class RecoverPasswordComponent {
    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService) {
    }
    email: string;
    token: string;
    newPasswordText: string;
    newPasswordConfirmText: string;

    recoverPassword() {
        this.email = this.route.snapshot.paramMap.get('email');
        this.token = this.route.snapshot.paramMap.get('token');
        this.authService.recoverPassword(this.email, this.newPasswordText, this.token)
            .then(response => {
                this.router.navigate(['/login']);
            });
    }
}