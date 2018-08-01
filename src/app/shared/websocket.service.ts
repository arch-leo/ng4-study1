import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/RX';

@Injectable()
export class WebsocketService {
  ws: WebSocket;
  constructor() { }
  createObservableSocket(url: string, id: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable<string>(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        this.ws.onopen = (event) => this.sendMsg({ productId: id });
        return () => this.ws.close();
      }
    ).map(message => JSON.parse(message));
  }
  sendMsg(msg: any) {
    this.ws.send(JSON.stringify(msg));
  }
}
