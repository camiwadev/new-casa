import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  ngFormRequest: FormGroup;
  submitted = false;
  public isError = false;
  phoneNumber: string = '9198855401';
  menuOpen: boolean = false;
isBrowser: boolean = false;
  constructor(public router: Router, private formBuilder: FormBuilder,@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
        {
    this.ngFormRequest = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
        zipcode: ['', Validators.required],
        servicesType: ['', Validators.required],
        projectType: ['', Validators.required],
        area: ['', Validators.required],
        message: ['', Validators.required],
     });
  }
  }
 
   ngOnInit(): void {
        if (!this.isBrowser) return;

      window.scrollTo(0, 0);
      this.ngFormRequest = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
        zipcode: ['', Validators.required],
        servicesType: ['', Validators.required],
        projectType: ['', Validators.required],
        area: ['', Validators.required],
        message: ['', Validators.required],
       });
    }
  initScripts() {
    window.addEventListener('scroll', () => {
      console.log(window.scrollY);
    });
        this.initScripts();

  }
  
   get f(): { [key: string]: AbstractControl } {
    return this.ngFormRequest.controls;
  }
 /*  saveRequest() {


  let data: any = this.ngFormRequest.value;

  // Debug: Mostrar datos del formulario en la consola
  console.log('Datos del formulario:', data);

  this.dataApiService.saveRequest(data).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Request sent successfully.'
      }).then(() => {
        // Limpiar los valores para futuros usos
        this.global.request = '';
        this.yeoman.allrequest.push(response);
        this.yeoman.allrequest = [...this.yeoman.allrequest];
        this.isError = false;

        // Reiniciar el formulario
        this.ngFormRequest.reset();
        this.submitted = false;  // Resetear el estado de envío

        // Recargar la página
        window.location.reload();
      });

      console.log('Request saved successfully:', response);
    },
    (error) => {
      this.onIsError();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while saving the request. Please try again later.'
      });
      console.log('Error al guardar la solicitud:', error);
    }
  );
  } */

 
  toggleMenu(event: MouseEvent) {
    this.menuOpen = !this.menuOpen;
    event.stopPropagation();
  }

  sendSMS() {
    window.open(`sms:${this.phoneNumber}`, '_self');
  }

  makeCall() {
    window.open(`tel:${this.phoneNumber}`, '_self');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.menuOpen) {
      const clickedInside = (event.target as HTMLElement).closest('.fab');
      if (!clickedInside) {
        this.menuOpen = false;
      }
    }
  }

  ngAfterViewInit(): void {
      if (!this.isBrowser) return;

    window.scrollTo(0, 0);
  }
   
  onIsError(): void {
    this.isError = true;
  }

}
