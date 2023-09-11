import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Channel, ChannelCustom, User} from "../../../model/user";
import {ChannelService} from "../../../services/channel.service";
import {delay, Subscription} from "rxjs";
import {ChatListOption, ChatService} from "../../../services/chat.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {FriendRequestComponent} from "../../friend-request/friend-request.component";
import {SearchUserComponent} from "../../search-user/search-user.component";
import {CreateChatComponent} from "../../create-chat/create-chat.component";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, AfterViewInit, OnDestroy{
  channelCustoms: ChannelCustom[] = [ ]
  sub!: Subscription
  chatOptions: ChatListOption[] = []
  @ViewChild('chatListOptionBtn') chatListOptionBtn!: ElementRef
  @ViewChild('chatListOption') chatListOption!: any
  @ViewChild('chatItemOption') chatItemOption!: ElementRef
  @ViewChild('chatItemOptionBtn') chatItemOptionBtn!: any
  showChatListOption = false
  ref!: DynamicDialogRef;

  constructor(private channelService: ChannelService,
              private chatService: ChatService,
              private renderer: Renderer2,
              private dialogService: DialogService) {}

  ngOnInit() {
    this.fetchChatList()
    this.chatOptions = this.chatService.options
  }

  ngAfterViewInit() {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.chatListOptionBtn.nativeElement.contains(e.target) && !this.chatListOption.elementRef.nativeElement.contains(e.target)) {
        this.showChatListOption = false
      }

      if (this.chatItemOption && !this.chatItemOption.nativeElement.contains(e.target) && !this.chatItemOptionBtn._elementRef.nativeElement.contains(e.target)) {
        this.channelCustoms.forEach(value => value.showOption = false)
      }
    })
  }

  ngOnDestroy() {
  }

  onClickChannel(channel: Channel) {
    this.channelService.selectChannel(channel)
  }

  fetchChatList() {
    this.channelService.getListChannel().subscribe({
      next: value => {
        this.channelCustoms = value.map(value1 => ({
          channel: value1,
          showOption: false
        }))
        console.log(value)
      }
    })
  }

  openCreateChat() {
    this.ref = this.dialogService.open(CreateChatComponent, {
      header: 'Tạo đoạn chat',
      width: '600px',
      height: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000
    })

    this.ref.onClose.subscribe({
      next: async value => {
        await delay(500)
        this.fetchChatList()
      }
    })
  }

  onChatItemOptionToggle(channel: ChannelCustom) {
    this.channelCustoms.filter(value => value != channel).forEach(value => value.showOption = false)
    channel.showOption = !channel.showOption
    console.log()
  }

  onClickChatItemOption(channel: Channel) {
    this.deleteChannel(channel)
  }

  deleteChannel(channel: Channel) {
    this.channelCustoms = this.channelCustoms.filter(value => value.channel != channel)
    this.channelService.deleteChannel(channel)
  }

  onChatOptionToggle() {
    this.showChatListOption = !this.showChatListOption
  }

  onClickOption(option: ChatListOption) {
    switch (option.id) {
      case 1: //Friend request
        this.showFriendRequestDialog()
        break
      case 2: // Search user
        this.showSearchUserDialog()
        break
      default:
        break
    }

  }
  showSearchUserDialog() {
    this.ref = this.dialogService.open(SearchUserComponent, {
      header: 'Tìm kiếm người dùng',
      width: '600px',
      height: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000
    })
  }

  showFriendRequestDialog() {
    this.ref = this.dialogService.open(FriendRequestComponent, {
      header: 'Lời mời kết bạn',
      width: '600px',
      height: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000
    })
  }

  isChannelSelected(channel: Channel) {
    return this.channelService.selectedChannel == channel
  }

  trackByOption(index: number, option: ChatListOption) {
    return option.id
  }

  channelIdentity(index: number, channel: ChannelCustom) {
    return channel.channel.id
  }
}
