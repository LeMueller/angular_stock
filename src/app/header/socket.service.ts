import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  ws: WebSocket;

  constructor() { }

  createObservableSocket(url:string): Observable<any> {
    this.ws =  new WebSocket(url);
    return new Observable(
      observer => {
        // 当ws有event触发是，触发注册上的observer的方法
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = () => observer.complete();
      }
    );
  }
}
