import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {

    public loginForm!: FormGroup;
    public elementType: string | undefined;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            console.log('Login Data:', this.loginForm.value);
        } else {
            this.loginForm.markAllAsTouched(); // Show errors on submit
        }
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