import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Router } from '@angular/router';
import { ScriptService } from './services/script.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('casawa');
  layoutStyle: string = "default";
  deviceInfo: any = null
  phoneNumber: string = '9198855401';
  menuOpen: boolean = false;

  constructor(
        public router: Router,
        public script: ScriptService
  ) 
  {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.layoutStyle = this.router.url === '/home' ? 'default' : 'dark';
      }
    });
    this.script.load(
      
      'jquery',
      'viewport',
      'niceSelect',
      'waypoints',
      'counterup',
      'swiper',
      'meanMenu',
      'magnificPopup',
      'wow',
      'main',
      

    )
      .then(() => {
        // console.log('Todos los scripts se cargaron correctamente');
      })
      .catch(error => console.log(error));
      

    
  }
  toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  
    sendSMS() {
      window.open(`sms:${this.phoneNumber}`, '_self');
    }
  
    makeCall() {
      window.open(`tel:${this.phoneNumber}`, '_self');
    }

}
