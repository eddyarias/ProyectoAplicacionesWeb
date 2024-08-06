import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-end';
  products = [
    { name: 'Producto 1', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 2', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 3', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 4', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 5', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 6', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 7', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 8', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 9', image: 'https://via.placeholder.com/150' },
    { name: 'Producto 10', image: 'https://via.placeholder.com/150' }
  ];
}
