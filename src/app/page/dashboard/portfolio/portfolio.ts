import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../../services/portfolio.service';
import { AuthPocketbaseService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio',
  imports: [FormsModule, CommonModule],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.scss'], // Fix: styleUrl -> styleUrls
})
export class Portfolio implements OnInit {
  selectedFiles: File[] = [];
  previews: string[] = [];
  loading = false;
  portfolios: any[] = [];
  showForm = false;

  constructor(public portfolioService: PortfolioService, public authService: AuthPocketbaseService,
     private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadPortfolios();
  }

  async loadPortfolios() {
    try {
      const portfolios = await this.portfolioService.getPortfolios();
      this.portfolios = portfolios.map(portfolio => ({
        ...portfolio,
        tag: typeof portfolio['tag'] === 'string' ? portfolio['tag'] : portfolio['tag']
      }));
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading portfolios:', error);
    }
  }

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

  toggleForm() {
    this.showForm = !this.showForm;
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

      this.loadPortfolios(); // Reload list

      this.showForm = false; // Hide form

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