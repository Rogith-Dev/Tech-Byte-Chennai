import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public username = 'Rogith';
  public isScrolled = false;
  public hideHeader = false;
  private lastScrollTop: any = 0;
  public loading = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = currentScroll > 50;
    if (currentScroll > this.lastScrollTop && currentScroll > 3) {
      this.hideHeader = true;
    } else {
      this.hideHeader = false;
    }
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  }
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.closeNavbar();
    });
  }

  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse?.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse, {
        toggle: true
      });
    }
  }

}
