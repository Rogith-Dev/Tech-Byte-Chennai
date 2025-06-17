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
  public componentTypes: any;
  public sortOption: string = 'priceLowHigh';
  public searchTerm: string = '';
  public filteredItems: any;
  public loading = false;

  // Pagination
  public page = 1;
  public pageSize = 20;
  public totalItems = 0;


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
    this.filteredItems = this.componentTypes;

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
    let items = [...this.filteredItems];

    // Filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(term));
    }

    // Sort
    switch (this.sortOption) {
      case 'priceLowHigh':
        items.sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      case 'priceHighLow':
        items.sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
    }

    // Pagination
    this.totalItems = items.length;
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.componentTypes = items.slice(start, end);
  }

  public sortProducts() {
    this.page = 1; // reset to first page
    this.applyFilters();
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = 0;
    }
  }
  public onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.applyFilters();

    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = 0;
    }
  }

  public onChangeBrand(brand: any) {

    // this.componentTypes = this.filteredItems.filter((item: any) => item.brand === brand);

    this.loading = true;
    this.http.post(environment.apiUrl + '/api/product/getProductsByFilter', { filter: brand }).subscribe({
      next: (res: any) => {
        this.componentTypes = res;
        this.loading = false;
      },
      error: (err: any) => {

      }
    })
  }
  public openComponentsModel(data: any) {
    this.loading = true;

    this.http.post(environment.apiUrl + '/api/product/getProductListByName', { productType: data.name }).subscribe({
      next: (res: any) => {
        this.componentTypes = res;
        this.filteredItems = res;
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
