import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ReportService {
    constructor(private http: HttpClient) { }

    downloadReport(username: string) {
        return this.http.get(`http://localhost:8080/api/report?username=${username}`, {
            responseType: 'blob',
        }).subscribe((blob) => {
            saveAs(blob, 'user_report.pdf');
        });
    }
}
