import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpResponse } from '@angular/common/http'
import { AuthenticationService } from "../Services/authentication.service";

@Component({
    selector: 'app',
    templateUrl: '../Htmls/app.component.html',
    providers: [AuthenticationService],
    styleUrls:['../CSS/app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

    constructor(private router: Router, private route: ActivatedRoute,
        private authenticationService: AuthenticationService) {
        this.route.queryParams.subscribe(params => {
            let data = params['redirectTo'];
            if (data != null && data != undefined) {
                this.router.navigate(['/confirmEmail']);
            }
            let email = params['email'];
            let token = params['token'];
            if (email != null && email != undefined && token != undefined) {
                this.router.navigate(['/recoverPassword', email, token]);
            }
        })
    }

    ngOnInit() {
        this.authenticationService.alreadyLoggedIn().then(data => { });

    }

    ngAfterViewInit() {
        var token = localStorage.getItem('token');
        document.getElementById('logButton').innerText = token == null || token == "" ? 'Log in' : 'Log out';
    }

    LogOnOff() {
        var token = localStorage.getItem('token');
        if (token == null || token == "") {
            this.router.navigate(['/login']);
        }
        else {
            this.authenticationService.logout().then(
                data => {
                    document.getElementById('logButton').innerText = 'Log in';
                    this.router.navigate(['/']);
                })
                .catch(error => console.log(error));

        }
    }
}