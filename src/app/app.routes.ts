import { Routes } from '@angular/router';
import { authGuard } from '../auth.guard';
import { Home } from './page/home/home';
import { Terms } from './page/terms/terms';
import { Contact } from './page/contact/contact';
import { About } from './page/about/about';
import { Services1 } from './page/services1/services1';
import { Services2 } from './page/services2/services2';
import { Services3 } from './page/services3/services3';
import { Gallery } from './page/gallery/gallery';
import { Policy } from './page/policy/policy';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./page/home/home').then(c => c.Home),
    title: 'Casawallpaper',
    data: {
      description: 'Transform your space with expert wallpaper installations.',
      canonical: '/',
      canActivate: [authGuard],
    },
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./page/terms/terms').then(c => c.Terms),
    title: 'Terms & Conditions',
    data: {
      description: 'Read our terms and conditions for using our services.',
      canonical: '/terms',
    },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./page/contact/contact').then(c => c.Contact),
    title: 'Contact Us',
    data: {
      description: 'Read our contact page for using our services.',
      canonical: '/contact',
    },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./page/about/about').then(c => c.About),
    title: 'About Us',
    data: {
      description: 'Read our about page for using our services.',
      canonical: '/about',
    },
  },
  {
    path: 'services1',
    loadComponent: () =>
      import('./page/services1/services1').then(c => c.Services1),
    title: 'Services',
    data: {
      description: 'Read our services page for using our services.',
      canonical: '/services1',
    },
  },
  {
    path: 'services2',
    loadComponent: () =>
      import('./page/services2/services2').then(c => c.Services2),
    title: 'Services',
    data: {
      description: 'Read our services page for using our services.',
      canonical: '/services2',
    },
  },
  {
    path: 'services3',
    loadComponent: () =>
      import('./page/services3/services3').then(c => c.Services3),
    title: 'Services',
    data: {
      description: 'Read our services page for using our services.',
      canonical: '/services3',
    },
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./page/gallery/gallery').then(c => c.Gallery),
    title: 'Gallery',
    data: {
      description: 'Read our gallery page for using our services.',
      canonical: '/gallery',
    },
  },
  {
    path: 'policy',
    loadComponent: () =>
      import('./page/policy/policy').then(c => c.Policy),
    title: 'Policy',
    data: {
      description: 'Read our policy page for using our services.',
      canonical: '/policy',
    },
  },
 
  {
    path: '**',
    redirectTo: 'home'
  }
];