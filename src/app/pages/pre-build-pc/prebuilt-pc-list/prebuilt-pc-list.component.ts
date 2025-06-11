import { Component, HostListener } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-prebuilt-pc-list',
  templateUrl: './prebuilt-pc-list.component.html',
  styleUrls: ['./prebuilt-pc-list.component.scss']
})
export class PreBuildPCListComponent {
  public isScrolled = false;

  public minPrice = 35000;
  public maxPrice = 85000;

  public products = [
    {
      name: 'Blaze 5600G – Entry Gaming PC',
      originalPrice: 67500,
      discountedPrice: 58500,
      discountPercentage: -15,
      rating: 5,
      image: 'assets/images/cabinet/Ant Esports 411.jpg'
    },
    {
      name: "CreatorX 3060 – Gaming & Streaming PC",
      originalPrice: 82000,
      discountedPrice: 75000,
      discountPercentage: -9,
      rating: 2,
      image: 'assets/images/cabinet/Ant Esports ICE-300TG.jpg'
    },
    {
      name: "ScholarPC – Student & Home PC",
      originalPrice: 39500,
      discountedPrice: 27500,
      discountPercentage: -35,
      rating: 3,
      image: 'assets/images/cabinet/Macro ATX.jpg'
    }
  ];

  public processorFilters = [
    { name: 'Intel', value: 'intel' },
    { name: 'AMD', value: 'amd' },
  ];
  public colorFilters = [
    { name: 'Brown', count: 3 },
    { name: 'Black', count: 3 },
    { name: 'SteelBlue', count: 2 },
    { name: 'DarkSeaGreen', count: 2 },
    { name: 'RosyBrown', count: 1 },
    { name: 'SandyBrown', count: 1 },
    { name: 'Gray', count: 1 }
  ];
  public useCaseFilters = [
    { name: 'Gaming', value: 'Gaming' },
    { name: 'Office / Work', value: 'Office / Work' },
    { name: 'Editing / Streaming', value: 'Editing / Streaming' },
    { name: 'Student Builds', value: 'Student Builds' }
  ];

  constructor(private productService: ProductService) {
    // this.products = this.productService.getProducts();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  public createArray(count: number): number[] {
    return Array(count).fill(0);
  }

  onSliderChange() {
    if (this.minPrice > this.maxPrice) {
      const temp = this.minPrice;
      this.minPrice = this.maxPrice;
      this.maxPrice = temp;
    }
  }
}
