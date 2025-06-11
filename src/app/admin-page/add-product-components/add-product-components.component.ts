import { Component } from '@angular/core';
import * as _ from 'lodash';

//@ts-ignore
import ServerConstant from '../../../../server/constant/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product-components',
  templateUrl: './add-product-components.component.html',
  styleUrls: ['./add-product-components.component.scss']
})
export class AddProductComponent {

  public pcComponentAddForm!: FormGroup;
  public selectedFile: File | null = null;
  public serverConstant = ServerConstant;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }


  ngOnInit() {

    this.http.get('http://localhost:3000/api/product/getproduct').subscribe({
      next: (res: any) => {
        console.log('resposne', res);
      },
      error: (err) => {
        console.log('error', err);
      }
    })


    this.pcComponentAddForm = this.fb.group({
      name: ['', Validators.required],
      productType: [Validators.required],
      price: [null, Validators.required],
      originalPrice: [null, Validators.required],
    });

  }

  get docForm() {
    return this.pcComponentAddForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (!this.pcComponentAddForm.valid || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('name', this.pcComponentAddForm.get('name')?.value);
    formData.append('price', this.pcComponentAddForm.get('price')?.value);
    formData.append('originalPrice', this.pcComponentAddForm.get('originalPrice')?.value);
    formData.append('file', this.selectedFile);
    this.http.post('http://localhost:3000/api/product/createproduct', formData).subscribe({
      next: (res: any) => {
        alert('Saved');
      },
      error: (err) => {
        console.log('error', err);
        alert('Error');
      }
    })

  }

}
