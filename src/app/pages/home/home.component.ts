import { Component, HostListener } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isScrolled = false;
  products = [
    {
      name: 'HP Boom Headphone X2',
      price: 699,
      discount: null,
      colorCount: 3,
      colors: ['#000000', '#8B0000'],
      image: 'assets/images/boom-headphone.jpg'
    },
    {
      name: "Gaming Controller",
      price: 1999,
      discount: 1000,
      colorCount: 2,
      colors: ['#000000', '#DC143C'],
      image: 'assets/images/controller.jpg'
    },
    {
      name: "JBL Speaker",
      price: 2100,
      discount: null,
      colorCount: 2,
      colors: ['#4682B4', '#3CB371'],
      image: 'assets/images/jbl-speaker.jpg'
    }
  ];

  colorFilters = [
    { name: 'Brown', count: 3 },
    { name: 'Black', count: 3 },
    { name: 'SteelBlue', count: 2 },
    { name: 'DarkSeaGreen', count: 2 },
    { name: 'RosyBrown', count: 1 },
    { name: 'SandyBrown', count: 1 },
    { name: 'Gray', count: 1 }
  ];

  constructor(private productService: ProductService) {
    // this.products = this.productService.getProducts();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }
}
