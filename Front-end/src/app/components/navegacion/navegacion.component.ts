import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegurarse de que FormsModule esté en los imports
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {
  consoles = [
    { name: 'Play Station 4', count: 10, selected: false },
    { name: 'Play Station 3', count: 5, selected: false },
    { name: 'Play Station 2', count: 5, selected: false },
    { name: 'Play Station 1', count: 5, selected: false },
    { name: 'Xbox Series X/S', count: 5, selected: false },
    { name: 'other', count: 5, selected: false }
  ];

  availability = [
    { name: 'En stock', count: 5, selected: false }
  ];

  prices = [
    { name: '50,00 $ en adelante', count: 5, selected: false },
    { name: '40,00 - 49,99 $', count: 5, selected: false },
    { name: '20,00 - 39,99 $', count: 5, selected: false },
    { name: '0 - 19,99 $', count: 5, selected: false }
  ];

  resetCategory(category: string) {
    switch (category) {
      case 'console':
        this.consoles.forEach(item => item.selected = false);
        break;
      case 'availability':
        this.availability.forEach(item => item.selected = false);
        break;
      case 'price':
        this.prices.forEach(item => item.selected = false);
        break;
    }
  }
}
