import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations/route-animations';
import { BackgroundComponent } from './components/background/background.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'ba-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    NavigationComponent,
    BackgroundComponent,
  ],
  animations: [slideInAnimation],
})
export class AppComponent {}
