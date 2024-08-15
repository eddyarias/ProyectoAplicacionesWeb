import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  public mensaje:string | null = null;
  public tipo: 'success' | 'error' | null = null;  
  
  constructor(
    private _notificationService:NotificationService
  ){
  }
  
  ngOnInit(): void {
    console.log("HOALA")
    this._notificationService.notification$.subscribe(
      (notification) => {
        this.mensaje = notification.message;
        this.tipo = notification.type;

        setTimeout(()=> {
          this.mensaje = null;
          this.tipo = null;
        }, 3000);
      },
      error =>{
        console.log(error)
      }
    )
  }

}
