import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/game/game.component').then((m) => m.GameComponent),
    data: { animation: 'HomePage' },
    title: $localize`:Mhadle|Mhadle Page Name@@MhadlePageName:Mhadle - My Hero Academia Wordle Guessing Game`,
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    data: { animation: 'AboutPage' },
    title: $localize`:Mhadle - About|Mhadle - About Page Name@@MhadleAboutPageName:Mhadle - About`,
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    data: { animation: 'ContactPage' },
    title: $localize`:Mhadle - Contact|Mhadle - Contact Page Name@@MhadleContactPageName:Mhadle - Contact`,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
