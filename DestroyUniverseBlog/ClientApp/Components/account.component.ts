import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http'
import { User } from "../Models/User";
import { AuthenticationService } from "../Services/authentication.service";

@Component({
    templateUrl: '../Htmls/account.component.html',
    providers: [AuthenticationService]
})
export class AccountComponent implements OnInit {
    user = new User();
    isDataLoaded = false;

    constructor(private router: Router, private authService: AuthenticationService) { }

    ngOnInit() {
        this.loadUserData();
    }

    loadUserData() {
        this.authService.getUserDetails().then((response: User) => {
            this.user = response;
        });
    }

    changePassword() {
        this.router.navigate(['/changePassword']);
    }
}