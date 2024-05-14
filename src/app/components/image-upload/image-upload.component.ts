import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @Output() imageUploaded = new EventEmitter<string>();
  @ViewChild('image', { static: false }) imageElement!: ElementRef<HTMLImageElement>;

  selectedImage: string | ArrayBuffer | null = null;
  croppedImage: string | ArrayBuffer | null = null;
  cropStartX: number = 50;
  cropStartY: number = 50;
  cropWidth: number = 200;
  cropHeight: number = 200;
  cropping: boolean = false;
  cropStartXOffset: number = 0;
  cropStartYOffset: number = 0;

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onImageLoad(image: HTMLImageElement): void {
    this.cropWidth = image.width / 2;
    this.cropHeight = image.height / 2;
  }

  startCrop(event: MouseEvent): void {
    this.cropping = true;
    this.cropStartXOffset = event.clientX - this.cropStartX;
    this.cropStartYOffset = event.clientY - this.cropStartY;
    document.addEventListener('mousemove', this.cropMove);
    document.addEventListener('mouseup', this.endCrop);
  }

  cropMove = (event: MouseEvent): void => {
    if (this.cropping) {
      this.cropStartX = event.clientX - this.cropStartXOffset;
      this.cropStartY = event.clientY - this.cropStartYOffset;
    }
  };

  endCrop = (): void => {
    this.cropping = false;
    document.removeEventListener('mousemove', this.cropMove);
    document.removeEventListener('mouseup', this.endCrop);
  };

  onSave(): void {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = this.imageElement.nativeElement;

    canvas.width = this.cropWidth;
    canvas.height = this.cropHeight;

    context?.drawImage(
      image,
      this.cropStartX,
      this.cropStartY,
      this.cropWidth,
      this.cropHeight,
      0,
      0,
      this.cropWidth,
      this.cropHeight
    );

    this.croppedImage = canvas.toDataURL('image/png');
    this.imageUploaded.emit(this.croppedImage as string);
  }
}
