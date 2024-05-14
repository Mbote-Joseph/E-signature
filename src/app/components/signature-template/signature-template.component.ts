import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signature-templates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signature-template.component.html',
  styleUrls: ['./signature-template.component.css']
})
export class SignatureTemplateComponent {
  @Output() templateSelected = new EventEmitter<any>();
  templates = [
    { id: 1, image: 'assets/template1.png' },
    { id: 2, image: 'assets/template2.png' },
    // Add more templates as needed
  ];

  selectTemplate(template: any) {
    this.templateSelected.emit(template);
  }
}
