import { Component } from '@angular/core';
import * as _ from 'lodash';

//@ts-ignore
import ServerConstant from '../../../../server/constant/constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-pc-hardware',
  templateUrl: './view-pc-hardware.component.html',
  styleUrls: ['./view-pc-hardware.component.scss']
})
export class ViewPCHardwareComponent {

  public pcComponentViewForm!: FormGroup;
  public selectedFile: File | null = null;
  public serverConstant = ServerConstant;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }


  ngOnInit() {

  }


}
