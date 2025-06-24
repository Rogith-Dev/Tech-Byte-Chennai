import { Component } from '@angular/core';
import * as _ from 'lodash';

//@ts-ignore
import ServerConstant from '../../../../server/constant/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pc-hardware-add',
  templateUrl: './pc-hardware-add.component.html',
  styleUrls: ['./pc-hardware-add.component.scss']
})
export class PCHardwareAddComponent {

  public pcComponentAddForm!: FormGroup;
  public selectedFile: File | null = null;
  public serverConstant = ServerConstant;
  public BrandTypes = _.values(ServerConstant.BrandTypes);

  constructor(
    private fb: FormBuilder, private http: HttpClient, private route: Router) {
  }


  ngOnInit() {

    this.http.get(environment.apiUrl + '/api/product/getproduct').subscribe({
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
      brandType: [''],
      sellingPrice: [null, Validators.required],
      originalPrice: [null, Validators.required],
      isActive: [true]
    });

  }

  get addForm() {
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
    formData.append('sellingPrice', this.pcComponentAddForm.get('sellingPrice')?.value);
    formData.append('originalPrice', this.pcComponentAddForm.get('originalPrice')?.value);
    formData.append('productType', this.pcComponentAddForm.get('productType')?.value);
    formData.append('brandType', this.pcComponentAddForm.get('brandType')?.value);
    formData.append('isActive', this.pcComponentAddForm.get('isActive')?.value);
    formData.append('file', this.selectedFile);

    this.http.post(environment.apiUrl + '/api/product/createproduct', formData).subscribe({
      next: (res: any) => {
        alert('Saved');
        this.route.navigate(['/pc-hardware-list']);
      },
      error: (err) => {
        console.log('error', err);
        alert('Error');
      }
    })

  }

}
