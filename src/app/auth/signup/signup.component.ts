import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    public signupForm!: FormGroup;
    public elementType: string | undefined;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.signupForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            terms: ['', Validators.required],
        }, { validator: this.passwordsMatchValidator });
    }

    public onSubmit() {
        if (this.signupForm.invalid) return;

        this.http.post(environment.apiUrl + '/api/user/signup', this.signupForm.value).subscribe({
            next: (res: any) => {
                this.signupForm.reset();
                this.alertService.showSuccessToasterMessage(res.message);
            },
            error: (err) => {
                let message = err.error.message || 'Signup failed';
                this.alertService.showErrorToasterMessage(message);
            }
        });
    }

    private passwordsMatchValidator(formGroup: any) {
        const password = formGroup.get('password').value;
        const confirmPassword = formGroup.get('confirmPassword').value;
        return password === confirmPassword ? null : { mismatch: true };
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

}