import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../../services/portfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio',
  imports: [FormsModule, CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  selectedFiles: File[] = [];
  previews: string[] = [];
  loading = false;

  constructor(private portfolioService: PortfolioService) {}

  onFileChange(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);
      this.generatePreview(file);
    }
  }

  generatePreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previews.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.previews.splice(index, 1);
  }

  async uploadPortfolio(form: NgForm) {
  if (form.invalid || this.selectedFiles.length === 0) return;

  try {
    this.loading = true;

    const { name, tag } = form.value;

    const type = this.selectedFiles.some(f => f.type.startsWith('video/'))
      ? 'video'
      : 'img';

    console.log('Iniciando subida de portfolio:', { name, tag, type, filesCount: this.selectedFiles.length });

    await this.portfolioService.createPortfolio(
      name,
      tag,
      type,
      this.selectedFiles
    );

    console.log('Portfolio guardado correctamente');

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Portfolio subido correctamente',
    });

    this.selectedFiles = [];
    this.previews = [];
    form.resetForm();

  } catch (error) {
    console.error('Error subiendo portfolio:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al subir el portfolio. Inténtalo de nuevo.',
    });
  } finally {
    this.loading = false;
  }
}
}