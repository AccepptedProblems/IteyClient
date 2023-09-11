import {Component, OnInit} from '@angular/core';
import {ChannelService} from "../../services/channel.service";
import {RelationshipService} from "../../services/relationship.service";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.scss']
})
export class CreateChatComponent implements OnInit {
  users: User[] = []

  constructor(private userService: UserService,
              private channelService: ChannelService,
              private relationshipService: RelationshipService,
              private ref: DynamicDialogRef) {
  }

  ngOnInit() {
    this.getFriendList()
  }

  getFriendList() {
    let sub = this.relationshipService.getFriends().subscribe({
      next: value => {
        this.users = value
      }
    })
  }

  createChat(user: User) {
    this.channelService.getDirectChannelDetail(user.id).subscribe({
      next: value => {
        this.ref.close({
          created: true,
          channel: value
        })
      }
    })
  }

  createDirectChat(friend: User) {
    let user = this.userService.getCurrentUserFromLocalData()!
    let users = [user, friend]
    this.channelService.createChannel("DIRECT", users).subscribe({
      next: value => {
        this.ref.close({
          created: true,
          channel: value
        })
      }
    })
  }

  identify(index: number, user: User) {
    return user.id;
  }
}
