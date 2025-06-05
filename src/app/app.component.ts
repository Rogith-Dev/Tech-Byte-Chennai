// app.component.ts
import { Component, HostListener } from '@angular/core';
import { ReportService } from './service/report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username = 'Rogith';
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }
  constructor(private reportService: ReportService) { }

  download() {
    this.reportService.downloadReport(this.username);
  }
}
