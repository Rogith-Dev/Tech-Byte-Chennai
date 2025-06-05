import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { debounceTime, fromEvent, map } from 'rxjs';

//@ts-ignore
import ServerConstant from '../../../../server/constant/constant';


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
  public processorTypes: any;
  public sortOption: string = 'priceLowHigh';
  public searchTerm: string = '';
  filteredItems: any;

  colorFilters = [
    { name: 'Brown', count: 3 },
    { name: 'Black', count: 3 },
    { name: 'SteelBlue', count: 2 },
    { name: 'DarkSeaGreen', count: 2 },
    { name: 'RosyBrown', count: 1 },
    { name: 'SandyBrown', count: 1 },
    { name: 'Gray', count: 1 }
  ];
  public selectedComponent: any;
  public brands = ['AMD', 'Intel'];
  public cpuSupports = ['AMD AM4', 'AMD AM5', 'Intel LGA 1200', 'Intel LGA 1700', 'SWRX8'];
  public selectedComponents: { [key: string]: any } = {};
  modalInstance: any;

  constructor() { }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  ngOnInit() {
    this.filteredItems = this.processorTypes;

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
      this.getComponentList(this.selectedComponent);
      return;
    }
    const lowerTerm = this.searchTerm.toLowerCase();
    this.processorTypes = this.processorTypes.filter((item: any) =>
      item.title.toLowerCase().includes(lowerTerm)
    );
  }

  public sortProducts() {
    switch (this.sortOption) {
      case 'priceLowHigh':
        this.processorTypes.sort((a: { price: number; }, b: { price: number; }) => a.price - b.price);
        break;
      case 'priceHighLow':
        this.processorTypes.sort((a: { price: number; }, b: { price: number; }) => b.price - a.price);
        break;
    }
  }

  public openComponentsModel(data: any) {
    this.getComponentList(data);
    const modalElement = document.getElementById('componentModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  public closeModal() {
    this.searchTerm = '';
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  private getComponentList(data: any) {
    this.selectedComponent = data;
    let selectedString = data.name.toLowerCase();
    const foundKey = Object.keys(this.serverConstant.PCComponentTypes).find(key => key.toLowerCase().includes(selectedString));
    if (foundKey) {
      this.processorTypes = _.values(this.serverConstant.PCComponentTypes[foundKey]);
    }
  }
  public onSelectItemFromModel(item: any) {
    const key = item.type;
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
