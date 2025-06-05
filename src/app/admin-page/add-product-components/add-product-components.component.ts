import { Component } from '@angular/core';
import * as _ from 'lodash';

//@ts-ignore
import ServerConstant from '../../../../server/constant/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-components',
  templateUrl: './add-product-components.component.html',
  styleUrls: ['./add-product-components.component.scss']
})
export class AddProductComponent {

  public pcComponentAddForm!: FormGroup;
  public selectedFile: File | null = null;
  public serverConstant = ServerConstant;

  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {


    this.pcComponentAddForm = this.fb.group({
      name: ['', Validators.required],
      productType: [Validators.required],
      price: [null, Validators.required],
      originalPrice: [null, Validators.required],
      productImage: [null, Validators.required]
    });

  }

  get docForm() {
    return this.pcComponentAddForm.controls;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.selectedFile = file;
      this.pcComponentAddForm.patchValue({ productImage: file });
    }
  }

  onSubmit(): void {
    if (!this.pcComponentAddForm.valid || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('name', this.pcComponentAddForm.get('name')?.value);
    formData.append('price', this.pcComponentAddForm.get('price')?.value);
    formData.append('originalPrice', this.pcComponentAddForm.get('originalPrice')?.value);
    formData.append('productImage', this.selectedFile);

    // this.http.post('http://localhost:3000/upload-component', formData).subscribe({
    //   next: (res) => console.log('Upload success:', res),
    //   error: (err) => console.error('Upload failed:', err)
    // });
  }

}
