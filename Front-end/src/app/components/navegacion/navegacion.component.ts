import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Category {
  id: number;
  name: string;
  route: string;
}

@Component({
  selector: 'app-category-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class CategoryNavigationComponent {
  categories: Category[] = [
    { id: 1, name: 'Home', route: '/home' },
    { id: 2, name: 'Products', route: '/products' },
    { id: 3, name: 'About Us', route: '/about' },
    { id: 4, name: 'Contact', route: '/contact' }
  ];
}
