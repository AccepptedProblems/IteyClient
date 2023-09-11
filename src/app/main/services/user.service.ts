import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../enviroment/env";
import {StorageService} from "./storage.service";
import {filter, Observable} from "rxjs";
import {LoginResponse, User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = enviroment.baseUrl + '/user'
  constructor(private http: HttpClient,
              private storageService: StorageService) { }

  getCurrentUser(): Observable<User> {
    let user = this.storageService.getUser()
    let id = user ? user.id : ""
    return this.http.get<User>(`${this.url}/${id}`)
  }

  getCurrentUserFromLocalData() {
    return this.storageService.getUser();
  }

  register(body: any) {
    return this.http.post<User>(`${this.url}/register`, body)
  }

  login(email: string, password: string): Observable<LoginResponse> {
    let body = {
      username: email,
      password: password
    }
    return this.http.post<LoginResponse>(`${this.url}/login`, body)
  }

  saveData(loginInfo: LoginResponse) {
    this.storageService.saveUser(loginInfo.user)
    this.storageService.saveKey(loginInfo.apiKey)
  }

  getStrangeUser(displayName: string): Observable<User[]> {
    let param = {
      displayName: displayName
    }
    let user = this.getCurrentUserFromLocalData()!

    return this.http.get<User[]>(`${this.url}/strange`, {params: param})
  }

}
