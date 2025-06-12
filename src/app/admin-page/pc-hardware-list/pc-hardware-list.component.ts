import { Component } from '@angular/core';
import * as _ from 'lodash';

//@ts-ignore
import ServerConstant from '../../../../server/constant/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http-service/http.service';

@Component({
  selector: 'app-pc-hardware-list',
  templateUrl: './pc-hardware-list.component.html',
  styleUrls: ['./pc-hardware-list.component.scss']
})
export class PCHardwareListComponent {

  public pcComponentViewForm!: FormGroup;
  public selectedFile: File | null = null;
  public serverConstant = ServerConstant;
  public pcComponents: any;

  constructor(private http: HttpClient) {
  }


  ngOnInit() {

    this.http.get('http://localhost:3000/api/product/getProductList').subscribe({
      // this.http.httpGetMethod('http://localhost:3000/api/product/getProductList').subscribe({
      next: (res: any) => {
        this.pcComponents = res.data;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  public onView(component: any) {
    console.log(component);

  }

}
