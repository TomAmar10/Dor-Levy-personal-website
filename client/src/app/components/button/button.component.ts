import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  constructor() {}

  @Input() buttonText: string;
  @Input() style: string;
  @Input() darkBtn: boolean;
}
