import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { InicioModule } from './inicio/inicio.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    DashboardModule,
    InicioModule,
    ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'APPWEB';
}
