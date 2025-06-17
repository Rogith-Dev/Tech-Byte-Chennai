import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public showHeader = true;

  constructor(private router: Router, private auth: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.routerState.root.firstChild;
        this.showHeader = !(currentRoute?.snapshot.data['hideHeader']);
      }
    });
  }

  ngOnInit() {
    setInterval(() => {
      if (this.auth.isTokenExpired()) {
        this.auth.logout(); // Auto logout
      }
    }, 60000); // check every 1 minute
  }

}
