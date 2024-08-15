import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



// Define el tipo de notificación
interface Notification {
    message: string;
    type: 'success' | 'error';
  }

@Injectable({
  providedIn: 'root' //Con esto ya no es necesario llamarlo provaider de cada componente
})
export class NotificationService {

  private notificationSubject = new Subject<Notification>();
  public notification$ = this.notificationSubject.asObservable();

  constructor() { }

  showNotification(message: string, type: 'success' | 'error') {
    this.notificationSubject.next({ message, type });
  }
}