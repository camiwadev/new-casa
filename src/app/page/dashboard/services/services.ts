import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../services/services.service';
import { AuthPocketbaseService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  imports: [FormsModule, CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements OnInit {
  selectedFiles: File[] = [];
  previews: string[] = [];
  loading = false;
  items: string[] = [];
  newItem: string = '';
  services: any[] = [];
  showForm = false;

  constructor(private servicesService: ServicesService, public authService: AuthPocketbaseService,
     private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  async loadServices() {
    try {
      const services = await this.servicesService.getServices();
      this.services = services.map(service => ({
        ...service,
        items: typeof service['items'] === 'string' ? JSON.parse(service['items']) : service['items']
      }));
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading services:', error);
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

  addItem() {
    if (this.newItem.trim()) {
      this.items.push(this.newItem.trim());
      this.newItem = '';
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  async uploadService(form: NgForm) {
    if (form.invalid || this.selectedFiles.length === 0) return;

    try {
      this.loading = true;

      const { name, description } = form.value;

      console.log('Iniciando subida de servicio:', { name, description, items: this.items, filesCount: this.selectedFiles.length });

      await this.servicesService.createService(
        name,
        description,
        this.items,
        this.selectedFiles
      );

      console.log('Servicio guardado correctamente');

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Servicio subido correctamente',
      });

      this.selectedFiles = [];
      this.previews = [];
      this.items = [];
      this.newItem = '';
      form.resetForm();

      this.loadServices(); // Reload list

      this.showForm = false; // Hide form

    } catch (error) {
      console.error('Error subiendo servicio:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al subir el servicio. Inténtalo de nuevo.',
      });
    } finally {
      this.loading = false;
    }
  }
}
