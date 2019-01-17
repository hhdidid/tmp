import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  constructor() { }

  addMsg(message: string) {
    this.messages.push(message);
  }

  getMsg(): string[] {
    return this.messages;
  }

  clear() {
    this.messages = [];
  }
}
