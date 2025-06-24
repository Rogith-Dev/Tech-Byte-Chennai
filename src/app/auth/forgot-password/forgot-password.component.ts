import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  email: string = '';

  constructor(private http: HttpClient, private alertService: AlertService) { }

  submit() {
    this.http.post(environment.apiUrl + '/api/user/forgot-password', { email: this.email })
      .subscribe({
        next: () => this.alertService.showSucessOkMessage('Reset link sent to email'),
        error: (err) => this.alertService.showErrorOkMessage(err.error)
      });
  }


}
