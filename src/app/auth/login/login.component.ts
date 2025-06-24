import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {

    public loginForm!: FormGroup;
    public elementType: string | undefined;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        console.log('Login Data:', this.loginForm.value);
        this.http.post(environment.apiUrl + '/api/user/login', this.loginForm.value).subscribe({
            next: (res: any) => {
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify(res.user));
                this.router.navigate(['/pc-build']);
            },
            error: (err: any) => {
                let message = err.error.message || 'Login failed';
                this.alertService.showErrorToasterMessage(message);
            }
        });
    }

    public getIcon() {
        if (this.elementType === 'text') {
            return 'fa fa-eye'
        } else {
            return 'fa fa-eye-slash';
        }
    }

    public togglePassword(id: any) {
        const element = document.getElementById(id);
        // @ts-ignore
        this.elementType = element.type;
        if (this.elementType === 'password') {
            this.elementType = 'text';
            // @ts-ignore
            element.type = 'text';
        } else {
            this.elementType = 'password';
            // @ts-ignore
            element.type = 'password';
        }
    }

    ErrorObjectsRemove() {
    }
}