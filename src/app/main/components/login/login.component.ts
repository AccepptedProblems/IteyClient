import {Component, ElementRef} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {catchError, of, Subscription} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showPwd = false
  email = ""
  password = ""
  sub!: Subscription

  constructor(private e1: ElementRef,
              private router: Router,
              private userService: UserService,
              private messageService: MessageService) {
    e1.nativeElement.style.height = '100%'
  }

  onKeyup(field: 'email'|'password', event: any) {
    if(field == 'email') {
      this.email = event.target.value
    } else {
      this.password = event.target.value
    }
  }

  login() {
    this.sub = this.userService.login(this.email, this.password).pipe(
      catchError(err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err})
        console.log(err)
        return of(null)
      })
    ).subscribe({
      next: value => {
        if(value) {
          this.userService.saveData(value)
          this.router.navigate(['/chat'])
        }
      },
    })
  }

  goToSignup() {
    this.router.navigate(["/register"])
  }
}
