import {Component, OnInit} from '@angular/core';
import {interval, throttle} from "rxjs";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit{
  isShowFunctionButton: Boolean = false
  currentUser!: User;

  constructor(private userService: UserService) {
  }
  ngOnInit() {
    // this.fetchUser('')
    this.currentUser = this.userService.getCurrentUserFromLocalData()!
    console.log(this.currentUser)
  }

  // fetchUser(text: string) {
  //   this.userService.getStrangeUser(text)
  //     .pipe(throttle(() => interval(500)))
  //     .subscribe({
  //       next: value => {
  //         let currentUser = this.userService.getCurrentUserFromLocalData()!
  //         this.users = value.filter(value => value.id != currentUser.id)
  //           .map(user => ({
  //             user: user,
  //             isResponse: false,
  //             responseMessage: ""
  //           }))
  //       }
  //     })
  // }

}
