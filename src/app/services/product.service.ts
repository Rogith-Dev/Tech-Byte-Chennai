import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Gaming Laptop',
      description: 'High-performance laptop for gaming',
      price: 1200,
      image: 'https://via.placeholder.com/150',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      description: 'RGB keyboard with clicky keys',
      price: 80,
      image: 'https://via.placeholder.com/150',
      category: 'Accessories'
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
