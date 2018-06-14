var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../Components/app.component';
import { LoginComponent } from "../Components/login.component";
import { StartPageComponent } from "../Components/startPage.component";
import { RouterModule } from '@angular/router';
import { TopicDetailComponent } from '../Components/topicDetail.component';
import { CreateTopicComponent } from "../Components/createTopic.component";
import { HttpModule } from '@angular/http';
import { RegisterComponent } from "../Components/register.component";
import { AccountComponent } from "../Components/account.component";
import { ChangePasswordComponent } from "../Components/changePassword.component";
import { ConfirmEmailComponent } from "../Components/confirmEmail.component";
import { ForgotPasswordComponent } from "../Components/forgotPassword.component";
import { RecoverPasswordComponent } from "../Components/recoverPassword.component";
import { AuthGuard } from "../Guards/auth.guard";
var appRoutes = [
    { path: '', component: StartPageComponent },
    { path: 'detail/:id', component: TopicDetailComponent },
    { path: 'create', component: CreateTopicComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
    { path: 'confirmEmail', component: ConfirmEmailComponent },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: 'recoverPassword/:email/:token', component: RecoverPasswordComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        imports: [BrowserModule, FormsModule, HttpClientModule, HttpModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule, NgbModule.forRoot()],
        declarations: [AppComponent, LoginComponent, StartPageComponent, TopicDetailComponent, CreateTopicComponent, RegisterComponent,
            AccountComponent, ChangePasswordComponent, ConfirmEmailComponent, ForgotPasswordComponent, RecoverPasswordComponent],
        providers: [AuthGuard],
        bootstrap: [AppComponent],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map