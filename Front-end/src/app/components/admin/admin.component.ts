import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CrearJuegoComponent } from "../crear-juego/crear-juego.component";
import { BorrarJuegoComponent } from '../borrar-juego/borrar-juego.component';
import { ActualizarJuegoComponent } from '../actualizar-juego/actualizar-juego.component';
import { LeerJuegoComponent } from '../leer-juegos/leer-juegos.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,
    BrowserAnimationsModule,
    RouterModule, CrearJuegoComponent, BorrarJuegoComponent, ActualizarJuegoComponent, LeerJuegoComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  activeTab: string = 'crear';  // Controla la pestaña activa

  setActiveTab(tab: string) {
    this.activeTab = tab;  // Cambia la pestaña activa
  }

  isActiveTab(tab: string) {
    return this.activeTab === tab;  // Verifica si una pestaña está activa
  }
}
