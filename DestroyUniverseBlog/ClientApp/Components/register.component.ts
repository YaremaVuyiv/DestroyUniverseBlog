import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../Services/authentication.service";
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from "../Models/User";

@Component({
    templateUrl: '../Htmls/register.component.html',
    providers: [AuthenticationService]
})

export class RegisterComponent {
    user: User = new User("", "", "", "", "");
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    register(form: any) {
    }

    save() {
        this.authenticationService.register(this.user).then(
            data => {
                this.router.navigate(['/']);
            })
            .catch(error => console.log(error));
    }
}