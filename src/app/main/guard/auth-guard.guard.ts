import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {UserService} from "../services/user.service";
import {StorageService} from "../services/storage.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{
  constructor(
    private router: Router,
    private storage: StorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user = this.storage.getUser()

    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
