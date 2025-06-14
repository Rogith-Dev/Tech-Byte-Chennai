import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

//@ts-ignore
import ServerConstant from '../../../../server/constant/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http-service/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pc-hardware-view',
  templateUrl: './pc-hardware-view.component.html',
  styleUrls: ['./pc-hardware-view.component.scss']
})
export class PCHardwareViewComponent {

  public pcComponentViewForm!: FormGroup;
  public selectedFile: File | null = null;
  public serverConstant = ServerConstant;
  pcComponentObj: any;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
  }


  ngOnInit() {

    let productId = this.route.snapshot.paramMap.get('id') || '';

    this.http.get(`https://tech-byte-chennai.onrender.com/api/product/getProductDetail/${productId}`).subscribe({
      next: (res: any) => {
        this.pcComponentObj = res;
      },
      error: (err) => {
        console.log(err);
      }
    })

  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
