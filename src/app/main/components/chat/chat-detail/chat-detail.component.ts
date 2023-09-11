import {
  AfterContentChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Channel, Message, User} from "../../../model/user";
import {ChannelService} from "../../../services/channel.service";
import {MessageService} from "../../../services/message.service";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit, AfterContentChecked, OnDestroy{
  selectedChannel?: Channel
  messages: Message[] = []
  sub!: Subscription
  currentUser!: User;
  messageForm = new FormControl("")
  @ViewChild('chatContent') chatContainer?: ElementRef
  count = 0
  interval: any;

  constructor(private channelService: ChannelService,
              private messageSrv: MessageService,
              private userService: UserService) {
    this.currentUser = userService.getCurrentUserFromLocalData()!
  }

  ngOnInit() {
    this.sub = this.channelService.selectedChannelChange.subscribe({
      next: value => {
        if(this.interval) clearInterval(this.interval)
        this.selectedChannel = value
        this.fetchMessage()
        this.interval = setInterval(() => {
          this.fetchMessage()
        }, 3000);
      }
    })
  }

  ngAfterContentChecked() {
    if(this.messages.length > 0 && this.count <= 2) {
      this.scrollToBottom()
      this.count++
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  fetchMessage() {
    if(this.selectedChannel) {
      this.messageSrv.getMessagesFromChannel(this.selectedChannel.id).subscribe({
        next: value => this.setMessage(value)
      })
    }
  }

  setMessage(newMessages: Message[]) {
    this.messages = newMessages.reverse()
  }

  sendMessage() {
    let text = this.messageForm.value?.trim()
    this.messageForm.setValue('')
    if(!text || text === '') return
    let message = {
      channelId: this.selectedChannel!.id,
      userSendId: this.currentUser.id,
      type: "TEXT",
      content: text,
      timeSent: this.getCurrentTimeSentStr(),
    }
    this.messageSrv.sendMessage(message).subscribe(message => {
      this.messages.push(message)
    })
  }

  getCurrentTimeSentStr() {
    let date = new Date()
    return this.formatDate(date)
  }

  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      'T' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  scrollToBottom(): void {
    try {
      if(!this.chatContainer) return
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
