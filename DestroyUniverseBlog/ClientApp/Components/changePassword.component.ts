import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http'
import { User } from "../Models/User";
import { AuthenticationService } from "../Services/authentication.service";

@Component({
    templateUrl: '../Htmls/changePassword.component.html',
    providers: [AuthenticationService],
    styleUrls: ['../CSS/changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {
    oldPasswordText: string;
    newPasswordText: string;
    newPasswordConfirmText: string;
    isDataLoaded = false;

    constructor(private router: Router, private authService: AuthenticationService) { }

    ngOnInit() {
        
    }

    changePassword() {
        this.authService.changePassword(this.oldPasswordText, this.newPasswordText).then();
    }
}