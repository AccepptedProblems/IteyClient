import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../enviroment/env";
import {Message} from "../model/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService{
  url = enviroment.baseUrl + '/message'
  constructor(private http: HttpClient) { }

  getMessagesFromChannel(channelId: string) {
    let param = {
      channelId: channelId
    }
    return this.http.get<Message[]>(this.url, {params: param})
  }

  sendMessage(message: any): Observable<Message> {
    return this.http.post<Message>(this.url, message)
  }
}
