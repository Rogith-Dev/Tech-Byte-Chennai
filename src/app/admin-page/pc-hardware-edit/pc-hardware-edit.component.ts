import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

//@ts-ignore
import ServerConstant from '../../../../server/constant/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http-service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert-service/alert.service';

@Component({
  selector: 'app-pc-hardware-edit',
  templateUrl: './pc-hardware-edit.component.html',
  styleUrls: ['./pc-hardware-edit.component.scss']
})
export class PCHardwareEditComponent {

  public pcComponentEditForm!: FormGroup;
  public selectedFile: File | null = null;
  public productId: any
  public serverConstant = ServerConstant;
  public BrandTypes = _.values(ServerConstant.BrandTypes);
  fileName: any;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
  }


  ngOnInit() {

    this.productId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    this.pcComponentEditForm = this.fb.group({
      name: ['', Validators.required],
      productType: ['', Validators.required],
      brandType: [''],
      originalPrice: [null, Validators.required],
      sellingPrice: [null, Validators.required],
      isActive: [false],
    });

    this.loadProduct();

  }


  private loadProduct() {
    this.http.get(environment.apiUrl + `/api/product/getProductDetail/${this.productId}`).subscribe({
      next: (res: any) => {

        this.pcComponentEditForm.patchValue({
          name: res.name,
          productType: res.productType,
          brandType: res.brandType,
          sellingPrice: res.sellingPrice,
          originalPrice: res.originalPrice,
          isActive: res.isActive
        });
        this.fileName = res.filePath?.split('/').pop();

      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (!this.pcComponentEditForm.valid) return;

    const formData = new FormData();
    formData.append('name', this.pcComponentEditForm.get('name')?.value);
    formData.append('sellingPrice', this.pcComponentEditForm.get('sellingPrice')?.value);
    formData.append('originalPrice', this.pcComponentEditForm.get('originalPrice')?.value);
    formData.append('productType', this.pcComponentEditForm.get('productType')?.value);
    formData.append('brandType', this.pcComponentEditForm.get('brandType')?.value);
    formData.append('isActive', this.pcComponentEditForm.get('isActive')?.value);
    formData.append('productId', this.productId);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.http.post(environment.apiUrl + '/api/product/update', formData).subscribe({
      next: () => {
        this.alertService.showSuccessToasterMessage('Updated successfully');
        this.router.navigate(['/pc-hardware-list']);
      },
      error: err => {
        console.error(err);
        alert('Update failed');
      }
    });
  }

}
