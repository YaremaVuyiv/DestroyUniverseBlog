import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "../Services/authentication.service";
import { User } from "../Models/User";

@Component({
    templateUrl: '../Htmls/login.component.html',
    providers: [AuthenticationService],
    styleUrls: ['../CSS/login.component.css']
})

export class LoginComponent implements OnInit {
    user: User = new User("", "", "", "", "");
    isSuccessfulLogin = true;

    constructor(
        private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
        
    }

    ngOnInit() {
        this.isSuccessfulLogin = true;
    }

    registerClick() {

        this.router.navigate(['/register']);
    }

    login() {
        this.authenticationService.login(this.user).then(
            (data: string) => {
                if (data != null && data.length > 0) {
                    parent.document.getElementById('logButton').innerText = "Log out";
                    this.router.navigate(['/']);

                    this.route.queryParams.subscribe(params => {
                        let returnUrl = params['returnUrl'];
                        if (returnUrl != null && returnUrl != undefined) {
                            this.router.navigate([returnUrl]);
                        }
                    })
                }
                else {
                    this.isSuccessfulLogin = false;
                }
            })
            .catch(error => console.log(error));

        this.authenticationService.canAccessAdminFields().then((data: boolean) => console.log(data))
            .catch(err => { console.log(err); });
    }
}