import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { SignaturePreviewComponent } from '../signature-preview/signature-preview.component';
import { SignatureTemplateComponent } from '../signature-template/signature-template.component';

@Component({
  selector: 'app-signature-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ImageUploadComponent,
    SignaturePreviewComponent,
    SignatureTemplateComponent
  ],
  templateUrl: './signature-form.component.html',
  styleUrls: ['./signature-form.component.css']
})
export class SignatureFormComponent {
  @Output() formSubmit = new EventEmitter<any>();
  signatureForm: FormGroup;
  templates = [
    { id: 1, image: 'assets/template1.png' },
    { id: 2, image: 'assets/template2.png' },
    // Add more templates as needed
  ];
  uploadedImage: string = '';
  signatureData: any;

  constructor(private fb: FormBuilder) {
    this.signatureForm = this.fb.group({
      fullName: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      template: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signatureForm.valid) {
      this.signatureData = { ...this.signatureForm.value, image: this.uploadedImage };
    }
  }

  onImageUpload(image: string) {
    this.uploadedImage = image;
  }

  onTemplateSelected(template: any) {
    this.signatureForm.patchValue({ template: template.id });
  }
}
