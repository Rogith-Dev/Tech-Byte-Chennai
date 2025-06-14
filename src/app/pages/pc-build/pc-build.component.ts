import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { debounceTime, fromEvent, map } from 'rxjs';

//@ts-ignore
import ServerConstant from '../../../../server/constant/constant';
import { HttpService } from 'src/app/services/http-service/http.service';
import { HttpClient } from '@angular/common/http';


declare var bootstrap: any;

@Component({
  selector: 'app-pc-build',
  templateUrl: './pc-build.component.html',
  styleUrls: ['./pc-build.component.scss']
})
export class PCBuildComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;

  public isScrolled = false;
  public serverConstant = ServerConstant;
  public componentTypes: any;
  public sortOption: string = 'priceLowHigh';
  public searchTerm: string = '';
  public filteredItems: any;
  public loading = false;

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
        this.filterItems();
      });
  }

  public filterItems() {
    if (!this.searchTerm) {
      // this.getComponentList(this.selectedComponent);
      return;
    }
    const lowerTerm = this.searchTerm.toLowerCase();
    this.componentTypes = this.componentTypes.filter((item: any) =>
      item.title.toLowerCase().includes(lowerTerm)
    );
  }

  public sortProducts() {
    switch (this.sortOption) {
      case 'priceLowHigh':
        this.componentTypes.sort((a: { sellingPrice: number; }, b: { sellingPrice: number; }) => a.sellingPrice - b.sellingPrice);
        break;
      case 'priceHighLow':
        this.componentTypes.sort((a: { sellingPrice: number; }, b: { sellingPrice: number; }) => b.sellingPrice - a.sellingPrice);
        break;
    }
  }

  public onChangeBrand(brand: any) {
    this.loading = true;
    this.http.post('http://localhost:3000/api/product/getProductsByFilter', { filter: brand }).subscribe({
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

    this.http.post('http://localhost:3000/api/product/getProductListByName', { productType: data.name }).subscribe({
      next: (res: any) => {
        this.componentTypes = res;
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
