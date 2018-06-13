import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../Components/app.component';
import { LoginComponent } from "../Components/login.component";
import { StartPageComponent } from "../Components/startPage.component";
import { Routes, RouterModule } from '@angular/router';
import { TopicDetailComponent } from '../Components/topicDetail.component';
import { CreateTopicComponent } from "../Components/createTopic.component";
import { AuthenticationService } from "../Services/authentication.service";
import { HttpModule } from '@angular/http';
import { RegisterComponent } from "../Components/register.component";
import { AccountComponent } from "../Components/account.component";
import { ChangePasswordComponent } from "../Components/changePassword.component";
import { ConfirmEmailComponent } from "../Components/confirmEmail.component";
import { ForgotPasswordComponent } from "../Components/forgotPassword.component";
import { RecoverPasswordComponent } from "../Components/recoverPassword.component";
import { AuthGuard } from "../Guards/auth.guard";

const appRoutes: Routes = [
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

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, HttpModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule],
    declarations: [AppComponent, LoginComponent, StartPageComponent, TopicDetailComponent, CreateTopicComponent, RegisterComponent,
        AccountComponent, ChangePasswordComponent, ConfirmEmailComponent, ForgotPasswordComponent, RecoverPasswordComponent],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
})
export class AppModule { }