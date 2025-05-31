// app.component.ts
import { Component } from '@angular/core';
import { ReportService } from './service/report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  username = 'Rogith';

  constructor(private reportService: ReportService) { }

  download() {
    this.reportService.downloadReport(this.username);
  }
}
