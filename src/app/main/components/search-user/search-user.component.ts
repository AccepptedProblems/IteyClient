import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FriendRequest, User} from "../../model/user";
import {FormControl} from "@angular/forms";
import {interval, throttle} from "rxjs";
import {RelationshipService} from "../../services/relationship.service";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit{
  users: FriendRequest[] = []
  formControl = new FormControl('')
  constructor(private userService: UserService,
              private relationshipService: RelationshipService) {
  }

  ngOnInit() {
    this.fetchUser('')
  }

  fetchUser(text: string) {
    this.userService.getStrangeUser(text)
      .pipe(throttle(() => interval(500)))
      .subscribe({
        next: value => {
          let currentUser = this.userService.getCurrentUserFromLocalData()!
          this.users = value.filter(value => value.id != currentUser.id)
            .map(user => ({
              user: user,
              isResponse: false,
              responseMessage: ""
            }))
        }
      })
  }

  onSearchKeyUp() {
    let name = this.formControl.value
    if(!name) return
    this.fetchUser(name!)
  }

  addFriend(stranger: FriendRequest) {
    let sub = this.relationshipService.addFriend(stranger.user.id).subscribe({
      next: value => {
        stranger.isResponse = true
        stranger.responseMessage = "Đã kết bạn"
        sub.unsubscribe()
      }
    })


  }
}
