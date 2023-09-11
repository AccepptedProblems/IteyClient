import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './main/components/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatListComponent } from './main/components/chat/chat-list/chat-list.component';
import { ChatComponent } from './main/components/chat/chat.component';
import { ChatDetailComponent } from './main/components/chat/chat-detail/chat-detail.component';
import {MatIconModule} from "@angular/material/icon";
import {UserService} from "./main/services/user.service";
import {StorageService} from "./main/services/storage.service";
import {HttpInterceptorProviders} from "./main/helper/custom-http.interceptor";
import { LoginComponent } from './main/components/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {ErrorInterceptorProviders} from "./main/helper/error.interceptor";
import { SignupComponent } from './main/components/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import { FriendRequestComponent } from './main/components/friend-request/friend-request.component';
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";
import { SearchUserComponent } from './main/components/search-user/search-user.component';
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import { CreateChatComponent } from './main/components/create-chat/create-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ChatListComponent,
    ChatComponent,
    ChatDetailComponent,
    LoginComponent,
    SignupComponent,
    FriendRequestComponent,
    SearchUserComponent,
    CreateChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    DynamicDialogModule,
    ToastModule
  ],
  providers: [
    UserService,
    StorageService,
    DialogService,
    HttpInterceptorProviders,
    ErrorInterceptorProviders,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
