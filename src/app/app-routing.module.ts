import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "./main/components/chat/chat.component";
import {LoginComponent} from "./main/components/login/login.component";
import {AuthGuard} from "./main/guard/auth-guard.guard";
import {SignupComponent} from "./main/components/signup/signup.component";

const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: "**",
    redirectTo: "/chat"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
