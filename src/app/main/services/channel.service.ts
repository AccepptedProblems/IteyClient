import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../enviroment/env";
import {Channel, User} from "../model/user";
import {Observable, of, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  url: string = enviroment.baseUrl + '/channel'
  channels: Channel[] = []
  selectedChannel?: Channel
  selectedChannelChange: Subject<Channel> = new Subject<Channel>()

  constructor(private http: HttpClient) {
    this.selectedChannelChange.subscribe(value =>
      this.selectedChannel = value)
  }

  getListChannel() {
    if (this.channels.length == 0) {
      return this.fetchListChannel().pipe(tap(value => {
        this.channels = value
      }))
    }
    return of(this.channels)
  }

  getDirectChannelDetail(userId: string): Observable<Channel> {
    let param = {
      userId: userId
    }
    return this.http.get<Channel>(`${this.url}/direct`, {params: param})
  }

  fetchListChannel() {
    return this.http.get<Channel[]>(this.url)
  }

  selectChannel(channel: Channel | undefined) {
    if(!channel) {
      this.selectedChannelChange.next(this.channels[0])
      return
    }
    this.selectedChannelChange.next(channel)
  }

  deleteChannel(channel: Channel) {
    this.channels = this.channels.filter(value => value != channel)
    this.selectChannel(undefined)
  }

  checkCreatedChannel(userId: string) {
    let channelList = this.channels.filter(channel => {
      if (channel.type == "GROUP") return false
      for (let user of channel.users) {
        if (user.id == userId) return true;
      }
      return false
    })

    return channelList.length == 1
  }

  createChannel(type: "DIRECT" | "GROUP", users: User[]): Observable<Channel> {
    let body = {
      type: type,
      name: '',
      userIds: users.map(value => value.id)
    }
    return this.http.post<Channel>(this.url, body)
  }
}
