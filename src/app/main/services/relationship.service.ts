import { Injectable } from '@angular/core';
import {enviroment} from "../enviroment/env";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  url: string = enviroment.baseUrl + '/friend'
  constructor(private http: HttpClient) { }

  addFriend(userId: string): Observable<User> {
    let param = {
      userId: userId
    }
    return this.http.post<User>(this.url, param)
  }

  getFriends(){
    return this.http.get<User[]>(this.url)
  }

  getFriendRequest(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/request`)
  }

  confirmRequest(userId: string): Observable<User> {
    return this.http.put<User>(`${this.url}/${userId}/confirm`, {});
  }

  denyRequest(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.url}/${userId}`);
  }
}
