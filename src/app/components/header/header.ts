import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  phoneNumber: string = '9198855401';
  menuOpen: boolean = false;
  servicesDropdownOpen: boolean = false;

  constructor(
    public router: Router
  ){}

  toggleMenu(event: MouseEvent) {
    this.menuOpen = !this.menuOpen;
    event.stopPropagation();
  }

  toggleServicesDropdown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.servicesDropdownOpen = !this.servicesDropdownOpen;
  }

  closeServicesDropdown() {
    this.servicesDropdownOpen = false;
  }

  navigateAndCloseDropdown(route: string) {
    this.closeServicesDropdown();
    this.router.navigate([route]);
  }

  navigate(route: string) {
    this.closeServicesDropdown();
    this.router.navigate([route]);
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
      this.menuOpen = false;
    }
    if (this.servicesDropdownOpen) {
      this.servicesDropdownOpen = false;
    }
  }

}
