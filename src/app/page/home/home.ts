import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var Swiper: any;
declare var WOW: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  ngFormRequest: FormGroup;
  submitted = false;
  public isError = false;
  phoneNumber: string = '9198855401';
  menuOpen: boolean = false;
  isBrowser: boolean = false;
  heroSwiper: any;
  projectSwiper: any;
  testimonialSwiper: any;
form = {
    name: '',
    email: '',
    phone: '',
    zipcode: '',
    service: '',
    projectType: '',
    message: ''
  };
  constructor(public router: Router, private formBuilder: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient,
  ) {
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

  setTimeout(() => {
    this.initSwipers();
  }, 0);
   setTimeout(() => {
    document.querySelectorAll('.nice-select .option')
      .forEach(opt => {
        opt.addEventListener('click', (e: any) => {
          const value = e.target.innerText;

          if (e.target.closest('.nice-select')?.previousElementSibling?.innerText?.includes('Service')) {
            this.form.service = value;
          } else {
            this.form.projectType = value;
          }
        });
      });
  }, 0);
}
initSwipers() {

  if (this.heroSwiper) this.heroSwiper.destroy(true, true);
  if (this.projectSwiper) this.projectSwiper.destroy(true, true);
  if (this.testimonialSwiper) this.testimonialSwiper.destroy(true, true);

  this.heroSwiper = new Swiper('.hero-slider', {
    loop: true,
    autoplay: { delay: 5000 },
    effect: 'fade'
  });

  this.projectSwiper = new Swiper('.project-slider', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });

  this.testimonialSwiper = new Swiper('.testimonial-slider', {
    loop: true,
    navigation: {
      nextEl: '.array-next',
      prevEl: '.array-prev'
    }
  });
}
ngOnDestroy(): void {
  this.heroSwiper?.destroy(true, true);
  this.projectSwiper?.destroy(true, true);
  this.testimonialSwiper?.destroy(true, true);
}


  onIsError(): void {
    this.isError = true;
  }


  sendContact() {
  this.http.post(
    'https://casawallpaper.com/api/send-contact.php',
    this.form
  ).subscribe({
    next: () => {
      alert('Message sent successfully');
      this.form = {
        name: '',
        email: '',
        phone: '',
        zipcode: '',
        service: '',
        projectType: '',
        message: ''
      };
    },
    error: (err) => {
      console.error(err);
      alert('Error sending message');
    }
  });
}
}
