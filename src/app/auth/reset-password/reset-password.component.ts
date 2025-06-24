import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  constructor(private http: HttpClient, private route: ActivatedRoute, private alertService: AlertService) { }

  password: string = '';
  token: string = '';

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token')!;
  }

  submit() {
    this.http.post(environment.apiUrl + `/api/user/reset-password/${this.token}`, { password: this.password })
      .subscribe({
        next: () => this.alertService.showSucessOkMessage('Password updated'),
        error: (err) => this.alertService.showErrorOkMessage(err.error)
      });

  }

}
