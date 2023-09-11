import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  constructor(private e1: ElementRef) {
    this.e1.nativeElement.style.height = "100%"
    this.e1.nativeElement.style.boxSizing = "border-box"
  }
}
