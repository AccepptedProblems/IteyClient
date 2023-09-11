import {Component, ElementRef} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {UserService} from "../../services/user.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email = new FormControl('', [Validators.email, Validators.required])
  password = new FormControl('', [Validators.required])
  displayName = new FormControl('', [Validators.required])
  showPwd = false
  gender: string = ""
  dateOfBirth: string = ""

  constructor(private e1: ElementRef,
              private router: Router,
              private userService: UserService,
              private messageService: MessageService) {
    this.e1.nativeElement.style.height = "100%"
  }

  navigateToLogin() {
    this.router.navigate(['/login'])
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateOfBirth = this.formatDate(event.value!)
    console.log(this.dateOfBirth)
  }

  formatDate(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-')
  }


  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  register() {
    let body = {
      password: this.password.value!,
      email: this.email.value!,
      displayName: this.displayName.value!,
      gender: this.gender,
      dayOfBirth: this.dateOfBirth
    }

    this.userService.register(body).subscribe({
      next: git value => {
        this.messageService.add({summary: 'Success!!!', detail: 'Register success'})
        this.router.navigate(['/login'])
      }
    })
  }
}
