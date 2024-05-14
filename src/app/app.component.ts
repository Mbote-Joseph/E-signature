import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignatureFormComponent } from './components/signature-form/signature-form.component';
import { SignaturePreviewComponent } from './components/signature-preview/signature-preview.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SignatureFormComponent,
    SignaturePreviewComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signatureData: any;

  updateSignature(data: any) {
    this.signatureData = data;
  }
}
