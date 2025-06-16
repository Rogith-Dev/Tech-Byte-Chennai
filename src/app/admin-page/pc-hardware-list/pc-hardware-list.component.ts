import { Component, ViewChild } from '@angular/core';
import * as _ from 'lodash';

//@ts-ignore
import ServerConstant from '../../../../server/constant/constant';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http-service/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
  public displayedColumns: string[] = ['index', 'image', 'name', 'type', 'originalPrice', 'sellingPrice', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {
  }


  ngOnInit() {

    this.http.get('https://tech-byte-chennai.onrender.com/api/product/getProductList').subscribe({
      // this.http.httpGetMethod('http://localhost:3000/api/product/getProductList').subscribe({
      next: (res: any) => {
        this.pcComponents = res.data;
        this.dataSource.data = this.pcComponents;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public onView(component: any) {
    console.log(component);

  }

}
