import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {filter, Subscription} from "rxjs";
import {User} from "../../model/user";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy, OnInit{
  hideNav = true
  user?: User
  sub!: Subscription
  showNavigationMenu = false

  constructor(private router: Router,
              private userService: UserService,
              private storageService: StorageService) {
    this.sub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      let val = event as NavigationEnd
      if (!['/login', '/register'].includes(val.url)) {
        this.hideNav = false
        this.user = userService.getCurrentUserFromLocalData()!
      }
    })
  }

  ngOnInit() {
    console.log(this.router.url)
  }

  ngOnDestroy() {
  }

  navMenuToggle() {
    this.showNavigationMenu = !this.showNavigationMenu
  }

  logout() {
    this.showNavigationMenu = false
    this.hideNav = true
    this.storageService.clean()
    this.router.navigate(['/login'])
  }
}
