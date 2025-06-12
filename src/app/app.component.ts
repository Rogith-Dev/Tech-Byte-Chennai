// app.component.ts
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public username = 'Rogith';
  public isScrolled = false;
  public hideHeader = false;
  private lastScrollTop: any = 0;

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
  constructor() { }

  ngOnInit() {
  }
}
