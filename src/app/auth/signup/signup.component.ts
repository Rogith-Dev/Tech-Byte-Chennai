import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    public registerForm!: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            terms: ['', Validators.required],
        });
    }

    onSubmit() {
        // if (this.registerForm.valid) {
        //     this.httpService.post(this.registerForm.value).subscribe({
        //         next: (resp: any) => {
        //             console.log(resp);
        //             console.log('Account created');

        //         },
        //         error: (err) => {
        //             // this.alertService.showErrorToasterMessage('Error occurred while fetching customer list');
        //         },
        //         complete: () => console.log('complete')
        //     })
        // }
    }

}