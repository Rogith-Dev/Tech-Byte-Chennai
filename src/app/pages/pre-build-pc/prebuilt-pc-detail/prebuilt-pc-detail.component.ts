import { Component, HostListener } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-prebuilt-pc-detail',
  templateUrl: './prebuilt-pc-detail.component.html',
  styleUrls: ['./prebuilt-pc-detail.component.scss']
})
export class PreBuildPCDetailComponent {
  productDetails = [
  { title: 'All India Free Shipping', icon: 'bi-truck' },
  { title: '3-Day Replacement', icon: 'bi-arrow-clockwise' },
  { title: 'Secured Shopping', icon: 'bi-shield-lock' },
  { title: 'Genuine Products', icon: 'bi-patch-check' },
  { title: 'No Hidden Charges', icon: 'bi-cash' },
  { title: 'Competitive Pricing', icon: 'bi-graph-up-arrow' }
];


  product = {
    name: 'Blaze 5600G – Entry Gaming PC',
    category: 'Gaming Desktop',
    originalPrice: 67500,
    discountedPrice: 58500,
    discountPercentage: -15,
    rating: 5,
    image: 'assets/images/cabinet/Ant Esports 411.jpg',
    specs: [
      'AMD Ryzen 5 5600X',
      'NVIDIA RTX 3060 12GB',
      '16GB DDR4 RAM',
      '500GB NVMe SSD',
      '650W 80+ PSU',
      'Windows 11 Pro'
    ],
    productSpecs: [
      { component: 'CPU', model: 'AMD Ryzen 5 5600G (with Vega 7 GPU)' },
      { component: 'GPU', model: 'Integrated Vega 7 Graphics' },
      { component: 'RAM', model: '16GB DDR4 3200MHz' },
      { component: 'Storage', model: '512GB NVMe SSD' },
      { component: 'Motherboard', model: 'B550M Chipset' },
      { component: 'PSU', model: '450W 80+ Certified' },
      { component: 'Case', model: 'Mini Tower with RGB Fan' },
    ],
    description: `This high-performance pre-built PC is optimized for gamers and content creators. 
    With premium cooling, RGB lighting, and the latest components, it's ready to handle everything from AAA titles to professional workloads.`
  };

  buyNow() {
    alert('Buy Now clicked!');
    // redirect to payment or checkout
  }

  addToCart() {
    alert('Added to cart!');
    // integrate with cart service
  }
}
