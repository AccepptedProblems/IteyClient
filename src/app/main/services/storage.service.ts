import { Injectable } from '@angular/core';
import {enviroment} from "../enviroment/env";
import {User} from "../model/user";

const USER_KEY = enviroment.userKey
const API_KEY = enviroment.apikey

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveKey(key: string): void {
    window.sessionStorage.removeItem(API_KEY);
    window.sessionStorage.setItem(API_KEY, key);
  }


  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getKey(): any {
    const key = window.sessionStorage.getItem(API_KEY);
    return key ? key : ""
  }

  public getUser(): User|null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(API_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
