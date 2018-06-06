import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: '../Htmls/confirmEmail.component.html',
})
export class ConfirmEmailComponent {

    constructor(private router: Router) { }

    continue() {
        this.router.navigate(['/login']);
    }
}
    