import {Component, OnInit} from '@angular/core';
import {FriendRequest, User} from "../../model/user";
import {RelationshipService} from "../../services/relationship.service";

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.scss']
})
export class FriendRequestComponent implements OnInit{
  responseMessage = ""
  friendRequests: FriendRequest[] = []
  constructor(private relationshipService: RelationshipService) {
  }

  ngOnInit() {
    this.fetchRelationship()
  }

  onResponse(request: FriendRequest, type: "accept" | "deny") {

    if (type == "accept") {
      let sub = this.relationshipService.confirmRequest(request.user.id).subscribe({
        next: value => {
          request.isResponse = true
          request.responseMessage = "Đã chấp nhận lời mời kết bạn"
          sub.unsubscribe()
        }
      })
    } else {
      let sub = this.relationshipService.denyRequest(request.user.id).subscribe({
        next: value => {
          request.isResponse = true
          request.responseMessage = "Đã từ chối lời mời kết bạn"
          sub.unsubscribe()
        }
      })
    }
  }

  fetchRelationship() {
    let sub = this.relationshipService.getFriendRequest().subscribe({
      next: value => {
        this.friendRequests = value.map(user => ({
          user: user,
          isResponse: false,
          responseMessage: ""
        }))
        sub.unsubscribe();
      }
    })
  }

  userIdentity(index: number, request: FriendRequest) {
    return request.user.id
  }

}
