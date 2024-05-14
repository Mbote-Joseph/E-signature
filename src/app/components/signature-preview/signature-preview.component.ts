import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signature-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signature-preview.component.html',
  styleUrls: ['./signature-preview.component.css']
})
export class SignaturePreviewComponent {
  @Input() signatureData: any;
}
