import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { debounceTime, fromEvent, map } from 'rxjs';
import { environment } from 'src/environments/environment';

//@ts-ignore
import ServerConstant from '../../../../server/constant/constant';
import { HttpService } from 'src/app/services/http-service/http.service';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';


declare var bootstrap: any;

@Component({
  selector: 'app-pc-build',
  templateUrl: './pc-build.component.html',
  styleUrls: ['./pc-build.component.scss']
})
export class PCBuildComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;


  public isScrolled = false;
  public serverConstant = ServerConstant;
  public sortOption: string = 'priceLowHigh';
  public searchTerm: string = '';
  public loading = false;

  // Pagination
  public page = 1;
  public pageSize = 20;
  public totalItems = 0;
  products: any[] = [];
  selectedBrand = '';


  public selectedComponent: any;
  public brands = _.values(ServerConstant.ProcessorCatagory.Brand);
  public cpuSupports = ['AMD AM4', 'AMD AM5', 'Intel LGA 1200', 'Intel LGA 1700', 'SWRX8'];
  public selectedComponents: { [key: string]: any } = {};
  modalInstance: any;

  constructor(private http: HttpClient) { }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(300), // Wait 300ms after last keystroke
        map((event: any) => event.target.value)
      )
      .subscribe((value: string) => {
        this.searchTerm = value;
        this.page = 1; // reset to first page
        this.applyFilters();
      });
  }

  applyFilters() {
    const params = {
      searchTerm: this.searchTerm,
      brand: this.selectedBrand,
      sortOption: this.sortOption,
      page: this.page,
      pageSize: this.pageSize,
      productType: this.selectedComponent
    };
    this.http.post(environment.apiUrl + '/api/product/getProductsByFilter', params).subscribe({
      next: (res: any) => {
        this.products = res.products;
        this.totalItems = res.totalItems;
      }, error: (err: any) => {
        console.log(err, 'err');

      }
    });
  }

  onChangeBrand(brand: string) {
    this.selectedBrand = brand;
    this.page = 1;
    this.applyFilters();
  }

  sortProducts(event: any) {
    this.sortOption = event.target.value;
    this.page = 1;
    this.applyFilters();
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.applyFilters();
  }

  public openComponentsModel(data: any) {
    this.loading = true;
    this.selectedComponent = data.type;

    this.http.post(environment.apiUrl + '/api/product/getProductListByName', { productType: data.type }).subscribe({
      next: (res: any) => {
        this.products = res;
        this.totalItems = data.length;
        this.applyFilters();
        this.loading = false;

        const modalElement = document.getElementById('componentModal');
        if (modalElement) {
          this.modalInstance = new bootstrap.Modal(modalElement);
          this.modalInstance.show();
        }
      }, error: (err: any) => {
        console.log(err);
      }
    })

  }

  public closeModal() {
    this.searchTerm = '';
    this.selectedComponent = null;
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  public onSelectItemFromModel(item: any) {
    const key = item.productType;
    if (key) {
      this.selectedComponents[key] = item;
    }
    this.closeModal();
  }

  public deleteSectedItem(data: any) {
    const key = data.type;
    if (key) {
      this.selectedComponents[key] = null;
    }
  }
}
